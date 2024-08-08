import { StateMachineProvider, createStore } from "little-state-machine";
import { Route, Routes } from "react-router-dom";
import Step1 from "./contribution_form/Step1";
import Step2 from "./contribution_form/step2";

export default function Contribute() {
  createStore({
    information: {
      name: "",
      languages: [],
      tasks: [""],
      formats: [],
      modes: [],
      statistics: "",
      class: "",
      document_type: "",
      resolution: "",
      reference: "",
      description: "",
    },
  });

  return (
    <div className="container max-w-screen-lg mt-6">
      <StateMachineProvider>
        <Routes>
          <Route path="/" element={<Step1 />} />
          <Route path="/2" element={<Step2 />} />
        </Routes>
      </StateMachineProvider>
    </div>
  );
}
