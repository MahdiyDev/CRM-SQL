import { useState } from 'react';
import './TeacherModal.scss'
import useCourse from '../../Hooks/useCourse';
import useTeachers from '../../Hooks/useTeachers';

function TeacherModal() {
    const course = useCourse('get')
    const [modal, setModal] = useState('modal-close')
    const [setTeacherPost] = useTeachers('post')
    const handleSubmit = (e) => {
        const inputs = document.querySelectorAll('.input') 
        let teacher = {
            first_name: inputs[2].value,
            last_name: inputs[3].value,
            phone_number: inputs[4].value,
            teacher_course_uid: inputs[5].value        
        }
        setTeacherPost(teacher)
    }

    return (
        <>
        <button onClick={()=>{setModal('modal')}} className='btn'>Create Teacher</button>
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
