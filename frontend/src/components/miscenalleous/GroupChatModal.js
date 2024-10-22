import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React,{useState} from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserListItem from "../UserAvatar/UserListItem"
import  axios  from 'axios';
import { Spinner } from '@chakra-ui/react';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const[selectedUsers,setSelectedUsers]=useState([])
  const [searchResult, setSearchResult] = useState([]);
  const[chats,setChats]=useState([])
  const [loading, setLoading] = useState(false);
  

  const toast = useToast()
  const { selectedChat, setSelectedChat, user } = ChatState();

  //Search Users
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  //To add the Users in the group
  const handleGroup=(addToGroup)=>{
    if(selectedUsers.includes(addToGroup)){
      toast({
        title:"User already added",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top"
      })
      return;
    }
    setSelectedUsers([...selectedUsers,addToGroup]);
  }

  //Deleted User at the time of adding in the group
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  //Submit and creating a group function
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };


  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex" flexDir="column" alignItems="center"
          >
            <FormControl>
              <Input
                placeholder='Chat-Name'
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Input
                placeholder='Add Users'
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {/* selected users */}
            <Box display="flex" flexWrap="wrap" >
            {selectedUsers.map((u)=>(
              <UserBadgeItem key={user._id}
              user={u}
              handleFunction={()=>handleDelete(u)}
              />
            ))}
            </Box>
            {/* render searched results */}
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))
            )}

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={handleSubmit}>
              Create Group
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal