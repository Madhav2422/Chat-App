import {React,useState} from 'react'
import { FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, VStack,Button, Hide } from '@chakra-ui/react'


const SignUp = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [show, setShow] = useState(false);

    const handleClick = ()=>{
        setShow(!show)
    }

    const postdetails =(pics)=>{}
    const submitHandler=()=>{}

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
        >
            Sign Up
        </Button>

   </VStack>
  )
}

export default SignUp