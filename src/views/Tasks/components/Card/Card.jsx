import { useState } from 'react';

import './Card.styles.css'

export const Card = ({ data: {_id, title, createdAt, user:{userName}, description, status, importance}, data, deleteCard, editCardStatus }) => {

    const [show, setShow] = useState(false);

    const dateTime = new Date(createdAt).toLocaleString();

    const cutDescription = values => {

        if(show) return { string: values, button : true }

        if (values.length > 100) {

            return { string: values.substring(0, 100) + '...', button : true}

        } else {

            return { string: values, button : false }

        }

    }

    const traductionStatusImportance = (status) => {

        switch(status){
            case 'NEW':
                return "NUEVA"
            case 'IN PROGRESS':
                return "EN PROGRESO"
            case 'FINISHED':
                return 'FINALIZADO'
            case 'HIGH':
                return 'ALTO'
            case 'MEDIUM':
                return "MEDIO"
            case 'LOW':
                return 'BAJO'
            default:
                return "ERROR"
        }

    }


    return (
            <div className="card">
                <h3>{title}<div className='deleteCard' onClick={() => deleteCard(_id)}>x</div></h3>
                <p>{dateTime}</p>
                <p>{userName}</p>
                <div>
                    <button onClick={() => editCardStatus(data)}
                            style={{backgroundColor: status === "NEW" ? 'var(---global-primary-color)' : status === "IN PROGRESS" ? 'rgb(255, 238, 0)' : 'green', color: status === "IN PROGRESS" ? 'black' : 'white', cursor: "pointer"}}>
                                {traductionStatusImportance(status)}</button>
                    <button style={{backgroundColor: importance === "HIGH" ? 'var(---global-primary-color)' : importance === "MEDIUM" ? 'black' : 'rgb(79, 59, 252)', color: 'white'}}>
                        {traductionStatusImportance(importance)}</button>
                </div>
                <p>{cutDescription(description).string}</p>
                {cutDescription(description).button && <button onClick={() => setShow(!show)} className='readMoreButton'>{show ? 'Mostrar menos' : 'Mostrar más'}</button>}
            </div>
    )


}