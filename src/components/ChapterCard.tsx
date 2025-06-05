import React from "react";
import type { Chapter } from "../data/mockData";
import * as PhosphorIcons from "phosphor-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { IconProps } from "phosphor-react";

interface ChapterCardProps {
  chapter: Chapter;
}

// Random icon assignment function
const getRandomIcon = (chapterName: string): string => {
  const icons = [
    "Planet",
    "Function",
    "Ruler",
    "ArrowRight",
    "ArrowsOutCardinal",
    "Target",
    "CircleWavyCheck",
    "Atom",
    "LinkSimple",
    "CirclesThree",
    "TestTube",
    "Calculator",
    "MathOperations",
    "Graph",
    "ChartLine",
    "Books",
    "Lightbulb",
    "FlaskConical",
    "Dna",
    "Molecule",
    "Triangle",
    "Circle",
    "Square",
  ];

  // Using chapter name to consistently get the same icon
  const hash = chapterName
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return icons[hash % icons.length];
};

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter }) => {
  const iconName = getRandomIcon(chapter.chapter);
  const IconComponent = (PhosphorIcons[
    iconName as keyof typeof PhosphorIcons
  ] ?? PhosphorIcons.Circle) as React.ComponentType<IconProps>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "In Progress":
        return "text-blue-500";
      default:
        return "text-gray-400";
    }
  };

  //  total questions for current and previous year
  const currentYearQuestions = chapter.yearWiseQuestionCount["2025"] || 0;
  const previousYearQuestions = chapter.yearWiseQuestionCount["2024"] || 0;

  // total questions across all years
  const totalQuestions = Object.values(chapter.yearWiseQuestionCount).reduce(
    (sum, count) => sum + count,
    0
  );

  // Determine trend
  const getTrendIcon = () => {
    if (currentYearQuestions > previousYearQuestions) {
      return <TrendingUp size={12} className="text-green-500" />;
    } else if (currentYearQuestions < previousYearQuestions) {
      return <TrendingDown size={12} className="text-red-500" />;
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            <div className="flex-shrink-0 mt-0.5">
              <IconComponent
                size={20}
                className="text-orange-500"
                weight="duotone"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight">
                {chapter.chapter}
              </h3>
            </div>
          </div>
          {chapter.isWeakChapter && (
            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <span>2025: {currentYearQuestions}Qs</span>
            {getTrendIcon()}
            <span>2024: {previousYearQuestions}Qs</span>
          </div>
          <div className="text-right">
            <div className="text-xs font-medium text-gray-900 dark:text-white">
              {chapter.questionSolved}/{totalQuestions} Qs
            </div>
            <div className={`text-xs ${getStatusColor(chapter.status)}`}>
              {chapter.status}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <IconComponent
              size={24}
              className="text-orange-500"
              weight="duotone"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">
              {chapter.chapter}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span>2025: {currentYearQuestions}Qs</span>
              {getTrendIcon()}
              <span>| 2024: {previousYearQuestions}Qs</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 flex-shrink-0">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {chapter.questionSolved}/{totalQuestions} Qs
            </div>
            <div className={`text-xs ${getStatusColor(chapter.status)}`}>
              {chapter.status}
            </div>
          </div>

          {chapter.isWeakChapter && (
            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
          )}
        </div>
      </div>

      {chapter.status === "In Progress" && totalQuestions > 0 && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${(chapter.questionSolved / totalQuestions) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterCard;
