import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { loginApi } from "../../lib/api/call/user";
import { getProfile } from "../../lib/api/call/profile";
import { useAppDispatch } from "../../store";
import { SET_LOGIN } from "../../store/slice/auth";

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
         const res = await loginApi(formInput);
         const token = res.data.data;
         const resProfile = await getProfile(token);
         localStorage.setItem("token", token);
         dispatch(SET_LOGIN({ user: resProfile.data.data, token }));
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
