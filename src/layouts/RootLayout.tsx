import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { getProfile } from "../lib/api/call/profile";
import { SET_LOGIN } from "../store/slice/auth";
import { useAppDispatch, useAppSelector } from "../store";
import ProfileCard from "../components/ProfileCard";

const RootLayout = () => {
   const dispatch = useAppDispatch();
   const auth = useAppSelector((state) => state.auth);

   const checkToken = async () => {
      try {
         const token = localStorage.getItem("token");
         if (!token) return;
         const res = await getProfile(token);
         dispatch(SET_LOGIN({ user: res.data.data, token }));
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      checkToken();
   }, []);

   return (
      <Box
         sx={{
            display: "flex",
            backgroundColor: "#1d1d1d",
            height: "100vh",
            color: "white",
         }}
      >
         <Box flex={1}>
            <Sidebar />
         </Box>
         <Box flex={2.5} sx={{ overflowY: "auto", border: "2px solid grey" }}>
            <Outlet />
         </Box>
         <Box flex={1.5} sx={{ padding: "20px" }}>
            {auth.token && <ProfileCard />}
         </Box>
      </Box>
   );
};

export default RootLayout;
