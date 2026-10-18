import { applyFilters, defaultFilters } from "./filters";
import { makeJob } from "../test/fixtures";
const jobs = [
  makeJob({
    id: "1",
    company: "Bluepeak",
    role: "React Developer",
    status: "applied",
    applied_date: "2025-03-01",
  }),
  makeJob({ id: "2", company: "Acme", role: "UI Engineer", status: "interview", applied_date: "2025-03-05" }),
];
describe("applyFilters", () => {
  it("sorts newest first by default", () => {
    expect(applyFilters(jobs, defaultFilters).map((j) => j.id)).toEqual(["2", "1"]);
  });
  it("searches company and role, ignoring case", () => {
    expect(applyFilters(jobs, { ...defaultFilters, search: "BLUE" }).map((j) => j.id)).toEqual(["1"]);
    expect(applyFilters(jobs, { ...defaultFilters, search: "ui eng" }).map((j) => j.id)).toEqual(["2"]);
  });
  it("filters by status", () => {
    expect(applyFilters(jobs, { ...defaultFilters, status: "interview" })).toHaveLength(1);
  });
  it("sorts by company name", () => {
    expect(applyFilters(jobs, { ...defaultFilters, sort: "company" }).map((j) => j.company)).toEqual([
      "Acme",
      "Bluepeak",
    ]);
  });
});
