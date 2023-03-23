import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
// import PendingTask from './PendingTask';
import Task from './Task';

const ViewTodo = ({pendingTask, setPendingTask, completedTask, setCompletedTask}) => {
    return (
        <>
            <Tabs>
                <TabList>
                    <Tab>Pending</Tab>
                    <Tab>Completed</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Task data={pendingTask} setData={setPendingTask} completedTask={completedTask} setCompletedTask={setCompletedTask} />
                    </TabPanel>
                    <TabPanel>
                    <Task data={completedTask} setData={setCompletedTask} completedTask={null} setCompletedTask={null} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default ViewTodo
