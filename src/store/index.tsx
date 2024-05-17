

import { createStore, compose } from 'redux'


const trelloReducer = (state = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Drag or Edit Task 1' },
        'task-2': { id: 'task-2', content: 'Drag or Edit Task 2' },
    },
    columns: {
        '1': {
            id: '1',
            title: 'Drag or Edit Column 1',
            taskIds: ['task-1', 'task-2'],
        },
        '2': {
            id: '2',
            title: 'Drag or Edit Column 2',
            taskIds: [],
        },
        '3': {
            id: '3',
            title: 'Drag or Edit Column 3',
            taskIds: [],
        },
    },
    columnOrder: ['1', '2', '3'],
    numColumn: 0,
    numTask: 0,
    error: '',
}, action: { type: string; payload: any }) => {

    if (action.type === 'ALL') {
        return { ...action.payload }
    }

    if (action.type === 'ADD_COLUMN_NUMBER') {
        return {
            ...state,
            columnOrder: action.payload
        }
    }
    if (action.type === 'ADD_COLUMN') {
        return {
            ...state,
            columns: { ...state.columns, ...action.payload },
            error: ''
        }
    }

    if (action.type === 'ADD_TASK') {
        return {
            ...state,
            tasks: { ...state.tasks, ...action.payload },
            error: ''
        }
    }
    if (action.type === 'ADD_TASK_TO_COLUMN') {
        return {
            ...state,
            columns: { ...state.columns, ...action.payload },
        }
    }
    if (action.type === 'EDIT_TASK') {
        return {
            ...state,
            tasks: { ...state.tasks, ...action.payload },
        }
    }
    if (action.type === 'EDIT_COLUMN') {
        return {
            ...state,
            columns: { ...state.columns, ...action.payload },
        }
    }
    if (action.type === 'ERROR') {
        return {
            ...state,
            error: action.payload

        }
    }
    return state
}

const store = createStore(
    // @ts-ignore
    trelloReducer,
    compose(
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
export default store