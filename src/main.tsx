import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider.tsx";
import "./index.css";
import Browse from "./pages/Browse.tsx";
import Detail from "./pages/Detail.tsx";
import Home from "./pages/Home.tsx";
import Layout from "./pages/Layout.tsx";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="browse/" element={<Browse />} />
            <Route path="browse/:id" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
