import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

const initialValues = {
    loading : false,
    tasks : [],
    error: ""
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialValues,
    reducers: {
        taskRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        taskSuccess(state, action) {
            return {    
                        loading: false,
                        tasks: action.payload,
                        error: ""
                    }
        },
        taskFailure(state, action) {
            return { 
                loading: false,
                tasks: [],
                error: action.payload
            }
        }
    }
})

const {REACT_APP_API_URL} = process.env;

export const getTasks = (path) => dispatch => {

    dispatch(taskRequest());

    fetch(`${REACT_APP_API_URL}/task/${path}`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`}
    })  .then(res => res.json())
        .then(data => dispatch(taskSuccess(data.result)))
        .catch(err => dispatch(taskFailure(err)))
}

export const deleteTask = (id, path) => dispatch => {

    dispatch(taskRequest());

    fetch(`${REACT_APP_API_URL}/task/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`}
    })  .then(res => res.json())
        .then(() => dispatch(getTasks(path)))
        .catch(err => dispatch(taskFailure(err)))

}

export const createTask = (task, path) => dispatch => {

    dispatch(taskRequest());

    fetch(`${REACT_APP_API_URL}/task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`},
        body: JSON.stringify({task})
    })  .then(res => res.json())
        .then(() => {
            dispatch(getTasks(path))
            toast.success('Tarea creada!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
        .catch(err => dispatch(taskFailure(err)))
}

export const editTaskStatus = (task, path) => dispatch => {

    const statusArray = ['NEW', 'IN PROGRESS', 'FINISHED'];

    const newStatusIndex = statusArray.indexOf(task.status) > 1 ? 0 : statusArray.indexOf(task.status) + 1;

    dispatch(taskRequest());

    fetch(`${REACT_APP_API_URL}/task/${task._id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`},
        body: JSON.stringify({task: {
                                    title: task.title,
                                    importance: task.importance,
                                    status: statusArray[newStatusIndex],
                                    description: task.description,
                                    }
                            })
    })  .then(res => res.json())
        .then((data) => {dispatch(getTasks(path))})
        .catch(err => dispatch(taskFailure(err)))

}


export const { taskRequest, taskSuccess, taskFailure } = tasksSlice.actions;

export default tasksSlice.reducer;