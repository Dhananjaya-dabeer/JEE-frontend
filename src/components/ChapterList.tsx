import { useMemo } from "react";
import { useAppSelector } from "../hooks/redux";
import ChapterCard from "./ChapterCard";

const ChapterList = () => {
  const { chapters, activeSubject, filters, sortOrder } = useAppSelector(
    (state) => state.chapters
  );

  const filteredAndSortedChapters = useMemo(() => {
    let filtered = chapters.filter((chapter) => {
      // Filter by subject
      if (chapter.subject !== activeSubject) return false;

      // Filter by classes
      if (filters.classes.length > 0) {
        if (!filters.classes.includes(chapter.class)) return false;
      }

      // Filter by units
      if (filters.units.length > 0) {
        if (!filters.units.includes(chapter.unit)) return false;
      }

      // Filter by status
      if (
        filters.status.length > 0 &&
        !filters.status.includes(chapter.status)
      ) {
        return false;
      }

      // Filter by weak chapters
      if (filters.weakChapters && !chapter.isWeakChapter) {
        return false;
      }

      return true;
    });

    // Sort chapters
    filtered.sort((a, b) => {
      const comparison = a.chapter.localeCompare(b.chapter);
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [chapters, activeSubject, filters, sortOrder]);

  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Showing all chapters ({filteredAndSortedChapters.length})
        </p>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {filteredAndSortedChapters.map((chapter, index) => (
          <ChapterCard
            key={`${chapter.subject}-${chapter.chapter}-${index}`}
            chapter={chapter}
          />
        ))}
      </div>

      {filteredAndSortedChapters.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
            No chapters found matching your filters
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mt-2">
            Try adjusting your filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default ChapterList;
