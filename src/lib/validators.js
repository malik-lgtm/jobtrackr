import { z } from "zod";
import { JOB_STATUSES } from "../constants/job";
export const jobSchema = z.object({
  company: z.string().trim().min(1, "Enter the company name"),
  role: z.string().trim().min(1, "Enter the job title"),
  status: z.enum(JOB_STATUSES),
  job_url: z.string().trim().url("Enter a full link, like https://company.com/jobs/1").or(z.literal("")),
  location: z.string().trim(),
  salary: z.string().trim(),
  notes: z.string().trim(),
  applied_date: z.string().min(1, "Pick the date you applied"),
});
export const authSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(6, "Use at least 6 characters"),
});
