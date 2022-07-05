import { Formik, Form, Field } from "formik"
import {Link, useNavigate} from "react-router-dom"
import * as Yup from "yup"
import { swal } from "../../../utils/alert"

import '../Auth.style.css'

const {REACT_APP_API_URL} = process.env

export default function Login(){

    const navigate = useNavigate();

    const initialValues = {

        userName: "",
        password: ""

    }


    const loginSchema = Yup.object().shape({

        userName: Yup.string().required('*Campo obligatorio'),
        password: Yup.string().required('*Campo obligatorio')
    })

    const onSubmit = values => {

        fetch(REACT_APP_API_URL + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then(res => res.json().then(data => {

            if(data.status_code === 200){

                sessionStorage.setItem("token", data.result.token);
                sessionStorage.setItem("userName", data.result.user.userName);

                navigate("/tasks")

            } else {

                swal()

            }

        }))
        
        
        .catch(error => {


            swal()

        })

    }

    return (
                <div className="auth">
                    <Formik 
                            initialValues={initialValues}
                            validationSchema={loginSchema}
                            onSubmit={onSubmit}>

                        {({values, touched, errors})=>(
                            <Form>
                            <h1>Iniciar Sesión</h1>
                            <div>
                                <label htmlFor="userName">Nombre de usuario</label>
                                <Field  type="text" 
                                        name="userName" 
                                        style={{border: errors.userName && touched.userName ? 'solid 1px var(---global-primary-color)' : 'var(---global-border)'}} />
                                {errors.userName && touched.userName && <p>{errors.userName}</p>}
                            </div>
                            <div>
                                <label htmlFor="password">Contraseña</label>
                                <Field  type="password" 
                                        name="password" 
                                        style={{border: errors.password && touched.password? 'solid 1px var(---global-primary-color)' : 'var(---global-border)'}} />
                                {errors.password && touched.password && <p>{errors.password}</p>}
                            </div>
                            <button type="submit">Enviar</button>
                            <Link to="/register" className="linkRegister">Registrarme</Link>
                            </Form>

                        )}
                       
                    </Formik>
                </div>
    )


}


//019d4121-3078-49ba-ae8c-0ab67aa029de