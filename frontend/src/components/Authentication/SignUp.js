import {React,useState} from 'react'
import { FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, VStack,Button, Hide, useToast } from '@chakra-ui/react'
import axios from "axios"
import{useHistory} from "react-router-dom";

const SignUp = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [show, setShow] = useState(false);
    const [loading,setLoading]=useState(false);
    const history=useHistory()
    const toast = useToast()


    const handleClick = ()=>{
        setShow(!show)
    }

    const postdetails =(pics)=>{
        setLoading(true);
        if(pics===undefined){
          toast({
            title:"Please select an image",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom"
          })
          return
        }
        if(pics.type==="image/jpeg"|| pics.type==="image/png"){
          const data=new FormData();
          data.append("file",pics);
          data.append("upload_preset","Chat-app")
          data.append("cloud_name","diapribzv")
          fetch("https://api.cloudinary.com/v1_1/diapribzv/image/upload",{
            method:"post",
            body:data,
          }).then((res)=>res.json())
          .then((data)=>{
            setPic(data.url.toString());
            console.log(data.url.toString());
            setLoading(false)
          })
          .catch((err)=>{
            console.log(err);
            setLoading(false);
          })
        }else{
          toast({
            title:"Please select an image",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom"
          })
        }
    }
    const submitHandler=async()=>{
         setLoading(true);
         if(!name|| !email|| !password||!confirmpassword){
          toast({
            title:"Please require all the fiels",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom"
          });
          setLoading(false);
         return;
         }

         if(password!==confirmpassword){
          toast({
            title:"Passwords doesnt match",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom"
          });
         return;
         }

         try {
          const config={
            headers:{
              "Content-type":"application/json"
            },
          };
          const {data}=await axios.post("api/user/",{name,email,password,pic});
          toast({
            title:"Registration Successful",
            status:"success",
            duration:5000,
            isClosable:true,
            position:"bottom"
          });

          localStorage.setItem('userInfo',JSON.stringify((data)));
          setLoading(false);
          history.push("/chats");

         } catch (error) {
          toast({
            title:"Error Occured",
            description:error.response.data.message,
            status:"error",
            duration:5000,
            isClosable:true,
            position:"bottom"
          });
          setLoading(false);
         }
    }

   return (
   <VStack spacing="5px">
        <FormControl id='first-name' isRequired>
            <FormLabel>
                Name
            </FormLabel>
            <Input
                placeholder='Enter Your Name'
                onChange={(e)=>setName(e.target.value)}
            />
            </FormControl>

            <FormControl id='email' isRequired>
            <FormLabel>
               Email
            </FormLabel>
            <Input
                placeholder='Enter Your Email'
                onChange={(e)=>setEmail(e.target.value)}
            />
            </FormControl>

            <FormControl id='password' isRequired>
            <FormLabel>
               Password
            </FormLabel>
            <InputGroup>
            <Input type= {show?"text":'password'}
                placeholder='Enter Your Password'
                onChange={(e)=>setPassword(e.target.value)}
            />
            <InputRightElement width="4.rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide":"Show"}
              </Button>
            </InputRightElement>

            </InputGroup>
            </FormControl>
          

            <FormControl id='confirmpassword' isRequired>
            <FormLabel>
              Confirm Password
            </FormLabel>
            <InputGroup>
            <Input type= {show?"text":'password'}
                placeholder='Enter Your Password'
                onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            <InputRightElement width="4.rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide":"Show"}
              </Button>
            </InputRightElement>

            </InputGroup>
            </FormControl>

            <FormControl id='pic'>
            <FormLabel>
                Upload your pic
            </FormLabel>
            <Input
              type='file'
              p={1.5}
              accept='image/*'
              onChange={(e)=>postdetails(e.target.files[0])} 
            />
           
            </FormControl>

        <Button 
            colorScheme='blue'
            width="100%"
            style={{marginTop:15}}
            onClick={submitHandler}    
            isLoading={loading}
        >
            Sign Up
        </Button>

   </VStack>
  )
}

export default SignUp