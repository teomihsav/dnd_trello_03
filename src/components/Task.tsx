import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import EditInput from './EditInput'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'


const Task = ({ task: { id, content }, index, columnId }: any) => {

  const dispatch = useDispatch()
  const state = useSelector((state: RootStateOrAny) => state)

  useEffect(() => {
    editTask()
  }, [])

  const editTask = () => {
    dispatch({
      type: 'EDIT_TASK',
      payload: {
        [id]: {
          ...state.tasks[id],
          id: String([id]),
          columnId: columnId
        }
      }
    })
  }

  return <Draggable draggableId={id} index={index}>
    {provided => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <EditInput taskId={id} text={content} type={'Edit Card'} columnId={columnId} show />

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