import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReplies, getThreadById } from "../../lib/api/call/thread";
import { IThread } from "../../types/app";
import { Box, TextField, Typography } from "@mui/material";
import ThreadCard from "../../components/ThreadCard";
import ThreadPost from "../Home/components/ThreadPost";

const DetailThread = () => {
   const { threadId } = useParams();

   const [threadDetail, setThreadDetail] = useState<IThread>({
      userId: 0,
      content: "",
      image: [],
      id: 0,
   });

   const [replies, setReplies] = useState<IThread[]>([]);

   const fetchThreadDetail = async () => {
      try {
         const res = await getThreadById(Number(threadId));
         const resReplies = await getReplies(Number(threadId));

         setThreadDetail(res.data.data);
         setReplies(resReplies.data.data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchThreadDetail();
   }, [threadId]);

   return (
      <Box>
         <Box>
            <Typography>{threadDetail.author?.fullname}</Typography>
            <Typography>{threadDetail.content}</Typography>
            {threadDetail.image &&
               threadDetail.image.map((image) => (
                  <img
                     src={"http://localhost:5001/uploads/" + image.image}
                     alt="image"
                     style={{ width: "100%" }}
                  />
               ))}
         </Box>

         <Box>
            <ThreadPost
               callback={fetchThreadDetail}
               threadId={Number(threadId)}
            />
         </Box>

         <Box>
            {replies.map((reply) => (
               <ThreadCard thread={reply} key={reply.id} />
            ))}
         </Box>
      </Box>
   );
};

export default DetailThread;
