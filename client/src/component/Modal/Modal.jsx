import { useEffect, useState } from 'react';
import './Modal.scss'
import { url } from '../../assets/url';

function Modal() {
    const [groups, setGroups] = useState([])
    const [course, setCourse] = useState([])
    const [modal, setModal] = useState('modal-close')
    let user = {}

    const handleSubmit = () => {
        const inputs = document.querySelectorAll('.input') 
        user = {
            first_name: inputs[0].value,
            last_name: inputs[1].value,
            paid_price: !inputs[2].value.length || inputs[2].value==0  ? 0 : inputs[2].value,
            phone_number: inputs[3].value,
            group_id: inputs[4].value,
            course_uid: inputs[5].value            
        }
        fetch(`${url}users`, {
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
        fetch(`${url}groups`)
        .then(res => res.json())
        .then(data => setGroups(data))
        .catch(err => console.log(err))
    },[])

    useEffect(()=> {
        fetch(`${url}course`)
        .then(res => res.json())
        .then(data => setCourse(data))
        .catch(err => console.log(err))
    },[])

    return (
        <>
        <button onClick={()=>{setModal('modal')}}>Create User</button>
        <div className={modal} onClick={(e)=>e.target.classList.value === 'modal' ? setModal('modal-close') : ''}>
            <div className="crate-modal">
                <form 
                    className='form'
                    onSubmit={handleSubmit}
                    >
                    <h3 className='modal-title'>Create User</h3>
                    <input name='first_name' type="text" className='input' placeholder='First name' />
                    <input name='last_name' type="text" className='input' placeholder='Last name' />
                    <input name='paid_price' type="text" className='input' placeholder='Paid price' />
                    <input name='phone_number' type="text" className='input' placeholder='Phone number' />
                    <label htmlFor='group'><small>Groups</small></label>
                    <select name='group_id' className='input' id='group'>
                        {groups.length ? groups.map(g => {
                            return (
                                <option value={g.group_id} key={g.group_name}>{g.group_name}</option>
                            )
                        }):[]}
                    </select>
                    <label htmlFor='course'><small>Course</small></label>
                    <select name='course_uid' className='input' id='course'>
                        {course.length ? course.map(c => {
                            return (
                                <option value={c.course_uid} key={c.course_name}>{c.course_name}</option>
                            )
                        }):[]}
                    </select>
                    <button className='form_btn' type="submit">Create User</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Modal;
