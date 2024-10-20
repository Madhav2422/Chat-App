import React, { useState } from 'react'
import { Box, Button, Tooltip, Text, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, useToast } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from "axios"
import ChatLoading from '../ChatLoading'
import UserListItem from '../UserAvatar/UserListItem'
import {Spinner} from '@chakra-ui/spinner'

const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()

  const { user,setSelectedChat,chats,setChats } = ChatState()
  const history = useHistory()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  //Log Out 
  const LogOutHandler = () => {
    localStorage.removeItem("userInfo")
    history.push("/")
  }


  //Search for the User
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something in the search box",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left"
      });
      return;
    }
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config)
      setLoading(false)
      setSearchResult(data);

    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to load search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left"
      })
    }
  }

  const accessChat = async(userId) => {
    try {
      setLoadingChat(true)
      const config = {
        headers: {
          "Content-type":"application/json",
          Authorization: `Bearer ${user.token}`
        },
      };

      //Access chat or create a chat using a user_id
      const {data}= await axios.post("/api/chat",{userId},config);
      
      if(!chats.find((c)=>c._id===data._id))
        {
          setChats([data,...chats])
        }

      setSelectedChat(data)
      setLoading(false)
      onClose();

    } catch (error) {
      toast({
        title:"Error fetching the chat ",
       description:error.message,
        duration:5000,
        isClosable:true,
        position:"bottom-left"
      })
    }
   }

  return (
    <>
      <Box display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        p="5px 10px 5px 10px"
      >
        <Tooltip label="Search for the User" hasArrow placement='bottom-end'>
          <Button variant="ghost" onClick={onOpen}><i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work-sans">Chat-Box</Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" margin={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              p={1}><Avatar size="sm" cursor='pointer' name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={LogOutHandler}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search User</DrawerHeader>
          <DrawerBody>
            <Box
              display="flex"
              pb={2}
            >
              <Input
                placeholder='Search by name & email'
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ?
              <ChatLoading /> : (
                searchResult?.map((user) => (
                  <UserListItem
                    user={user}
                    key={user._id}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )
            }
            {loadingChat && <Spinner ml="auto" display="flex"/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

    </>
  )
}

export default SideDrawer