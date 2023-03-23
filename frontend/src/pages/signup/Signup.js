import { Box, Button, Container, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = ({setIsUser}) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const toast = useToast()
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        if (credentials.fullname.length === 0) {
            toast({
                position: 'top',
                title: "Please provide your name",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        } else if (credentials.email.length === 0) {
            toast({
                position: 'top',
                title: "Please provide your email",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        } else if (credentials.password.length === 0) {
            toast({
                position: 'top',
                title: "Please provide your password",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    fullName: credentials.fullname,
                    email: credentials.email,
                    password: credentials.password
                }
            });
            let data = response.data;

            if (data === "This email already exist!") {
                toast({
                    position: 'top',
                    title: data,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return
            }

            let userObject = {
                userId: data.id,
                fullname: data.fullName,
                email: data.email
            }
            localStorage.setItem("userObject", JSON.stringify(userObject));
            setIsUser(true)
            navigate('/todo');
        } catch (err) {
            toast({
                position: 'top',
                title: err.response.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }


    }

    return (
        <>
            <Container boxShadow='xs' p='6' rounded='md' maxW='md' mt={10}>
                <VStack gap={1}>
                    <FormControl>
                        <FormLabel mb={0}>Fullname</FormLabel>
                        <Input type='text' name="fullname" placeholder='Enter fullname' onChange={onChange} value={credentials.fullname} />
                    </FormControl>

                    <FormControl>
                        <FormLabel mb={0}>Email</FormLabel>
                        <Input type='text' name="email" placeholder='Enter email' onChange={onChange} value={credentials.email} />
                    </FormControl>

                    <FormControl>
                        <FormLabel mb={0}>Password</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                name='password'
                                value={credentials.password}
                                onChange={onChange}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </VStack>

                <Box mt={5}>
                    <Button className='normal-button' onClick={handleSubmit}>Signup</Button>
                    <Link to='/' className='link'>Already have an account?</Link>
                </Box>

            </Container>
        </>
    )
}

export default Signup
