import { useState, useEffect } from 'react';
import './GroupModal.scss'
import { url } from '../../assets/url';

function GroupModal() {
    const [modal, setModal] = useState('modal-close')
    const [course, setCourse] = useState([])
    let groups = {}

    useEffect(()=> {
        fetch(`${url}course`)
        .then(res => res.json())
        .then(data => setCourse(data))
        .catch(err => console.log(err))
    },[])

    const handleSubmit = (e) => {
        const inputs = document.querySelectorAll('.input') 
        groups = {
            group_name: inputs[8].value,
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
                        <input type="text" className='input' placeholder='Course Name' />
                        <select name='course_uid' className='input' id='course'>
                            {course.length ? course.map(c => {
                                return (
                                    <option value={c.course_uid} key={c.course_name}>{c.course_name}</option>
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
