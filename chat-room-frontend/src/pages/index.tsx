import { generateRandomId } from "@/utils/common_functions";
import { Button, Input } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [roomCode, setRoomCode] = useState<string>();
  const router = useRouter();

  const handleCreateNewRoom = () => {
    const newRoomId = generateRandomId(6);
    router.push(`room/${newRoomId}`);
  };
  const handleRoomJoin = () => {
    router.push(`room/${roomCode}`);
  };
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className='grid gap-6'>
        <Button
          onClick={() => {
            handleCreateNewRoom();
          }}
        >
          create room
        </Button>
        <div className='flex gap-4'>
          <Input
            placeholder='Enter room code'
            onChange={(e) => {
              setRoomCode(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              handleRoomJoin();
            }}
          >
            Join
          </Button>
        </div>
      </div>
    </div>
  );
}
