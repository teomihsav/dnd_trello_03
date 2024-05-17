

import React from 'react'

import styled from 'styled-components'

import { Draggable } from 'react-beautiful-dnd'

import EditInput from './EditInput'


const Task = (props: { task: { id: string; content: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }; index: number }) => {

  return <Draggable draggableId={props.task.id} index={props.index}>
    {provided => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <EditInput taskId={props.task.id} text={props.task.content} type={'Edit Card'} show />

      </Container>
    )}
  </Draggable>
}

export default Task


const Container = styled.div`
    font-family: sans-serif;
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid lightsteelblue;
    border-radius: 10px;
    background-color: black;
    color: white
`