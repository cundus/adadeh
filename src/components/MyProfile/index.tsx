import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import ProfileCard from "../ProfileCardV2";
import { IProfile } from "../../types/app";

const MyProfile = () => {
   const profile = useAppSelector((state) => state.auth.user);

   return (
      <div>
         <ProfileCard profile={profile as IProfile} />
      </div>
   );
};

export default MyProfile;
