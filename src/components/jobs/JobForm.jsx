import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "../../lib/validators";
import { JOB_STATUSES, STATUS_LABELS } from "../../constants/job";
import { getErrorMessage } from "../../lib/errors";
import { Input, Select, TextArea } from "../ui/Field";
import Button from "../ui/Button";
const today = () => new Date().toISOString().slice(0, 10);
export default function JobForm({ initial, onSubmit, onCancel }) {
  const [serverError, setServerError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      company: initial?.company ?? "",
      role: initial?.role ?? "",
      status: initial?.status ?? "applied",
      job_url: initial?.job_url ?? "",
      location: initial?.location ?? "",
      salary: initial?.salary ?? "",
      notes: initial?.notes ?? "",
      applied_date: initial?.applied_date ?? today(),
    },
  });
  const submit = async (values) => {
    setServerError(null);
    try {
      await onSubmit(values);
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  };
  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Company"
          placeholder="Acme Inc."
          error={errors.company?.message}
          {...register("company")}
        />
        <Input
          label="Job title"
          placeholder="Frontend Developer"
          error={errors.role?.message}
          {...register("role")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Status" error={errors.status?.message} {...register("status")}>
          {JOB_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </Select>
        <Input
          label="Date applied"
          type="date"
          error={errors.applied_date?.message}
          {...register("applied_date")}
        />
      </div>

      <Input
        label="Job link"
        type="url"
        placeholder="https://company.com/jobs/123"
        error={errors.job_url?.message}
        {...register("job_url")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Location"
          placeholder="Remote, Lahore"
          error={errors.location?.message}
          {...register("location")}
        />
        <Input
          label="Salary"
          placeholder="$800 / month"
          error={errors.salary?.message}
          {...register("salary")}
        />
      </div>

      <TextArea
        label="Notes"
        rows={3}
        placeholder="Recruiter name, interview date, things to follow up on"
        error={errors.notes?.message}
        {...register("notes")}
      />

      {serverError && (
        <p
          role="alert"
          className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
        >
          {serverError}
        </p>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {initial ? "Save changes" : "Add job"}
        </Button>
      </div>
    </form>
  );
}
