import { useState } from 'react';
import './CourseModal.scss'
import { url } from '../../assets/url';

function CourseModal() {
    const [modal, setModal] = useState('modal-close')
    let course = {}

    const handleSubmit = (e) => {
        const inputs = document.querySelectorAll('.input') 
        course = {
            course_name: inputs[5].value,
            course_price: inputs[6].value
        }
        fetch(`${url}course`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(course)
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }

    return (
        <>
            <button onClick={()=>setModal('modal')}>Create Course</button>
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
