import { useParams } from "react-router-dom"


export default function Registered(){

    const { teamID } = useParams();

        return(
            <div>El teamID de tu equipo es: {teamID}</div>
        )


}