import { useState, useEffect } from 'react';
import './GroupModal.scss'
import { url } from '../../assets/url';

function GroupModal() {
    const [modal, setModal] = useState('modal-close')
    const [teacher, setTeacher] = useState([])
    const [course, setCourse] = useState([])
    let groups = {}

    useEffect(()=> {
        fetch(`${url}teachers`)
        .then(res => res.json())
        .then(data => setTeacher(data))
        .catch(err => console.log(err))
    },[])

    useEffect(()=> {
        fetch(`${url}course`)
        .then(res => res.json())
        .then(data => setCourse(data))
        .catch(err => console.log(err))
    },[])

    const handleSubmit = (e) => {
        const inputs = document.querySelectorAll('.input') 
        groups = {
            group_name: inputs[7].value,
            group_teacher_id: inputs[8].value,
            group_course_id: inputs[9].value
        }
        fetch(`${url}groups`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(groups)
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }

    return (
        <>
            <button onClick={()=>setModal('modal')}>Create Group</button>
            <div className={modal} onClick={(e) => e.target.classList.value === 'modal' ? setModal('modal-close') : ''}>
                <div className="crate-modal">
                    <form className="form" onSubmit={handleSubmit}>
                        <h3 className='modal-title'>Create Group</h3>
                        <input type="text" className='input' placeholder='Group Name' />
                        <label htmlFor="teacher"><small>Teacher</small></label>
                        <select name='group_teacher_id' className='input' id='teacher'>
                            {teacher.length ? teacher.map(t => {
                                return (
                                    <option value={t.teacher_uid} key={t.first_name}>{t.first_name} {t.last_name}</option>
                                    )
                                }):[]}
                        </select>
                        <label htmlFor='course'><small>Course</small></label>
                        <select name='course_uid' className='input' id='course'>
                        {course.length ? course.map(c => {
                            return (
                                <option value={c.course_uid} key={c.course_uid}>{c.course_name}</option>
                            )
                        }):[]}
                        </select>
                        <button type="submit" className='form_btn'>Create Group</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default GroupModal;
