"use client";
import AptitudeTest from "@/comps/Test";
import React from "react";
import UserForm from "./Form/UserForm";

function page() {
  const [userID, setUserID] = React.useState<string | null>(null);
  const OnUserId = (data: string) => {
    setUserID(data);
  };
  return (
    <div>
      {userID ? (
        <AptitudeTest userID={userID} />
      ) : (
        <UserForm onUserCreated={OnUserId} />
      )}
    </div>
  );
}

export default page;
