import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import DetailThread from "./pages/DetailThread";
import { useAppSelector } from "./store";

const App = () => {
   const { auth } = useAppSelector((state) => state);
   console.log(auth);

   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<RootLayout />}>
                  <Route index element={<Home />} />
                  <Route path="search" element={<Search />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="detail/:threadId" element={<DetailThread />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </>
   );
};

export default App;
