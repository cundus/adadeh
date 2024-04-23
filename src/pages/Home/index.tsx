import { useEffect, useState } from "react";
import { IThread } from "../../types/app";
import { getThreads } from "../../lib/api/call/thread";
import ThreadCard from "../../components/ThreadCard";
import { Box, Button, TextField } from "@mui/material";
import ThreadPost from "./components/ThreadPost";
import { useAppDispatch, useAppSelector } from "../../store";
import { getThreadAsync } from "../../store/async/thread";

const Home = () => {
   const { thread } = useAppSelector((state) => state);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getThreadAsync());
   }, []);

   return (
      <div>
         <h1>home</h1>
         <ThreadPost />

         {thread.threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
         ))}
      </div>
   );
};

export default Home;
