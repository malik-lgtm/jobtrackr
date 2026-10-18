import { render, screen } from "@testing-library/react";
import { DndContext } from "@dnd-kit/core";
import JobCard from "./JobCard";
import { makeJob } from "../../test/fixtures";
describe("JobCard", () => {
  it("shows the company, role and location", () => {
    render(
      <DndContext>
        <JobCard job={makeJob()} onEdit={() => {}} onDelete={() => {}} />
      </DndContext>,
    );
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Remote")).toBeInTheDocument();
  });
  it("calls onDelete when the delete button is clicked", () => {
    const onDelete = vi.fn();
    render(
      <DndContext>
        <JobCard job={makeJob()} onEdit={() => {}} onDelete={onDelete} />
      </DndContext>,
    );
    screen.getByRole("button", { name: /delete/i }).click();
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
