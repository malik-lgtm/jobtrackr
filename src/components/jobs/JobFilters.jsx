import { JOB_STATUSES, STATUS_LABELS } from "../../constants/job";
import { fieldClass } from "../ui/Field";
export default function JobFilters({ filters, onChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <label htmlFor="job-search" className="sr-only">
          Search jobs
        </label>
        <input
          id="job-search"
          type="search"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search by company, role or location"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="job-status" className="sr-only">
          Filter by status
        </label>
        <select
          id="job-status"
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          className={fieldClass}
        >
          <option value="all">All statuses</option>
          {JOB_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="job-sort" className="sr-only">
          Sort jobs
        </label>
        <select
          id="job-sort"
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
          className={fieldClass}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="company">Company A to Z</option>
        </select>
      </div>
    </div>
  );
}
