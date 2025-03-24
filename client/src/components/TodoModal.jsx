import { useEffect, useState } from "react";

export default function TodoModal({
  onClose,
  onSubmit,
  title,
  buttonName,
  taskData,
}) {
  const [formData, setFormData] = useState({
    title: taskData?.title || "",
    description: taskData?.description || "",
    dueDate: taskData?.dueDate || "",
  });
  const [error, setError] = useState("");

  // Validate the due date whenever it changes
  useEffect(() => {
    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // reset time for accurate comparison

      if (selectedDate < today) {
        setError("Due date cannot be in the past.");
      } else {
        setError("");
      }
    } else {
      setError("");
    }
  }, [formData.dueDate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent submission if there's an error
    if (error) return;

    onSubmit(formData);

    // Reset the form
    setFormData({
      title: "",
      description: "",
      dueDate: "",
    });

    // Close the modal
    onClose();
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 font-medium">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="border p-2 rounded"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="mb-1 font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="border p-2 rounded"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dueDate" className="mb-1 font-medium">
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              className="border p-2 rounded"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 border rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded ${
                error ? "bg-gray-300" : "bg-blue-500"
              }`}
              disabled={!!error}
            >
              {buttonName}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
