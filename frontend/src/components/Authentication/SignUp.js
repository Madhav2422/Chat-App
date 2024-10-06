import {React,useState} from 'react'
import { FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, VStack,Button } from '@chakra-ui/react'


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
                onChange={(e)=>setName(e.target.value)}
            />
            </FormControl>
          

   </VStack>
  )
}

export default SignUp