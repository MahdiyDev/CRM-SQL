import { useState } from 'react';
import './CourseModal.scss'
import useCourse from '../../Hooks/useCourse';

function CourseModal() {
    const [modal, setModal] = useState('modal-close')
    const [setCoursePost] = useCourse('post')
    
    const handleSubmit = (e) => {
        const inputs = document.querySelectorAll('.input')
        let course = {
            course_name: inputs[0].value,
            course_price: inputs[1].value
        }
        setCoursePost(course)
    }
    
    return (
        <>
            <button onClick={()=>setModal('modal')} className='btn'>Create Course</button>
            <div className={modal} onClick={(e) => e.target.classList.value === 'modal' ? setModal('modal-close') : ''}>
                <div className="crate-modal">
                    <form className="form" onSubmit={handleSubmit}>
                        <h3 className='modal-title'>Create Course</h3>
                        <input type="text" className='input' placeholder='Course Name' />
                        <input type="text" className='input' placeholder='Course Price' />
                        <button type="submit" className='form_btn'>Create Course</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CourseModal;
