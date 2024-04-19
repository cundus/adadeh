import API from "..";

interface ILoginBody {
   username: string;
   password: string;
}

export const loginApi = async (body: ILoginBody) => {
   return await API.post("login", body);
};
