

import React, { Fragment, useState } from 'react'

import { AiOutlineEdit } from "react-icons/ai"
import { RootStateOrAny, useSelector, useDispatch } from "react-redux"
import Delete from '../svg/Delete';

const EditInput = ({ text, type, taskId, show, columnId, column }: any) => {

    const state = useSelector((state: RootStateOrAny) => state)

    const [toggle, setToggle] = useState<boolean>(true)
    const [name, setName] = React.useState(text)
    const [placeholder, setPlaceholder] = React.useState(type)

    const dispatch = useDispatch()

    state.numColumn = state.columnOrder.length
    state.numTask = Object.keys(state.tasks).length

    const createColumn = () => {
        state.numColumn++
        dispatch({
            type: 'ADD_COLUMN_NUMBER',
            payload: [...state.columnOrder, String(state.numColumn)]
        })
        dispatch({
            type: 'ADD_COLUMN',
            payload: {
                [state.numColumn]: {
                    id: String(state.numColumn),
                    title: name,
                    taskIds: [],
                    columnId
                },
            },
        })
        setName('')
    }

    const editColumn = () => {
        dispatch({
            type: 'EDIT_COLUMN',
            payload: {
                [columnId]: {
                    ...state.columns[columnId],
                    title: name
                },
            },
        })
    }

    const createColumnTask = () => {
        state.numTask++
        dispatch({
            type: 'ADD_TASK_NUMBER',
            payload: [...state.columnOrder, String(state.numColumn)]
        })
        dispatch({
            type: 'ADD_TASK',
            payload: {
                ['task-' + state.numTask]: {
                    id: String('task-' + state.numTask),
                    content: name,
                    columnId
                }
            }
        })
        setName('')

        dispatch({
            type: 'ADD_TASK_TO_COLUMN',
            payload: {
                [columnId]: {
                    ...state.columns[columnId],
                    taskIds: [...state.columns[columnId].taskIds, String('task-' + state.numTask)]
                }
            }
        })
    }
    const deleteColumnTask = () => {
        dispatch({
            type: 'DELETE_TASK',
            payload: {
                id: String([taskId]),
                content: name,
                columnId: columnId
            }
        })
        const filteredTasks = state.columns[columnId].taskIds.filter((el: any) => el !== taskId)
        // console.log('Result: ', filteredTasks)

        dispatch({
            type: 'DELETE_TASK_TO_COLUMN',
            payload: {
                [columnId]: {
                    ...state.columns[columnId],
                    taskIds: filteredTasks
                }
            }
        })
    }

    const deleteColumn = () => {
        const { ...rest } = Object.fromEntries(
            Object.entries(state.columns).filter(([key]) =>
                key !== columnId)
        )

        let columnOrder = state.columnOrder.filter((el: any) => el !== columnId)

        const returnTasks = (columnId: string, tasks: {}) => {
            const res = Object.values(tasks).map((el: any) => el.columnId !== columnId && { [el.id]: el })
            // console.log('Tasks !: ', res)

            return res
        }

        const tasks = returnTasks(columnId, state.tasks)
        console.log('Tasks !: ', Object.assign({}, ...tasks))

        dispatch({
            type: 'DELETE_COLUMN',
            payload: {
                columns: rest,
                columnOrder,
                columnId: columnId,
                tasks: Object.assign({}, ...tasks)
            },
        })
    }

    const editTask = () => {
        dispatch({
            type: 'EDIT_TASK',
            payload: {
                [taskId]: {
                    id: String([taskId]),
                    content: name,
                    columnId: columnId
                }
            }
        })
    }

    const showError = (text: string) => {
        dispatch({
            type: 'ERROR',
            payload: text
        })
    }

    const handleTyping = (event: { target: { value: any } }) => {
        setName(event.target.value)
    }
    const handleExit = (event: { key: string; preventDefault: () => void; stopPropagation: () => void }) => {

        if (event.key === 'Escape') {
            setToggle(true)
            // setName('')
            if (type === 'Edit Column Name') {
                setPlaceholder('Edit Column Name')
                editColumn()
            }
            if (type === 'Edit Card') {
                setPlaceholder('Edit Card')
                editTask()
            }
        }

        if (event.key === 'Enter') {
            if (name === '' || name === undefined || name.trim() === '') {
                showError('Please type a description...')
            } else {
                setToggle(true)
                if (type === 'Create Bucket') {
                    createColumn()
                }
                if (type === 'Add Task') {
                    createColumnTask()
                }
                if (type === 'Edit Column Name') {
                    editColumn()
                }
                if (type === 'Edit Card') {
                    editTask()
                }
            }
        }
    }

    return <Fragment>
        {
            toggle ? (
                <div style={{ display: 'flex', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', color: 'white' }}>
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => { setToggle(false) }}
                    >
                        <AiOutlineEdit />
                        <span style={{ cursor: 'grab', marginLeft: '10px', fontSize: '13px' }}>{text}</span>
                    </div>
                    {
                        show &&
                        <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => column ? deleteColumn() : deleteColumnTask()}
                        >
                            <Delete size={15} />
                        </div>
                    }
                </div>
            ) : (
                <div>
                    <input
                        autoFocus
                        style={{ padding: '5px', paddingRight: '12px', border: 'none', outline: 'none', borderColor: 'none', background: 'lightGray' }}
                        type="text"
                        placeholder={placeholder}
                        onChange={handleTyping}
                        onKeyDown={handleExit}
                        onFocus={() => setPlaceholder('')}
                        onBlur={() => setToggle(true)}
                    // value={name}
                    />
                </div>

            )
        }
    </Fragment>
}

export default EditInput