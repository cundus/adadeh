import { useEffect, useState } from "react";
import { IThread } from "../../types/app";
import { getThreads } from "../../lib/api/call/thread";
import ThreadCard from "../../components/ThreadCard";
import { Box, Button, TextField } from "@mui/material";
import ThreadPost from "./components/ThreadPost";

const Home = () => {
   const [threads, setThreads] = useState<IThread[] | []>([]);

   async function getThread() {
      try {
         const res = await getThreads();
         setThreads(res.data.data);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      getThread();
   }, []);

   return (
      <div>
         <h1>home</h1>
         <ThreadPost callback={getThread} />

         {threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
         ))}
      </div>
   );
};

export default Home;
