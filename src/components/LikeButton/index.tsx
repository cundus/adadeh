import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppSelector } from "../../store";
import API from "../../lib/api";

interface ILikeButtonProps {
   threadId: number;
   totalLike: number;
}

const LikeButton: React.FC<ILikeButtonProps> = ({ threadId }) => {
   const { user } = useAppSelector((state) => state.auth);
   const [liked, setliked] = useState(false);
   const [totalLike, setTotalLike] = useState(0);

   const getLike = async () => {
      try {
         const res = await API.get(`like/${threadId}`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         });

         setliked(res.data.like === null ? false : true);
         setTotalLike(res.data.totalLike);
      } catch (error) {
         console.log(error);
      }
   };

   const handleLike = async () => {
      try {
         const res = await API.post(
            `like`,
            {
               threadId: threadId,
            },
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
            }
         );

         console.log(res);
         await getLike();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getLike();
   }, []);

   return (
      <Box sx={{ display: "flex", gap: 1 }}>
         <IconButton aria-label="delete" onClick={() => handleLike()}>
            <FavoriteIcon sx={{ color: liked ? "red" : "gray" }} />
         </IconButton>
         <Typography>{totalLike}</Typography>
      </Box>
   );
};

export default LikeButton;
