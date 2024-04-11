import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="container max-w-screen-2xl flex-1">
        <Outlet />
      </div>
    </div>
  );
}
