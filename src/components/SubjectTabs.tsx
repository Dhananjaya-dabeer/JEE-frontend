import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setActiveSubject } from "../store/chaptersSlice";
import * as PhosphorIcons from "phosphor-react";

const SubjectTabs = () => {
  const dispatch = useAppDispatch();
  const activeSubject = useAppSelector((state) => state.chapters.activeSubject);

  const subjects = [
    {
      name: "Physics" as const,
      label: "Physics PYQs",
      icon: "Atom",
      color: "text-orange-500",
      bgColor: "bg-orange-500",
    },
    {
      name: "Chemistry" as const,
      label: "Chemistry PYQs",
      icon: "TestTube",
      color: "text-green-500",
      bgColor: "bg-green-500",
    },
    {
      name: "Mathematics" as const,
      label: "Mathematics PYQs",
      icon: "Calculator",
      color: "text-blue-500",
      bgColor: "bg-blue-500",
    },
  ];

  return (
    <div className="flex xl:flex-col  bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-6 xl:w-[100%]">
      {subjects.map((subject) => {
        const IconComponent = (PhosphorIcons as any)[subject.icon];
        const isActive = activeSubject === subject.name;

        return (
          <button
            key={subject.name}
            onClick={() => dispatch(setActiveSubject(subject.name))}
            className={`flex flex-col xl:flex-row items-center justify-center xl:justify-between  space-x-2 px-6 py-3 rounded-md flex-1  transition-all duration-200 ${
              isActive
                ? "bg-white dark:bg-gray-700 shadow-sm"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${subject.bgColor}`}
            >
              <IconComponent size={14} weight="bold" className="text-white" />
            </div>
            <span
              className={`font-medium text-[10px] md:text-base  ${
                isActive
                  ? `${subject.color} dark:text-white`
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {subject.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SubjectTabs;
