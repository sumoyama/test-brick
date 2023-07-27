import { Route, Routes } from "react-router-dom";
import Purchase from "./pages/Purchase";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Purchase />} />
    </Routes>
  );
}

export default App;
