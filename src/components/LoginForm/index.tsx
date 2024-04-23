import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { loginApi } from "../../lib/api/call/user";
import { getProfile } from "../../lib/api/call/profile";
import { useAppDispatch, useAppSelector } from "../../store";
import { SET_LOGIN } from "../../store/slice/auth";
import { getProfileAsync, loginAsync } from "../../store/async/auth";

interface ILoginFormProps {
   callback: () => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({ callback }) => {
   const dispatch = useAppDispatch();

   const [formInput, setFormInput] = React.useState<{
      username: string;
      password: string;
   }>({
      username: "",
      password: "",
   });

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         const token = (await dispatch(loginAsync(formInput))).payload;

         console.log("token before get profile", token);

         await dispatch(getProfileAsync(token));

         callback();
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Box sx={{}}>
         <form onSubmit={handleLogin}>
            <Box display={"flex"} flexDirection={"column"}>
               <TextField
                  label="Email or Username"
                  value={formInput.username}
                  onChange={(e) =>
                     setFormInput({ ...formInput, username: e.target.value })
                  }
                  sx={{
                     marginBottom: "10px",
                  }}
               />
               <TextField
                  label="Password"
                  type="password"
                  value={formInput.password}
                  onChange={(e) =>
                     setFormInput({ ...formInput, password: e.target.value })
                  }
               />
               <Button type="submit">Login</Button>
            </Box>
         </form>
      </Box>
   );
};

export default LoginForm;
