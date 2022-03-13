



import styled from 'styled-components'

import Task from './Task'

import { Droppable, Draggable } from 'react-beautiful-dnd'

import EditInput from './EditInput'


type Props = {
    column: {
        id: string,
        title: string,
    },
    index: number,
    // tasks: {
    //     id: string,
    //     content:string,
    // },
    tasks: any | any,

    // handleCards: any,
    // handleEditCard: any,
}

const Column: React.FC<Props> = (props) => {


    return <Draggable draggableId={props.column.id} index={props.index}>

        {provided => (
            <Container
                {...provided.draggableProps}
                ref={provided.innerRef}
            >
                <Title {...provided.dragHandleProps} >

                    <EditInput text={props.column.title} type={'Edit Bucket'} columnId={props.column.id} />
                    <hr style={{ backgroundColor: 'lightsteelblue' }} />

                    <EditInput text={undefined} type={'Add Card'} columnId={props.column.id} />

                </Title>
                <Droppable droppableId={props.column.id} type='task'>

                    {provided => (
                        <TaskList

                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {
                                props.tasks && props.tasks.map((task: any, index: any) =>
                                    task && <Task
                                        key={task.id && task.id}
                                        task={task}
                                        index={index}

                                    />

                                )
                            }
                            {provided.placeholder}
                        </TaskList >
                    )}
                </Droppable>
            </Container>
        )}
    </Draggable>
}

export default Column


const Container = styled.div`
    background-color: white;
    font-family: sans-serif;
    margin: 8px;
    border: 1px solid lightsteelblue;
    border-radius: 5px;
    width: 220px;
    display: flex;
    flex-direction: column;
`
const Title = styled.div`
    padding: 8px;
`
const TaskList = styled.div`
    padding: 8px;
    flex-grow: 1;
    min-height: 100px;
`