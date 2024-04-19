import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <header className="my-[150px] flex items-end justify-center text-center">
        <div>
          <h1 className="text-4xl font-bold">
            Historical Document Image Dataset Catalog
          </h1>
          <p className="text-lg mt-4">
            A Premier Resource for Scholars in Document Recognition and Digital
            Humanities
          </p>
        </div>
      </header>

      <div className="flex justify-center">
        <div className="flex w-full max-w-screen-sm rounded-2xl border items-center ">
          <Search className="h-6 w-6 shrink-0 ml-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search for a dataset..."
            className="rounded-2xl flex-1 ml-2 pl-2 py-3 text-gray-700 bg-transparent"
            onFocus={() => navigate("/browse")}
          />
        </div>
      </div>

      <section className="mt-[140px]">
        <p className="mt-4 text-justify">
          This catalog, inspired by the foundational paper{" "}
          <a
            className="text-blue-600 hover:text-blue-800"
            href="https://arxiv.org/abs/2203.08504"
          >
            A Survey of Historical Document Image Datasets
          </a>
          , aims to be the definitive source of historical document datasets for
          researchers and developers. Leveraging the collaborative model of{" "}
          <a href="https://htr-united.github.io/">HTR-United</a>, we strive to
          offer the most comprehensive and up-to-date repository of data for
          academic and professional use in document recognition and digital
          humanities.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Contribute</h2>
        <p className="mt-4">
          We encourage contributions from the community. Enhance the catalog by
          sharing new datasets or updates, fostering a richer resource for all
          users.
        </p>
      </section>

      <footer className="mt-10">
        <h2 className="text-2xl font-semibold">Acknowledgements</h2>
        <p className="mt-4">
          This site was developed by Tristan Kermorvant using data provided by
          Konstantina Nikolaidou based on an original idea by Christopher
          Kermorvant.
        </p>
      </footer>
    </div>
  );
}
