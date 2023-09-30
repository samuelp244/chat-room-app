import { setUser } from "@/redux/userReducer";
import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const UserComponent = () => {
  const [username, setUsername] = useState<string>();
  const dispatch = useDispatch();
  const updateUsername = () => {
    dispatch(setUser(username));
  };
  return (
    <div className='w-[90%] sm:w-1/2 h-[70vh] border bg-white rounded-xl flex flex-col items-center justify-center'>
      <div className='w-[90%]'>
        <div className='p-3 px-4 flex gap-4'>
          <Input
            placeholder='username'
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Button
            colorScheme='teal'
            onClick={() => {
              updateUsername();
            }}
          >
            Join
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
