import FormPage from "./pages/form-page/form-page";
import DataVisualization from "./pages/data-visualization/data-visualization";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/data-visualization" element={<DataVisualization />} />
      </Routes>
    </div>
  );
}

export default App;
