import DashBoard from "./Pages/DashBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUP from "./Pages/SignUP";
import SignIn from "./Pages/SignIn";
import ProtectedRoute from "./Components/ProtectedRoute";
import DashboardLayout from "./Components/DasboardLayout";
import TwitterPage from "./Pages/TwitterPage";
import YoutubePage from "./Pages/YoutubePage";
import InvalidPage from "./Pages/InvalidPage";
import Others from "./Pages/Others";
import ShareBrain from "./Pages/ShareBrain";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUP />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/share/:id" element={<ShareBrain />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/twitter"
            element={
              <ProtectedRoute>
                <TwitterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/youtube"
            element={
              <ProtectedRoute>
                <YoutubePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/other"
            element={
              <ProtectedRoute>
                <Others />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<InvalidPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//todo: fix tweet embedding 
//10. set env vercel config, deploy BE,
//11. set the config file with backend and frontend url in FE.
//12. Deploy FE
//---DONE---- by 18EOD --hah couldn't -> tomo'


