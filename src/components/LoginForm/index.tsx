import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { loginApi } from "../../lib/api/call/user";
import { getProfile } from "../../lib/api/call/profile";
import { useAppDispatch, useAppSelector } from "../../store";
import { SET_LOGIN } from "../../store/slice/auth";
import { getProfileAsync, loginAsync } from "../../store/async/auth";
import { Controller, SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import {
   IFormInput,
   useLoginValidation,
} from "../../lib/validation/useLoginValidation";

interface ILoginFormProps {
   callback: () => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({ callback }) => {
   const dispatch = useAppDispatch();
   const { control, reset, handleSubmit } = useLoginValidation();

   const [formInput, setFormInput] = React.useState<{
      username: string;
      password: string;
   }>({
      username: "",
      password: "",
   });

   const handleLogin: SubmitHandler<IFormInput> = async (data) => {
      try {
         const token = (await dispatch(loginAsync(data))).payload;

         console.log("token before get profile", token);

         await dispatch(getProfileAsync(token));

         callback();
      } catch (error) {
         console.log(error);
      }
   };

   const errorCatcher: SubmitErrorHandler<IFormInput> = (data) => {
      console.log("ERROR", JSON.stringify(data, null, 2));
   };

   return (
      <Box sx={{}}>
         <form onSubmit={handleSubmit(handleLogin, errorCatcher)}>
            <Box display={"flex"} flexDirection={"column"}>
               <Controller
                  control={control}
                  name="username"
                  render={({ field, fieldState }) => (
                     <TextField
                        label="Email or Username"
                        sx={{
                           marginBottom: "10px",
                        }}
                        {...field}
                        error={!!fieldState.error?.message}
                        helperText={fieldState.error?.message}
                     />
                  )}
               />

               <Controller
                  control={control}
                  name="password"
                  render={({ field, fieldState }) => (
                     <TextField
                        label="Password"
                        type="password"
                        sx={{
                           marginBottom: "10px",
                        }}
                        {...field}
                        error={!!fieldState.error?.message}
                        helperText={fieldState.error?.message}
                     />
                  )}
               />

               <Button type="submit">Login</Button>
            </Box>
         </form>
      </Box>
   );
};

export default LoginForm;
