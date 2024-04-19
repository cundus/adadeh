import API from "..";

export const getThreads = async () => {
   return await API.get("threads");
};

export const createThread = async (body: {
   content: string;
   image: FileList | null;
}) => {
   const formData = new FormData();

   if (body.image !== null) {
      for (let i = 0; i < body.image.length; i++) {
         formData.append("image", body.image[i]);
      }
      // formData.append("image", body.image);
   }

   formData.append("content", body.content);

   return await API.post("thread", formData, {
      headers: {
         "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
   });
};
