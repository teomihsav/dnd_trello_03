

import React, { Fragment, useState } from 'react'

import { AiOutlineEdit } from "react-icons/ai"
import { RootStateOrAny, useSelector, useDispatch } from "react-redux"

const EditInput = (props: { [x: string]: any; text: any }) => {

    const state = useSelector((state: RootStateOrAny) => state)

    const [toggle, setToggle] = useState<boolean>(true)
    const [name, setName] = React.useState(props.text)
    const [placeholder, setPlaceholder] = React.useState(props.type)

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
                },
            },
        })
        setName('')
    }
    const editColumn = () => {
        dispatch({
            type: 'EDIT_COLUMN',
            payload: {
                [props.columnId]: {
                    ...state.columns[props.columnId],
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
                }
            }
        })
        setName('')

        dispatch({
            type: 'ADD_TASK_TO_COLUMN',
            payload: {
                [props.columnId]: {
                    ...state.columns[props.columnId],
                    taskIds: [...state.columns[props.columnId].taskIds, String('task-' + state.numTask)]
                }
            }
        })
    }

    const editTask = () => {
        dispatch({
            type: 'EDIT_TASK',
            payload: {
                [props.taskId]: {
                    id: String([props.taskId]),
                    content: name,
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
            if (props.type === 'Edit Bucket') {
                editColumn()
            }
            if (props.type === 'Edit Card') {
                editTask()
            }
        }

        if (event.key === 'Enter') {
            if (name === '' || name === undefined || name.trim() === '') {
                showError('Please type a description...')
            } else {
                setToggle(true)
                if (props.type === 'Create Bucket') {
                    createColumn()
                }
                if (props.type === 'Add Card') {
                    createColumnTask()
                }
                if (props.type === 'Edit Bucket') {
                    editColumn()
                }
                if (props.type === 'Edit Card') {
                    editTask()
                }
            }
        }
    }

    return <Fragment>
        {
            toggle ? (
                <div
                    style={{ padding: '5px', display: 'flex', alignSelf: 'center' }}
                    onClick={() => { setToggle(false) }}
                >
                    <span><AiOutlineEdit /> </span>
                    <span style={{ marginLeft: '10px' }}>{name}</span>

                </div>
            ) : (
                <div>
                    <input style={{ padding: '5px', margin: '5px', outline: 'none', borderColor: 'lightblue' }}
                        type="text"
                        placeholder={placeholder}
                        onChange={handleTyping}
                        onKeyDown={handleExit}
                        onFocus={() => setPlaceholder('')}
                        // value={name}
                    />
                </div>

            )
        }
    </Fragment>
}

export default EditInput