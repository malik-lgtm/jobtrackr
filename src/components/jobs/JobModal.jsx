import Modal from "../ui/Modal";
import JobForm from "./JobForm";
export default function JobModal({ open, job, onClose, onSave }) {
  return (
    <Modal open={open} title={job ? "Edit job" : "Add a job"} onClose={onClose}>
      {/* key resets the form when switching between jobs */}
      <JobForm key={job?.id ?? "new"} initial={job} onSubmit={onSave} onCancel={onClose} />
    </Modal>
  );
}
