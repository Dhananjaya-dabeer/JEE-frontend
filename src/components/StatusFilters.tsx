import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setStatusFilter, setWeakChaptersFilter } from "../store/chaptersSlice";

const StatusFilters = () => {
  const dispatch = useAppDispatch();
  const { status: selectedStatus, weakChapters } = useAppSelector(
    (state) => state.chapters.filters
  );

  const statusOptions = ["Not Started", "In Progress", "Completed"];

  const handleStatusToggle = (status: string) => {
    const newSelection = selectedStatus.includes(status)
      ? selectedStatus.filter((s) => s !== status)
      : [...selectedStatus, status];
    dispatch(setStatusFilter(newSelection));
  };

  return (
    <div className="flex items-center space-x-3">
      {statusOptions.map((status) => (
        <button
          key={status}
          onClick={() => handleStatusToggle(status)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
            selectedStatus.includes(status)
              ? "bg-blue-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {status}
        </button>
      ))}

      <button
        onClick={() => dispatch(setWeakChaptersFilter(!weakChapters))}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border whitespace-nowrap flex-shrink-0 ${
          weakChapters
            ? "bg-orange-500 text-white border-orange-500"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-orange-300 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-gray-700"
        }`}
      >
        Weak Chapters
      </button>
    </div>
  );
};

export default StatusFilters;
