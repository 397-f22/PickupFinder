import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../home-page/Home";
import UserPage from "../userPage/userPage";
import Notification from "../Notification/notification";


const Pages = ({profile}) => {
      return (
          <BrowserRouter>
               <Routes>
                    <Route path="/" element={<Home />} />
                    {profile.user?.uid && <Route path={`/user/${profile.user.uid}`} element={<UserPage />}/>}
                    {profile.user?.uid && <Route path={`/notifications/`} element={<Notification uid={profile.user.uid}/>}/>}
                   

               </Routes>
          </BrowserRouter>
      )
    
}

export default Pages;