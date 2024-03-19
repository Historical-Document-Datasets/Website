import Navbar from "./components/Navbar";
import Search from "./components/Search";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container max-w-screen-2xl py-6">
        <Search />
      </div>
    </>
  );
}
