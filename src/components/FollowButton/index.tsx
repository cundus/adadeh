import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppSelector } from "../../store";
import API from "../../lib/api";

interface IFollowButtonProps {
   userId: number;
}

const FollowButton: React.FC<IFollowButtonProps> = ({ userId }) => {
   const { user } = useAppSelector((state) => state.auth);
   const [liked, setliked] = useState(false);
   console.log(userId);

   const getLike = async () => {
      try {
         const res = await API.get(`check-follow/${userId}`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         });

         setliked(res.data.data);
      } catch (error) {
         console.log(error);
      }
   };

   const handleLike = async () => {
      try {
         const res = await API.post(
            `follow`,
            {
               followingId: userId,
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
   }, [userId]);

   return (
      <IconButton aria-label="delete" onClick={() => handleLike()}>
         <FavoriteIcon sx={{ color: liked ? "red" : "gray" }} />
      </IconButton>
   );
};

export default FollowButton;
