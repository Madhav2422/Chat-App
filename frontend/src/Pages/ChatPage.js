import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import SideDrawer from '../components/miscenalleous/SideDrawer'
import {Box} from '@chakra-ui/react'
import MyChats from '../components/miscenalleous/MyChats'
import ChatBox from '../components/miscenalleous/ChatBox'



const ChatPage = () => {
  const {user}=ChatState()
  return (
    <div style={{width:'100%'}}>
       {user && <SideDrawer/>} 
      <Box
       display='flex'
       justifyContent='space-between'
       w='100'
       h='91.5vh'
       p='10px'
      >
        {user && <MyChats/>}
        {user && <ChatBox/>}

      </Box>
    </div>
  )
}

export default ChatPage