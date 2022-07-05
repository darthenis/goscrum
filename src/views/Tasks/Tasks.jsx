import Header from './components/Header/Header';
import { Card } from './components/Card/Card';
import {useState, useEffect} from 'react'
import Skeleton from "react-loading-skeleton";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { red } from '@mui/material/colors';
import {useSelector, useDispatch} from 'react-redux'
import { useResize } from '../../hooks/useResize';

import 'react-loading-skeleton/dist/skeleton.css'
import './Tasks.styles.css'
import { TaskForm } from './components/TaskForm/TaskForm';

import { getTasks, deleteTask, createTask, editTaskStatus } from '../../store/slices/slice.tasks';


export default function Tasks(){

    const [tasksRender, setTasksRender] = useState([]);

    const [importance, setImportance] = useState("ALL");

    const [title, setTitle] = useState("");

    const [own, setOwn] = useState("ALL");

    const [resumeTask, setResumeTask] = useState({
        new : true,
        inProgress : true,
        finished : true
    })

    const [isPhone] = useResize()

    const dispatch = useDispatch()

    const {loading, tasks} = useSelector(state => state.tasks)

    useEffect(() => {

        dispatch(getTasks(own === "ALL" ? "" : "me"))

    }, [own, dispatch])

    useEffect(() => {
        if(tasks?.length){
            setTasksRender(tasks)
        }
    }, [tasks, dispatch])


    useEffect(() => {

        let listTasks = []

        switch(importance){
            case "ALL":
                listTasks = tasks;
                break;
            case "HIGH":
                listTasks = tasks.filter(task => task.importance === "HIGH");
                break;
            case "MEDIUM":
                listTasks = tasks.filter(task => task.importance === "MEDIUM");
                break;
            default:
                listTasks = tasks.filter(task => task.importance === "LOW");
                break;
        }
    
        listTasks = listTasks.filter(task => task.title.toLowerCase().includes(title.toLowerCase()));

        setTasksRender(listTasks);


    }, [importance, title, tasks])


    const renderCards = (status) => {

        let cards = tasksRender?.filter(c => c.status === status)

        if(cards === undefined) return null

        return cards.map((card, idx) => <Card key={idx} data={card} deleteCard={handleDeleteCard} editCardStatus={handleEditCardStatus}/>)

    }

    const handleDeleteCard = id => dispatch(deleteTask(id, own === "ALL" ? "" : "me"))

    const handleCreateTask = task => dispatch(createTask(task, own === "ALL" ? "" : "me"))

    const handleEditCardStatus = data => dispatch(editTaskStatus(data, own === "ALL" ? "" : "me"))

    return (<>
                <Header/>
                <main>
                    <TaskForm createTask={handleCreateTask}/>
                    <section className="tasks-container">
                        <div>
                            <h2>Mis tareas</h2>
                        </div>
                        <div className="list-inputs">
                            <FormControl> 
                                <RadioGroup 
                                        row
                                        onChange={(e) => setOwn(e.currentTarget.value)}
                                        defaultValue="ALL">
                                    <FormControlLabel value="ALL" control={<Radio sx={{             fontSize: "10px",    
                                                                                                    color: red[400],
                                                                                                    '&.Mui-checked': {
                                                                                                        color: red[500],
                                                                                                    },
                                                                                                    }}/>} label="Todas"/>
                                    <FormControlLabel value="ME" control={<Radio sx={{
                                                                                                    color: red[400],
                                                                                                    '&.Mui-checked': {
                                                                                                        color: red[500],
                                                                                                    },
                                                                                                    }}/>} label="Mis tareas"/>
                                </RadioGroup>
                            </FormControl>
                            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="Seleccionar por título..."/>
                            <select value={importance} name="importance" onChange={(e) => setImportance(e.currentTarget.value)}>
                                <option value="ALL">Todas</option>
                                <option value="LOW">Baja</option>
                                <option value="MEDIUM">Media</option>
                                <option value="HIGH">Alta</option>
                            </select>
                        </div>
                        <div className='listTasks'>
                        {loading && !tasksRender.length ?  <>  <Skeleton className='skeleton'/>
                                                        <Skeleton className='skeleton'/>
                                                        <Skeleton className='skeleton'/>
                                    </> 
                                : tasksRender.length ?  <>
                                                        <div>
                                                            {isPhone    ? <h3 style={{cursor: 'pointer'}} onClick={() => setResumeTask({...resumeTask, new : !resumeTask.new })}>Nuevas {resumeTask.new ? '⮝' : '⮟'}</h3> 
                                                                        : <h3>Nuevas</h3>
                                                            }
                                                            {resumeTask.new && renderCards('NEW')}
                                                        </div>
                                                        <div>
                                                            {isPhone    ? <h3 style={{cursor: 'pointer'}} onClick={() => setResumeTask({...resumeTask, inProgress : !resumeTask.inProgress })}>En proceso {resumeTask.inProgress ? '⮝' : '⮟'}</h3> 
                                                                        : <h3>En Proceso</h3>
                                                            }
                                                            {resumeTask.inProgress && renderCards('IN PROGRESS')}
                                                        </div>
                                                        <div>
                                                            {isPhone    ? <h3 style={{cursor: 'pointer'}} onClick={() => setResumeTask({...resumeTask, finished : !resumeTask.finished })}>Terminadas {resumeTask.finished ? '⮝' : '⮟'}</h3> 
                                                                        : <h3>Terminadas</h3>
                                                            }
                                                            {resumeTask.finished && renderCards('FINISHED')}
                                                        </div>
                                                    </>
                                                    : null
                                               } 
                
                        </div>
                        { !loading && !tasksRender.length && <p style={{textAlign: 'center'}}>No hay tareas</p>}
                    </section>
                </main>
            </>
    )

}