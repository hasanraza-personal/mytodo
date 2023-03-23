import { Container, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddTodo from './components/AddTodo'
import ViewTodo from './components/ViewTodo';

const Todo = () => {
    // Fetching userid from localstorage to indentify user
    let userData = null;
    if (localStorage.getItem('userObject')) {
        userData = JSON.parse(localStorage.getItem('userObject'));
    }

    const [pendingTask, setPendingTask] = useState([]);
    const [completedTask, setCompletedTask] = useState([]);
    const toast = useToast();


    const fetchUserTodo = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/todo/getusertodo',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    userId: userData.userId,
                }
            });
            let data = response.data;

            let pTask = [];
            let cTask = [];

            data.map((task) => {
                if (task.completed === false) {
                    pTask.push(task)
                } else {
                    cTask.push(task)
                }
            })
            setPendingTask(pTask);
            setCompletedTask(cTask);

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

    useEffect(() => {
        fetchUserTodo();
    }, [])


    return (
        <>
            <Container boxShadow='xs' p='6' rounded='md' maxW='md' mt={5}>
                <AddTodo userId={userData.userId} pendingTask={pendingTask} setPendingTask={setPendingTask} />
                <ViewTodo
                    pendingTask={pendingTask}
                    setPendingTask={setPendingTask}
                    completedTask={completedTask}
                    setCompletedTask={setCompletedTask}
                />
            </Container>
        </>
    )
}

export default Todo
