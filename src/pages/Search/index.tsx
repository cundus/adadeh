import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import API from "../../lib/api";
import FollowButton from "../../components/FollowButton";

const Search = () => {
   const [keyword, setKeyword] = useState("");
   const [users, setUsers] = useState([]);

   const getUser = async () => {
      try {
         const { data } = await API.get("users?username" + keyword, {
            headers: {
               Authorization: "Bearer " + localStorage.getItem("token"),
            },
         });

         setUsers(data.data);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Box display={"flex"} flexDirection={"column"}>
         <Box display={"flex"}>
            <TextField
               placeholder="search"
               onChange={(e) => setKeyword(e.target.value)}
               value={keyword}
            />
            <Button onClick={getUser}>Search</Button>
         </Box>

         {users &&
            users.map((item) => (
               <Box>
                  {item.username} - <FollowButton userId={item.id} />
               </Box>
            ))}
      </Box>
   );
};

export default Search;
