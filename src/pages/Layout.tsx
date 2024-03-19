import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  return (
    <>
      <Navbar />
      <div className="container max-w-screen-2xl">
        <Outlet />
      </div>
    </>
  );
}
