import { Box, Flex, Menu, MenuButton, MenuItem, MenuList, Icon, useToast, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, ModalHeader, FormControl, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { CheckCircleFill, PencilSquare, ThreeDots, Trash3Fill } from 'react-bootstrap-icons';

const Task = ({ data, setData, completedTask, setCompletedTask }) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [todo, setTodo] = useState("");
    const [todoId, setTodoId] = useState("");

    const handleComplete = async (id, todo) => {
        try {
            let response = await axios({
                method: 'PUT',
                url: `/api/todo/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    todo,
                    completed: true
                }
            });
            let newTask = data.filter((task) => { return task.id !== id })
            setData(newTask);

            setCompletedTask([].concat(response.data, completedTask));

            toast({
                position: 'top',
                title: "Todo completed",
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

    const handleDelete = async (id, todo) => {
        try {
            let response = await axios({
                method: 'Delete',
                url: `/api/todo/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            let newTask = data.filter((task) => { return task.id !== id })
            setData(newTask);

            toast({
                position: 'top',
                title: "Todo Deleted",
                status: 'error',
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

    const openEditModal = (id, todo) => {
        setTodo(todo)
        setTodoId(id)
        onOpen()
    }

    const handleEdit = async (id, todo) => {
        try {
            let response = await axios({
                method: 'PUT',
                url: `/api/todo/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    todo,
                    completed: false
                }
            });
            console.log('response: ', response.data);
            let newTask = data.filter((task) => {
                if(task.id == id){
                    task.todo = todo
                }
                return task
            })
            setData(newTask);

            toast({
                position: 'top',
                title: "Todo Updated",
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
        onClose()
    }

    return (
        <>
            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Your Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Input type='text' name="todo" onChange={(e) => setTodo(e.target.value)} value={todo} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue' onClick={() => handleEdit(todoId, todo)}>Update Task</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box>
                {data.map((task) => (
                    <Flex key={task.id} justifyContent='space-between' className='single-task'>
                        <Box>{task.todo}</Box>
                        <Box>
                            <Menu isLazy>
                                <MenuButton>
                                    <Icon as={ThreeDots} />
                                </MenuButton>
                                <MenuList>
                                    <Box p='0 8px'>
                                        {!task.completed &&
                                            <>
                                                <Flex className='task' onClick={() => handleComplete(task.id, task.todo)}>
                                                    <Icon as={CheckCircleFill} color='green' />
                                                    <Box ml={2} color='green'>Completed</Box>
                                                </Flex>

                                                <Flex className='task' onClick={() => openEditModal(task.id, task.todo)}>
                                                    <Icon as={PencilSquare} color='blue' />
                                                    <Box ml={2} color='blue'>Edit</Box>
                                                </Flex>
                                            </>
                                        }
                                        <Flex className='task' onClick={() => handleDelete(task.id)}>
                                            <Icon as={Trash3Fill} color='red' />
                                            <Box ml={2} color='red'>Delete</Box>
                                        </Flex>
                                    </Box>
                                </MenuList>
                            </Menu>
                        </Box>
                    </Flex>
                ))}
            </Box>
        </>
    )
}

export default Task
