import { useRouter } from 'next/router'
import React from 'react'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux';
import UserComponent from '@/components/Chat/UserComponent';
const ChatComponent = dynamic(()=>import('@/components/Chat/ChatComponent'));


const IndividualRoom = () => {
    const username = useSelector((state: any) => state.user.username);
    return (
      <div
        className={`flex min-h-screen flex-col items-center justify-between py-24 px-12 bg-slate-400`}
      >
        {username === "" ? <UserComponent /> : <ChatComponent />}
      </div>
    );
}

export default IndividualRoom