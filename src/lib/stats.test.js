import { computeStats, weeklyCounts } from "./stats";
import { makeJob } from "../test/fixtures";
describe("computeStats", () => {
  it("returns zeros for an empty list", () => {
    expect(computeStats([])).toMatchObject({ total: 0, interviewRate: 0 });
  });
  it("counts statuses and the interview rate", () => {
    const jobs = [
      makeJob({ id: "1", status: "applied" }),
      makeJob({ id: "2", status: "interview" }),
      makeJob({ id: "3", status: "offer" }),
      makeJob({ id: "4", status: "rejected" }),
    ];
    const stats = computeStats(jobs);
    expect(stats.total).toBe(4);
    expect(stats.interviewRate).toBe(50);
  });
});
describe("weeklyCounts", () => {
  it("groups jobs into weeks that start on Monday", () => {
    const now = new Date("2025-03-12T12:00:00"); // Wednesday
    const jobs = [
      makeJob({ id: "1", applied_date: "2025-03-11" }), // week of Mar 10
      makeJob({ id: "2", applied_date: "2025-03-10" }), // week of Mar 10
      makeJob({ id: "3", applied_date: "2025-03-04" }), // week of Mar 3
    ];
    expect(weeklyCounts(jobs, 2, now)).toEqual([
      { label: "Mar 3", count: 1 },
      { label: "Mar 10", count: 2 },
    ]);
  });
});
