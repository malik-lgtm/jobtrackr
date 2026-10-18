import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
const JOBS_KEY = ["jobs"];
// Form values use "" for empty fields; the database stores null.
export function toPayload(values) {
  return {
    company: values.company,
    role: values.role,
    status: values.status,
    job_url: values.job_url || null,
    location: values.location || null,
    salary: values.salary || null,
    notes: values.notes || null,
    applied_date: values.applied_date,
  };
}
export function useJobs() {
  return useQuery({
    queryKey: JOBS_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}
export function useAddJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      // user_id is filled in by the database (default auth.uid())
      const { error } = await supabase.from("applications").insert(payload);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: JOBS_KEY }),
  });
}
// Optimistic: the card moves instantly, and rolls back if the request fails.
export function useUpdateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, changes }) => {
      const { error } = await supabase.from("applications").update(changes).eq("id", id);
      if (error) throw error;
    },
    onMutate: async ({ id, changes }) => {
      await queryClient.cancelQueries({ queryKey: JOBS_KEY });
      const previous = queryClient.getQueryData(JOBS_KEY);
      queryClient.setQueryData(JOBS_KEY, (old) =>
        old?.map((job) => (job.id === id ? { ...job, ...changes } : job)),
      );
      return { previous };
    },
    onError: (_error, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(JOBS_KEY, context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: JOBS_KEY }),
  });
}
export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("applications").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: JOBS_KEY }),
  });
}
