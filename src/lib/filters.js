export const defaultFilters = { search: "", status: "all", sort: "newest" };
export function applyFilters(jobs, filters) {
  const query = filters.search.trim().toLowerCase();
  const filtered = jobs.filter((job) => {
    if (filters.status !== "all" && job.status !== filters.status) return false;
    if (!query) return true;
    return [job.company, job.role, job.location ?? ""].some((field) => field.toLowerCase().includes(query));
  });
  return [...filtered].sort((a, b) => {
    if (filters.sort === "company") return a.company.localeCompare(b.company);
    const diff = a.applied_date.localeCompare(b.applied_date);
    return filters.sort === "newest" ? -diff : diff;
  });
}
