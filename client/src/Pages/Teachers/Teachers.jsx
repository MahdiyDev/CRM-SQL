import { useEffect, useState } from 'react';
import './Teachers.scss'
import { url } from '../../assets/url';

function Taechers() {
    const [teacher, setTeacher] = useState([])

    useEffect(()=> {
        fetch(`${url}teachers`)
        .then(res => res.json())
        .then(data => setTeacher(data))
        .catch(err => console.log(err))
    },[])

    console.log(teacher);

    return (
        <div className='teacher'>
            <ul>
                <h2>Ustozlar</h2>
                {teacher.length ? teacher.map(t => {
                    return (
                        <li>
                            <h3>{t.first_name} {t.last_name}</h3>
                            <h4>Course: {t.course_name}</h4>
                            <ul>
                                <li>{t.group_name}</li>
                            </ul>
                        </li>
                    )
                }): []}
            </ul>
        </div>
    )
}

export default Taechers;
