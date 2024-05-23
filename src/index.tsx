


import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import Column from './components/Column'
import EditInput from './components/EditInput'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import styled from 'styled-components'
import './index.css'

import { Provider } from 'react-redux'
import store from './store/store'

import { RootStateOrAny, useSelector, useDispatch } from "react-redux"


const Container = styled.div`
  font-family: sans-serif;
  display: flex;
  margin: 8px;
  border: 1px solid lightsteelblue;
  border-radius: 10px;
`
const Main = styled.div`
  font-family: sans-serif;
  margin: 20px;
  padding: 50px;
  border: 1px solid lightsteelblue;
  border-radius: 10px;
`

// @ts-ignore
const App: React.FC = () => {

  const storeState = useSelector((state: RootStateOrAny) => state)
  const dispatch = useDispatch()

  const [state, setState] = useState(storeState)

  useEffect(() => {
    setState(storeState)
  }, [storeState])

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result

    if (!destination) { return }
    if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder)
      newColumnOrder.splice(source.index, 1)
      const newOrder = [...newColumnOrder.slice(0, destination.index), draggableId, ...newColumnOrder.slice(destination.index)]
      // newColumnOrder.splice(destination.index, 0, draggableId) // Old array manipulati 

      const newState = {
        ...state,
        columnOrder: newOrder,
      }
      // @ts-ignore
      setState(newState)
      dispatch({
        type: 'ALL',
        payload: newState
      })
      return
    }

    const start = state.columns[source.droppableId]
    const finish = state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      }
      setState(newState)
      dispatch({
        type: 'ALL',
        payload: newState
      })

      return
    }

    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }
    // setFinishId(newFinish.id)

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }
    setState(newState)
    dispatch({
      type: 'ALL',
      payload: newState
    })

  }

  console.log('State: ', state)

  return <Main>
    <EditInput type={'Create Bucket'} text={'Create Column'} />

    <span style={{ fontSize: '12px', color: 'lightcoral' }}>{state.error}</span>

    <DragDropContext onDragEnd={onDragEnd} >
      <Droppable
        droppableId='all-columns'
        direction='horizontal'
        type='column'
      >
        {provided => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {
              // @ts-ignore
              state.columnOrder.map((columnId, index) => {
                // @ts-ignore
                const column = state.columns[columnId]
                // @ts-ignore
                const tasks = column && column.taskIds.map(taskId => state.tasks[taskId])
                // @ts-ignore
                return <Column key={column.id} column={column} tasks={tasks} index={index} />
                // handleEditCard={handleEditCard}
              })
            }
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  </Main>
}

ReactDOM.render(<Provider store={store}><App /></Provider >, document.getElementById('root'))



