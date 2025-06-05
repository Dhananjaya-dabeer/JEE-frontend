import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedValues,
  onSelectionChange,
  placeholder = `Select ${label}`,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOption = (option: string) => {
    const newSelection = selectedValues.includes(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option];
    onSelectionChange(newSelection);
  };

  const displayText =
    selectedValues.length > 0
      ? selectedValues.length === 1
        ? selectedValues[0]
        : `${selectedValues.length} selected`
      : placeholder;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-w-[120px]"
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown
          size={16}
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[200px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-[500px] overflow-y-auto">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                onChange={() => handleToggleOption(option)}
                className="hidden"
              />
              <div
                className={`w-4 h-4 border rounded flex items-center justify-center ${
                  selectedValues.includes(option)
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {selectedValues.includes(option) && (
                  <Check size={12} className="text-white" />
                )}
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {option}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
