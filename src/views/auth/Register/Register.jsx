import { Formik, Form, Field } from 'formik';
import {useState, useEffect} from 'react';
import Switch from 'react-switch';
import * as yup from 'yup';
import {Link, useNavigate} from 'react-router-dom';
import {v4 as uuid} from 'uuid';

import '../Auth.style.css';

const {REACT_APP_API_URL} = process.env;

export default function Register(){

    const [data, setData] = useState();

    const [checked, setChecked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        fetch(REACT_APP_API_URL+"/auth/data").then(res => res.json()).then(data => {

            setData(data.result);

        })

    }, [])
 
    const initialValues = {

        userName: "",
        password: "",
        email: "",
        teamID: "",
        role: "",
        continent: "",
        region: ""
       

    }

    const SignUpSchema = yup.object().shape({
        userName: yup.string().matches(/^[a-zA-Z]+$/, "*Sólo letras").required('*Campo obligatorio'),
        password: yup.string().matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/, "*Debe tener 6 cáracteres mínimo, y al menos 1 mayuscula y 1 número").required('*Campo obligatorio'),
        email: yup.string().email('*Email inválido').required('*Campo obligatorio'),
        continent: yup.string().required('*Campo obligatorio'),
        region: yup.string().when('continent', {
            is: 'America',
            then: yup.string().required('*Campo obligatorio')
        }),
        role : yup.string().required('*Campo obligatorio')
    })

    const teamIDSchema =   yup.object({ teamID: yup.string().required('*Campo obligatorio')})

    const onSubmit = values => {

        values.teamID = !values.teamID ? uuid() : values.teamID;

       if(values.continent !== "America"){

            values.region = "Otro";

        }

        fetch(REACT_APP_API_URL+"/auth/register", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user : values})
        }).then(res => res.json()).then(data => navigate('/registered/' + data?.result?.user?.teamID))
    }


            return (
                <div className="auth">
                    <Formik initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={checked ? SignUpSchema.concat(teamIDSchema) : SignUpSchema}>

                        {({errors, touched, values}) => (
                            <Form>
                            <h1>Registro</h1>
                            <div>
                                <label htmlFor="userName">Nombre de usuario</label>
                                <Field type="text" name="userName" style={{border: errors.userName && touched.userName ? 'solid 1px var(---global-primary-color)' : 'var(---global-border)'}} />
                                {errors.userName && touched.userName && <p>{errors.userName}</p>}
                                
                            </div>
                            <div>
                                <label htmlFor="password">Contraseña</label>
                                <Field  type="password" name="password" style={{border: errors.password && touched.password ? 'solid 1px var(---global-primary-color)' : 'var(---global-border)'}}/>
                                {errors.password && touched.password && <p>{errors.password}</p>}
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <Field type="text" name="email" style={{border: errors.email && touched.email ? 'solid 1px var(---global-primary-color)' : 'var(---global-border)'}} />
                                {errors.email && touched.email && <p>{errors.email}</p>}
                            </div>
                            <div id='switch'>
                                <Switch offColor='#FFC5BE'
                                        onColor='#FFC5BE'
                                        onHandleColor='#ff452b'
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        onChange={() => setChecked(!checked)}
                                        checked={checked}
                                        handleDiameter={20}
                                        height={14}
                                        width={35}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        />
                                <label htmlFor="repeatPassword">Perteneces a un equipo ya creado</label>
                            </div>
                            {checked && <div>
                                            <label htmlFor="teamID">Por favor, introduce el identificador de equipo</label>
                                            <Field type="text" name="teamID" style={{border: errors.teamID && touched.teamID ? 'solid 1px var(---global-primary-color)' : 'var(---global-border)'}}/>
                                            {errors.teamID && touched.teamID && <p>{errors.teamID}</p>}
                                        </div>}
                            <div>
                                <label htmlFor="role">Rol</label>
                                <Field as="select" name="role" style={{border: errors.role && touched.role ? 'solid 1px var(---global-primary-color)' : 'var(---global-border)'}}>
                                    <option value="" disabled>Seleccione rol...</option>
                                    {data?.Rol?.map((role, idx) => <option key={idx} value={role}>{role}</option>)}
                                </Field>
                                {errors.role && touched.role && <p>{errors.role}</p>}
                            </div>
                            <div>
                                <label htmlFor="continent">Continente</label>
                                <Field as="select" name="continent" style={{border: errors.continent && touched.continent ? 'solid 1px var(---global-primary-color)' : 'var(---global-border)'}}>
                                    <option value="" disabled>Seleccione continente...</option>
                                    {data?.continente?.map((continent, idx) => <option key={idx} value={continent}>{continent}</option>)}
                                </Field>
                                {errors.continent && touched.continent && <p>{errors.continent}</p>}
                            </div>
                            {values.continent === "America" && 
                                <div>
                                    <label htmlFor="region">Región</label>
                                    <Field as="select" name="region" style={{border: errors.region && touched.region ? 'solid 1px var(---global-primary-color)' : 'var(---global-border)'}}>
                                        <option value="" disabled>Seleccione región...</option>
                                        {data?.region?.map((region, idx) => <option key={idx} value={region}>{region}</option>)}
                                    </Field>
                                    {errors.region && touched.region && <p>{errors.region}</p>}
                                </div> }
                            <button type="submit">Enviar</button>
                            <Link to="/login" className="linkRegister">Ir a Iniciar sesión</Link>
                        </Form>
                        )}
                        
                    </Formik>
                </div>
            )


}