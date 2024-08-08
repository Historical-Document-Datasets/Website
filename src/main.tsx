import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Browse from "./pages/Browse.tsx";
import Contribute from "./pages/Contribute.tsx";
import Detail from "./pages/Detail.tsx";
import Home from "./pages/Home.tsx";
import Layout from "./pages/Layout.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contribute//*" element={<Contribute />} />
          <Route path="browse/" element={<Browse />} />
          <Route path="browse/:name" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
