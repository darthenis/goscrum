import {useState, useEffect} from 'react';
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { ToastContainer } from 'react-toastify';

import './TaskForm.styles.css';
import 'react-toastify/dist/ReactToastify.css';

const {REACT_APP_API_URL} = process.env;

export const TaskForm = ({createTask}) => {

    const [data, setData] = useState();

    useEffect(() => {

        fetch(REACT_APP_API_URL+"/task/data",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`}
        }).then(res => res.json()).then(data => {

            setData(data.result);

        })


    }, [])

    const initialValues = {
        title: '',
        description: '',
        status: '',
        importance: ''
    }

    const validationSchema = Yup.object().shape({

        title: Yup.string().required('*Título es requerido'),
        description: Yup.string().required('*Descripción es requerida'),
        status: Yup.string().required('*Estado es requerido'),
        importance: Yup.string().required('*Prioridad es requerida')

    })

    const onSubmit = (values, actions) => {

        createTask(values);

    }

    const traduction = (data, type) =>{

        if(type === "status"){
            switch(data){

                case "NEW":
                    return "Nuevo";
                case "IN PROGRESS":
                    return "En proceso";
                default:
                    return "Completado";
            }
        }

        switch(data){

            case "HIGH":
                return "Alta";
            case "MEDIUM":
                return "Media";
            default:
                return "Baja";
        }


    }


    return(
        <section className="createTask">
            <h2>Crear Tarea</h2>
            <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                {({errors, touched}) => (
                        <Form >
                            <div className="flexFields">
                                <div>
                                    <Field type="text" placeholder="Título" name="title" className={errors.title && touched.title && 'error'}/>
                                    {errors.title && touched.title && <span>{errors.title}</span>}
                                </div>
                                <div>
                                    <Field as="select" name="status" className={errors.status && touched.status && 'error'}>
                                    <option value="" disabled>Seleccionar un estado</option>
                                    {data?.status?.map((s, idx) => <option key={idx} value={s}>{traduction(s, 'status')}</option>)}
                                    </Field>
                                    {errors.status && touched.status && <span>{errors.status}</span>}
                                </div>
                                <div>
                                    <Field as="select" name="importance" className={errors.importance && touched.importance && 'error'}>
                                    <option value="" disabled>Seleccionar una prioridad</option>
                                    {data?.importance?.map((i, idx) => <option key={idx} value={i}>{traduction(i, 'importance')}</option>)}
                                    </Field>
                                    {errors.importance && touched.importance && <span>{errors.importance}</span>}
                                </div>  
                            </div>
                            <div className="textarea-container">
                                <Field as="textarea" placeholder="Descripción" name="description" className={errors.description && touched.description && 'error'}/>
                                {errors.description && touched.description && <span>{errors.description}</span>}
                            </div>
                            <button className="button" type="submit">Crear</button>
                           
                        </Form>
                    

                )}
               
            </Formik>
            <ToastContainer/>
        </section>
       
    )


}