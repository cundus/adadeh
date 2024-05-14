import { Avatar, Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { IProfile } from "../../types/app";

interface IProps {
   profile: IProfile;
}

const ProfileCard: FC<IProps> = ({ profile }) => {
   const _host_url = "http://localhost:5001/uploads/";
   return (
      <Box
         sx={{
            backgroundColor: "#262626",
            borderRadius: "10px",
            padding: "20px",
         }}
      >
         <Typography>My Profile</Typography>
         <img
            src={_host_url + profile?.cover}
            alt="cover"
            style={{
               width: "100%",
               height: "200px",
               borderRadius: "20px",
               objectFit: "cover",
            }}
         />
         <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
            paddingInline={"25px"}
            marginTop={-7}
         >
            <Avatar
               src={_host_url + profile?.avatar}
               alt="avatar"
               sx={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  border: "5px solid #262626",
               }}
            />
            <Button>Edit Profile</Button>
         </Box>

         <Typography>{profile?.user?.fullname}</Typography>
         <Typography>@{profile?.user?.username}</Typography>
         <Typography>{profile?.bio}</Typography>
      </Box>
   );
};

export default ProfileCard;
