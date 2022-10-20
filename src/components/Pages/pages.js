import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../home-page/Home";
import UserPage from "../userPage/userPage";
import Notification from "../Notification/notification";
import { alertNotification } from "../../mockData";

const Pages = ({profile}) => {
      return (
          <BrowserRouter>
               <Routes>
                    <Route path="/" element={<Home />} />
                    {profile.user?.uid && <Route path={`/user/${profile.user.uid}`} element={<UserPage />}/>}
                    <Route path={`/notification/`} element={<Notification alerts={alertNotification}/>}/>
                   

               </Routes>
          </BrowserRouter>
      )
    
}

export default Pages;