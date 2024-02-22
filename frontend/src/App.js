import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./utils/PrivateRouter";
import ProfilePage from "./pages/ProfilePage";
import MyEventsPage from "./pages/MyEventsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/myEvents" element={<MyEventsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
