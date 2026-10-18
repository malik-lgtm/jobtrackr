export function makeJob(overrides = {}) {
  return {
    id: "1",
    user_id: "u1",
    company: "Acme",
    role: "Frontend Developer",
    status: "applied",
    job_url: null,
    location: "Remote",
    salary: null,
    notes: null,
    applied_date: "2025-03-11",
    created_at: "2025-03-11T10:00:00Z",
    ...overrides,
  };
}
