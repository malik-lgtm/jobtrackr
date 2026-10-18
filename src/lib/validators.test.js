import { jobSchema, authSchema } from "./validators";
const valid = {
  company: "Acme",
  role: "Frontend Developer",
  status: "applied",
  job_url: "",
  location: "",
  salary: "",
  notes: "",
  applied_date: "2025-03-11",
};
describe("jobSchema", () => {
  it("accepts a valid job", () => {
    expect(jobSchema.safeParse(valid).success).toBe(true);
  });
  it("requires a company name", () => {
    expect(jobSchema.safeParse({ ...valid, company: "   " }).success).toBe(false);
  });
  it("rejects an invalid job link but allows an empty one", () => {
    expect(jobSchema.safeParse({ ...valid, job_url: "not a url" }).success).toBe(false);
    expect(jobSchema.safeParse({ ...valid, job_url: "https://acme.com/jobs/1" }).success).toBe(true);
  });
  it("rejects an unknown status", () => {
    expect(jobSchema.safeParse({ ...valid, status: "ghosted" }).success).toBe(false);
  });
});
describe("authSchema", () => {
  it("needs a valid email and a 6+ character password", () => {
    expect(authSchema.safeParse({ email: "a@b.com", password: "123456" }).success).toBe(true);
    expect(authSchema.safeParse({ email: "nope", password: "123456" }).success).toBe(false);
    expect(authSchema.safeParse({ email: "a@b.com", password: "123" }).success).toBe(false);
  });
});
