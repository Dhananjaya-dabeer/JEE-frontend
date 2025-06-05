import { ArrowUpDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  setClassesFilter,
  setUnitsFilter,
  toggleSortOrder,
} from "../store/chaptersSlice";
import { getUniqueClasses, getUniqueUnits } from "../data/mockData";
import FilterDropdown from "./FilterDropdown";
import StatusFilters from "./StatusFilters";

const FiltersSection = () => {
  const dispatch = useAppDispatch();
  const { activeSubject, filters } = useAppSelector((state) => state.chapters);

  const availableClasses = getUniqueClasses(activeSubject);
  const availableUnits = getUniqueUnits(activeSubject);

  return (
    <div className="space-y-4">
      {/* Desktop Filters */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <FilterDropdown
            label="Class"
            options={availableClasses}
            selectedValues={filters.classes}
            onSelectionChange={(values) => dispatch(setClassesFilter(values))}
          />

          <FilterDropdown
            label="Units"
            options={availableUnits}
            selectedValues={filters.units}
            onSelectionChange={(values) => dispatch(setUnitsFilter(values))}
          />

          <StatusFilters />
        </div>

        <button
          onClick={() => dispatch(toggleSortOrder())}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          <ArrowUpDown size={16} />
          <span>Sort</span>
        </button>
      </div>

      {/* Mobile Filters - All in one scrollable line */}
      <div className="md:hidden">
        <div className="overflow-x-auto">
          <div className="flex items-center space-x-3 pb-2 min-w-max px-1 h-32">
            <FilterDropdown
              label="Class"
              options={availableClasses}
              selectedValues={filters.classes}
              onSelectionChange={(values) => dispatch(setClassesFilter(values))}
            />

            <FilterDropdown
              label="Units"
              options={availableUnits}
              selectedValues={filters.units}
              onSelectionChange={(values) => dispatch(setUnitsFilter(values))}
            />

            <StatusFilters />

            <button
              onClick={() => dispatch(toggleSortOrder())}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg whitespace-nowrap flex-shrink-0"
            >
              <ArrowUpDown size={16} />
              <span>Sort</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
