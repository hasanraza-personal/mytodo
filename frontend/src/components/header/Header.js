import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Header = ({isUser, setIsUser}) => {
    const [name, setName] = useState("");
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('userObject');
        setIsUser(false)
        navigate('/')
    }

    useEffect(() => {
        console.log("Hello");
        let userData = null;
        if (localStorage.getItem('userObject')) {
            userData = JSON.parse(localStorage.getItem('userObject'));
            setName(userData.fullname)
        }else{
            setName("")
        }
    }, [isUser])

    return (
        <>
            <Flex justifyContent='space-between' boxShadow='xs' height='50px' alignItems='center'>
                <Box className='header-name'>MyTodo</Box>

                {name &&
                    <Flex mr='20px' gap={5}>
                        <Box>Welcome, <span className='bold-font'>{name}</span></Box>
                        <Box onClick={handleLogout} cursor='pointer'>Logout</Box>
                    </Flex>
                }
            </Flex>
        </>
    )
}

export default Header
