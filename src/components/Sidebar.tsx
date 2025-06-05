import { subjectInfo } from "../utils/commonData";
import { useAppSelector } from "../hooks/redux";
import SubjectTabs from "./SubjectTabs";
import logo from "../assets/logo.svg";
const Sidebar = () => {
  const { activeSubject } = useAppSelector((state) => state.chapters);
  const currentInfo = subjectInfo[activeSubject];
  return (
    <div className="flex flex-col space-y-10 first-letter pt-5 w-[70%]">
      <div className="flex items-center justify-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br  rounded-lg flex items-center justify-center">
          <img src={logo} className="text-white text-sm font-bold" />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          JEE Main
        </h1>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
        {currentInfo.years} | {currentInfo.papers} | {currentInfo.questions}
      </div>
      <div>
        <SubjectTabs />
      </div>
    </div>
  );
};

export default Sidebar;
