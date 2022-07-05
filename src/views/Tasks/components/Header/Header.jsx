import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useResize } from '../../../../hooks/useResize';

import './Header.style.css';

export default function Header() {

        const [isPhone, phoneMenu] = useResize();

        useEffect(()=>{

            setMenu(null)

        },[phoneMenu])

        const [menu, setMenu] = useState(null)

        const navigate = useNavigate();

        const {tasks} = useSelector(state => state.tasks);

        const handleLogout = () => {

            sessionStorage.removeItem("token");
            sessionStorage.removeItem("userName");

            navigate("/login");
        }

        const handleMenu = () => {

            if(menu === null) setMenu(true)

            else setMenu(!menu)

        }


        return (<header>
                    <div className='container-header'>
                        <div><span>Go</span>scrum</div>
                        <ul style={{animationName: phoneMenu && menu ? 'slide' : phoneMenu && menu !== null ? 'slideBack' : ''}}>
                            <li><button onClick={() => navigate('/donate')}>Donar</button></li>
                            <li>Tareas creadas: {tasks.filter(e => e.user.userName === sessionStorage.getItem('userName')).length}</li>
                            <li>{sessionStorage.getItem('userName')}</li>
                            <li className="out" onClick={handleLogout}>X</li>
                        </ul>
                        {phoneMenu ? <div style={{cursor: 'pointer'}}onClick={handleMenu}>{menu ? 'CERRAR' : 'MENU'}</div> :  ''}
                    </div>
                </header>)


}