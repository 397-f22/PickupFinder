import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./components/home-page/Home";
import UserPage from "./components/userPage/userPage";
import { useProfile } from "./utilities/useProfile";

function App() {
  const [profile, profileError, profileLoading] = useProfile();
  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;
  
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {profile.user?.uid && <Route path={`/user/${profile.user.uid}`} element={<UserPage />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
