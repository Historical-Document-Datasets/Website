import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";

export default function Browse() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Search />
      </div>
    </div>
  );
}
