import Header from "../components/Header";
import FiltersSection from "../components/FiltersSection";
import ChapterList from "../components/ChapterList";
import Sidebar from "../components/Sidebar";
import SubjectTabs from "../components/SubjectTabs";

const Index = () => {
  return (
    <div className="min-h-screen xl:flex bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="xl:min-w-[350px] xl:max-w-[500px] xl:flex-1 hidden xl:flex xl:justify-center border-r border-gray-300 dark:border-gray-700 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.1)] dark:shadow-[4px_0_8px_-2px_rgba(255,255,255,0.1)]">
        <Sidebar />
      </div>
      <div className="xl:flex-1">
        <Header />

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          <span className="xl:hidden">
            <SubjectTabs />
          </span>
          <FiltersSection />
          <div className="mt-4 sm:mt-6">
            <ChapterList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
