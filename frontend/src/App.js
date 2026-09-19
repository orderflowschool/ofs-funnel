import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Masterclass from "./pages/Masterclass";
import Legal from "./pages/Legal";
import MasterclassConfirmed from "./pages/MasterclassConfirmed";
import Application from "./pages/Application";
import Success from "./pages/Success";
import Booking from "./pages/Booking";
import PostBooking from "./pages/PostBooking";
import NotReadyYet from "./pages/NotReadyYet";
import { initGA, initMetaPixel } from "./utils/analytics";

function App() {
  useEffect(() => {
    // Initialize analytics on app mount
    initGA();
    initMetaPixel();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/masterclass" element={<Masterclass />} />
          <Route path="/masterclass-confirmed" element={<MasterclassConfirmed />} />
          <Route path="/legal" element={<Navigate to="/legal/privacy" replace />} />
          <Route path="/legal/:slug" element={<Legal />} />
          <Route path="/apply" element={<Application />} />
          <Route path="/success" element={<Success />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking-confirmed" element={<PostBooking />} />
          <Route path="/not-ready-yet" element={<NotReadyYet />} />
          {/* Any unknown URL (typos, stale links) goes home instead of a blank page. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
