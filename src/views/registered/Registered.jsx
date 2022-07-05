import { useParams, Link } from "react-router-dom"

import './Registered.styles.css'

export default function Registered(){

    const { teamID } = useParams();

        return(
            <div id="container-registered">

                <div>
                    <p>El teamID de tu equipo es: <span style={{color: 'var(---global-primary-color)'}}>{teamID}</span></p>
                    <Link to={'/login'}>Logearse</Link>
                </div>

            </div>
        )


}