import { Route, Routes } from "react-router-dom";
import "./App.css";
import InputForm from "./Pages/InputForm";
import UpdateForm from "./Pages/UpdateForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<InputForm />} />
      <Route path="/updateform" element={<UpdateForm />} />
    </Routes>
  );
}

export default App;
