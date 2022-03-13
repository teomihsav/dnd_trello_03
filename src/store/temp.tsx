

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension"


const counterReducer = (state = {
    tasks: {
        '1': { id: '1', content: 'Test One' },
        '2': { id: '2', content: 'Test Two' },
    },
    columns: {
        '1': {
            id: '1',
            title: 'To do',
            taskIds: ['1', '2'],
        },
        '2': {
            id: '2',
            title: 'Second',
            taskIds: [],
        },
        '3': {
            id: '3',
            title: 'Third',
            taskIds: [],
        },
    },
    columnOrder: ['1', '2', '3'],
    numColumn: 0,
    numTask: 0,
}, action: { type: string; payload: any }) => {


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
        }
    }
    if (action.type === 'ADD_TASK') {
        return {
            ...state,
            tasks: { ...state.tasks, ...action.payload },
        }
    }
    if (action.type === 'ADD_TASK_TO_COLUMN') {
        return {
            ...state,
            columns: { ...state.columns, ...action.payload },
        }
    }
    return state
}

// const store = createStore(counterReducer)
const middleware = [thunk]

const store = createStore(
    // @ts-ignore
    counterReducer,
    compose(
        applyMiddleware(...middleware),
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
export default store


// import { combineReducers, createStore, Reducer } from 'redux'

// const counterReducer = (state = { counter: 10 }, action: any) => {
//     if (action.type === 'increment') {
//         return {
//             counter: state.counter + 1
//         }
//     }
//     if (action.type === 'decrement') {
//         return {
//             counter: state.counter - 1
//         }
//     }
//     return state
// }
// const reducers: Reducer = combineReducers({
//     count: counterReducer,
// });
// const store = createStore(reducers)

// export default store