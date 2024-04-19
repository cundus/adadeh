import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import Search from "./pages/Search";
import Profile from "./pages/Profile";

const App = () => {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<RootLayout />}>
                  <Route index element={<Home />} />
                  <Route path="search" element={<Search />} />
                  <Route path="profile" element={<Profile />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </>
   );
};

export default App;
