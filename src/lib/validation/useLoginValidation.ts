import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IFormInput {
   username: string;
   password: string;
}

export const useLoginValidation = () => {
   const initialValue: IFormInput = {
      username: "",
      password: "",
   };

   const schema = yup.object().shape({
      username: yup
         .string()
         .required("harussss ada boss")
         .min(5, "jangan kurang dari 5"),
      password: yup
         .string()
         .required("kosong euy")
         .min(5, "jangan kurang dari 5 atuh"),
   });

   return useForm<IFormInput>({
      defaultValues: initialValue,
      resolver: yupResolver(schema),
      mode: "all",
      reValidateMode: "onSubmit",
   });
};
