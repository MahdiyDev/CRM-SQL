import { useEffect, useState } from 'react';
import './TeacherModal.scss'
import { url } from '../../assets/url';

function TeacherModal() {
    const [course, setCourse] = useState([])
    const [modal, setModal] = useState('modal-close')
    let user = {}

    const handleSubmit = (e) => {
        const inputs = document.querySelectorAll('.input') 
        user = {
            first_name: inputs[10].value,
            last_name: inputs[11].value,
            phone_number: inputs[12].value,
            course_uid: inputs[13].value        
        }
        fetch(`${url}teachers`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }

    useEffect(()=> {
        fetch(`${url}course`)
        .then(res => res.json())
        .then(data => setCourse(data))
        .catch(err => console.log(err))
    },[])

    return (
        <>
        <button onClick={()=>{setModal('modal')}}>Create Teacher</button>
        <div className={modal} onClick={(e)=>e.target.classList.value === 'modal' ? setModal('modal-close') : ''}>
            <div className="crate-modal">
                <form 
                    className='form'
                    onSubmit={handleSubmit}
                    >
                    <h3 className='modal-title'>Create Teacher</h3>
                    <input name='first_name' type="text" className='input' placeholder='First name' />
                    <input name='last_name' type="text" className='input' placeholder='Last name' />
                    <input name='phone_number' type="text" className='input' placeholder='Phone number' />
                    <label htmlFor='group'><small>Course</small></label>
                    <select name='course_uid' className='input' id='group'>
                        {course.length ? course.map(c => {
                            return (
                                <option value={c.course_uid} key={c.course_uid}>{c.course_name}</option>
                            )
                        }):[]}
                    </select>
                    <button className='form_btn' type="submit">Create Teacher</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default TeacherModal;
