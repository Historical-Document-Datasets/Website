// import Search from "@/components/Search";
import { FilterBox } from "@/components/Filterbox";
import Sidebar from "@/components/Sidebar";

export default function Browse() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        {/* <Search /> */}
        <FilterBox />
      </div>
    </div>
  );
}
