import { useState } from 'react';
import './UserModal.scss'
import useGroups from '../../Hooks/useGroups';
import useUsers from '../../Hooks/useUsers';

function Modal() {
    const groups = useGroups('get')
    const [modal, setModal] = useState('modal-close')
    const [setUserPost] = useUsers('post')

    const handleSubmit = () => {
        const inputs = document.querySelectorAll('.input')
        let user = {
            first_name: inputs[9].value,
            last_name: inputs[10].value,
            paid_price: !inputs[11].value.length || inputs[11].value==0  ? 0 : inputs[11].value,
            phone_number: inputs[12].value,
            users_group_id: inputs[13].value        
        }
        setUserPost(user)
    }

    return (
        <>
        <button onClick={()=>{setModal('modal')}} className='btn'>Create User</button>
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
                    <button className='form_btn' type="submit">Create User</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Modal;
