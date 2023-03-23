import { Box, Button, Flex, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'

const AddTodo = ({ userId, pendingTask, setPendingTask }) => {
    const [todo, setTodo] = useState("");
    const toast = useToast();

    const handleSubmit = async () => {
        if (todo.length === 0) {
            toast({
                position: 'top',
                title: "Please provide your Todo",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/todo',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    userId,
                    todo,
                }
            });
            setPendingTask([].concat(response.data, pendingTask));
            setTodo("");

            toast({
                position: 'top',
                title: "Your Task has been saved",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

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
            <FormControl>
                <Input type='text' name="todo" placeholder='Add your Todo here...' onChange={(e) => setTodo(e.target.value)} value={todo} />
            </FormControl>
            <Flex mt={2} justifyContent='end'>
                <Button size='sm' className='normal-button' w='auto' onClick={handleSubmit}>Add Todo</Button>
            </Flex>
        </>
    )
}

export default AddTodo
