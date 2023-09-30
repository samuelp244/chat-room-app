import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const RoomPage = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    router.push('/')
  }, [])
  
  return (
    <div></div>
  )
}

export default RoomPage