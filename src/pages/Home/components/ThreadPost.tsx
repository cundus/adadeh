import {
   Box,
   Button,
   ImageList,
   ImageListItem,
   TextField,
} from "@mui/material";
import React, { useState } from "react";
import { createThread } from "../../../lib/api/call/thread";
import { useAppDispatch } from "../../../store";
import { getThreadAsync } from "../../../store/async/thread";

// function srcset(image: string, size: number, rows = 1, cols = 1) {
//    return {
//       src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
//       srcSet: `${image}?w=${size * cols}&h=${
//          size * rows
//       }&fit=crop&auto=format&dpr=2 2x`,
//    };
// }

interface IThreadPostProps {
   threadId?: number;
   callback?: () => Promise<void>;
}

const ThreadPost: React.FC<IThreadPostProps> = ({ threadId, callback }) => {
   const [threadPost, setThreadPost] = useState<{
      content: string;
      image: FileList | null;
      threadId?: number;
   }>({ content: "", image: null });
   const dispatch = useAppDispatch();

   const handlePostThread = async (e: React.MouseEvent) => {
      try {
         e.preventDefault();

         if (threadId) {
            threadPost.threadId = threadId;
         }

         const res = await createThread(threadPost);

         if (callback) {
            await callback();
         } else {
            await dispatch(getThreadAsync());
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <Box
            my={5}
            sx={{
               display: "flex",
               alignItems: "center",
               width: "100%",
               gap: 2,
            }}
         >
            <TextField
               fullWidth
               variant="standard"
               autoComplete="off"
               value={threadPost.content}
               sx={{ color: "white" }}
               color="success"
               onChange={(e) =>
                  setThreadPost({ ...threadPost, content: e.target.value })
               }
            />
            <label htmlFor="contained-button-file">
               gambar {threadPost.image?.length}
            </label>
            <input
               accept="image/*"
               id="contained-button-file"
               multiple
               max={4}
               type="file"
               hidden
               onChange={(e) => {
                  setThreadPost({ ...threadPost, image: e.target.files });
               }}
            />
            <Button
               onClick={handlePostThread}
               variant="contained"
               sx={{ backgroundColor: "#04A51E" }}
            >
               Post
            </Button>
         </Box>
         {/* <ImageList
               sx={{ width: 500, height: 450 }}
               variant="quilted"
               cols={4}
               rowHeight={121}
            >
               {threadPost.image?.length !== null && threadPost.image!.itemmap((item) => (
                  <ImageListItem
                     key={item.img}
                     cols={item.cols || 1}
                     rows={item.rows || 1}
                  >
                     <img
                        {...srcset(item.img, 121, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                     />
                  </ImageListItem>
               ))}
            </ImageList> */}
      </>
   );
};

export default ThreadPost;
