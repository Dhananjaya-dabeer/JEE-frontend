import { useTheme } from "../contexts/ThemeContext";
import { useAppSelector } from "../hooks/redux";
import * as PhosphorIcons from "phosphor-react";
import type { IconProps } from "phosphor-react";
import { subjectInfo } from "../utils/commonData";
const Header = () => {
  const { theme, setTheme } = useTheme();
  const { activeSubject } = useAppSelector((state) => state.chapters);

  const currentInfo = subjectInfo[activeSubject];
  const IconComponent = PhosphorIcons[
    currentInfo.icon as keyof typeof PhosphorIcons
  ] as React.ComponentType<IconProps>;
  return (
    <div className="bg-white dark:bg-gray-900  border-gray-200 dark:border-gray-700">
      {/* Mobile Header */}
      <div className="md:hidden px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              JEE Main
            </h1>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <span className="text-lg">{theme === "dark" ? "🌞" : "🌙"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block px-6 py-4">
        <div className="flex items-center justify-center">
          <div className="flex flex-1 items-center justify-center flex-col space-x-2">
            <span className="text-sm font-medium text-orange-500  items-center  px-3 py-1 rounded-full flex space-x-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${currentInfo.bgColor}`}
              >
                <IconComponent size={14} weight="bold" className="text-white" />
              </div>
              <span className={`${currentInfo.color} dark:text-white`}>
                {currentInfo.title}
              </span>
            </span>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {currentInfo.subtitle}
            </p>
            <div className="xl:hidden text-xs text-gray-600 dark:text-gray-400 space-y-1 text-center">
              <div>{currentInfo.subtitle}</div>
              <div>
                {currentInfo.years} | {currentInfo.papers} |{" "}
                {currentInfo.questions}
              </div>
            </div>
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
