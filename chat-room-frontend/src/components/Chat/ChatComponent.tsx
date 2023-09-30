import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import sendIcon from "@/assets/icons/send.svg";
import Image from "next/image";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useSelector } from "react-redux";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

interface ChatListProps {
  message: string;
  username: string;
}

const ChatComponent = () => {
  const router = useRouter();
  const roomId = router.query?.roomId;
  const [message, setMessage] = useState<string>("");
  const username = useSelector((state: any) => state.user.username);
  const [chatList, setChatList] = useState<ChatListProps[] | undefined>();

  useEffect(() => {
    socket = io(BACKEND_URL);
    socket.on("connect", () => {
      socket.emit("join-room", roomId);
    });
  }, []);

  useEffect(() => {
    socket.on("recieve-message", (broadcastMessage: ChatListProps) => {
      console.log(broadcastMessage);
      if (broadcastMessage.username !== username) {
        const temp = chatList ?? [];
        setChatList([...temp, broadcastMessage]);
      }
    });
  });

  const sendMessageHandler = () => {
    socket.emit("send-message", { message, username }, roomId);
    const temp = chatList ?? [];
    if (message !== "") {
      setChatList([...temp, { message, username }]);
    }
    setMessage("");
  };
  return (
    <div className='w-[90%] sm:w-1/2 h-[70vh] border bg-slate-100 rounded-xl flex flex-col '>
      <div className='p-3 px-4 flex justify-between'>
        <p>Room id: {roomId}</p>
        <p>username: {username}</p>
      </div>
      <div className='border' />
      <div className='px-4 h-full'>
        {chatList?.map((item, index) => {
          if (item.username !== username) {
            return (
              <div className='grid' key={index}>
                <p className='text-black text-lg font-semibold '>
                  {item.username}
                </p>
                <p className='text-sm font-normal p-1 ml-2'>
                  <span className='bg-white px-3 p-1 rounded-sm'>
                    {item.message}
                  </span>
                </p>
              </div>
            );
          }
          return (
            <div className='flex flex-col items-end' key={index}>
              <p className='text-sm font-normal p-1 mr-2'>
                <span className='bg-white px-3 p-1 rounded-sm'>
                  {item.message}
                </span>
              </p>
            </div>
          );
        })}
      </div>
      <div className='border' />
      <div className='flex  p-4 '>
        <input
          placeholder='message'
          className='w-full focus:outline-none bg-slate-100'
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <a
          className='cursor-pointer'
          onClick={() => {
            sendMessageHandler();
          }}
        >
          <Image src={sendIcon} alt='' />
        </a>
      </div>
    </div>
  );
};

export default ChatComponent;
