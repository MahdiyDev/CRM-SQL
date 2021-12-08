import { useState } from 'react';
import './GroupModal.scss'
import useCourse from '../../Hooks/useCourse';
import useTeachers from '../../Hooks/useTeachers';
import useGroups from '../../Hooks/useGroups';

function GroupModal() {
    const [modal, setModal] = useState('modal-close')
    const [setGroupsPost] = useGroups('post')
    const course = useCourse('get')
    const teacher = useTeachers('get')

    const handleSubmit = (e) => {
        const inputs = document.querySelectorAll('.input') 
        let groups = {
            group_name: inputs[6].value,
            group_teacher_id: inputs[7].value,
            group_course_id: inputs[8].value
        }
        setGroupsPost(groups)
    }

    return (
        <>
            <button onClick={()=>setModal('modal')} className='btn'>Create Group</button>
            <div className={modal} onClick={(e) => e.target.classList.value === 'modal' ? setModal('modal-close') : ''}>
                <div className="crate-modal">
                    <form className="form" onSubmit={handleSubmit}>
                        <h3 className='modal-title'>Create Group</h3>
                        <input type="text" className='input' placeholder='Group Name' />
                        <label htmlFor="teacher"><small>Teacher</small></label>
                        <select name='group_teacher_id' className='input' id='teacher'>
                            {teacher.length ? teacher.map(t => {
                                return (
                                    <option value={t.teachers.teacher_uid} key={t.teachers.first_name}>{t.teachers.first_name} {t.teachers.last_name}</option>
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
