import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Benefits from "./pages/Benefits/Benefits";
import SingleBenefit from "./pages/SingleBenefit/SingleBenefit";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/beneficios" replace />} />
        <Route path="/beneficios" element={<Benefits />} />
        <Route path="/beneficio/:id" element={<SingleBenefit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
