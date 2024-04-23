import { Box, Typography } from "@mui/material";
import { IThread } from "../../types/app";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton";

interface IThreadCardProps {
   thread: IThread;
}

const ThreadCard: React.FC<IThreadCardProps> = ({ thread }) => {
   const navigate = useNavigate();

   return (
      <Box
         borderBottom={"1px solid gray"}
         padding={"10px"}
         mb={1}
         sx={{ cursor: "pointer" }}
      >
         <Box
            onClick={() => {
               navigate(`/detail/${thread.id}`);
            }}
         >
            <Typography variant="body1">{thread.content}</Typography>
            <Typography variant="body2" color="gray">
               {thread.author?.username}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
               {thread.image &&
                  thread.image.map((image) => (
                     <img
                        src={"http://localhost:5001/uploads/" + image.image}
                        alt="image"
                        style={{
                           // width: "100%",
                           flex: 1,
                           height: "200px",
                           borderRadius: "20px",
                           objectFit: "cover",
                        }}
                     />
                  ))}
            </Box>
         </Box>
         <LikeButton threadId={thread.id as number} />
      </Box>
   );
};

export default ThreadCard;
