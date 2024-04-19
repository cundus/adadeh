import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { useState } from "react";
import ModalDialog from "../ModalDialog";
import LoginForm from "../LoginForm";
import { SET_LOGOUT } from "../../store/slice/auth";

const MENU = [
   {
      title: "Home",
      link: "/",
   },
   {
      title: "Search",
      link: "/search",
   },
   {
      title: "Profile",
      link: "/profile",
   },
];

const Sidebar = () => {
   const auth = useAppSelector((state) => state.auth);
   const dispatch = useAppDispatch();
   const [show, setShow] = useState<boolean>(false);

   const handleCloseModal = () => {
      setShow(false);
   };

   return !auth.user ? (
      <>
         <Button onClick={() => setShow(true)}>LOGIN</Button>
         <ModalDialog callback={handleCloseModal} show={show}>
            <LoginForm callback={handleCloseModal} />
         </ModalDialog>
      </>
   ) : (
      <Box>
         {MENU.map((menu) => (
            <Box key={menu.title}>
               <Link to={menu.link} style={{ textDecoration: "none" }}>
                  <Typography color={"white"} variant="body1">
                     {menu.title}
                  </Typography>
               </Link>
            </Box>
         ))}
         <Box>
            <Button
               onClick={() => {
                  dispatch(SET_LOGOUT());
               }}
            >
               Logout
            </Button>
         </Box>
      </Box>
   );
};

export default Sidebar;
