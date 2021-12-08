import './Home.scss'
import useUsers from '../../Hooks/useUsers'
import useGroups from '../../Hooks/useGroups'
import { useState } from 'react'

function Home() {
    const [id, setId] = useState('')
    const groups = useGroups('get')
    const user = useUsers('get')
    const userList = useUsers('get')
    const [modal, setModal] = useState('editModal')
    const [setUserUpdate] = useUsers('update')
    const [setUserDelete] = useUsers('delete')
    
    const deleteUser = (e) => {
        setUserDelete(e.target.id)
        window.location = '/' 
    }

    const handleSubmit = e => {
        const inputs = document.querySelectorAll('.input')
        
        let user = {
            users_uid: id,
            first_name: inputs[14].value,
            last_name: inputs[15].value,
            paid_price: !inputs[16].value.length || inputs[16].value === "0"  ? 0 : inputs[16].value,
            phone_number: inputs[17].value,
            users_group_id: inputs[18].value        
        }


        setUserUpdate(user)
    }

    const editUser = e => {
        setId(e.target.id)
        const inputs = document.querySelectorAll('.input')
        const foundUser = userList.find(u => u.users_uid === id)        
        
        inputs[14].value = foundUser ? foundUser.first_name : ''
        inputs[15].value = foundUser ? foundUser.last_name : ''
        inputs[16].value = foundUser ? foundUser.paid_price : ''
        inputs[17].value = foundUser ? foundUser.phone_number : ''
        inputs[18].value = foundUser ? foundUser.users_group_id : ''
        if (foundUser) {
            setModal('editModal--active')
        }
    }
    
    return (
        <div className='home'>
            <div className={modal} onClick={(e) => e.target.classList.value === 'editModal--active' ? setModal('editModal') : ''}>
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
            <h2 className='teacher_title'>Students</h2>
            <table>
            <thead>
                <tr>
                    <th className='table'>First Name</th>
                    <th className='table'>Last Name</th>
                    <th className='table'>Group Name</th>
                    <th className='table'>Is Paid</th>
                    <th className='table'>Paid Price</th>
                    <th className='table'>Course Price</th>
                    <th className='table'>Course Name</th>
                    <th className='table'>Phone Number</th>
                    <th className='table'>Options</th>
                </tr>
            </thead>
            <tbody>
                {user.length ? user.map(e => {
                    return (
                        <tr key={e.users_uid}>
                            <td className='table' key={e.length}>{e.first_name}</td>
                            <td className='table' key={e.length}>{e.last_name}</td>
                            <td className='table' key={e.length}>{e.group_name}</td>
                            <td className='table' key={e.length}>{e.paid_price!=="0" && e.paid_price!==null ? "Paided" :
                                "Not Paided"}</td>
                            <td className='table' key={e.length}>{e.paid_price}</td>
                            <td className='table' key={e.length}>{e.course_price}</td>
                            <td className='table' key={e.length}>{e.course_name}</td>
                            <td className='table' key={e.length}>
                                <div className="tel-phone_wrapper">
                                    +{e.phone_number}
                                    <a className='cicle_btn' href={`tel:+${e.phone_number}`}>call</a>
                                </div>
                            </td>
                            <td className='table' key={e.length}>
                                <button onClick={deleteUser} id={e.users_uid} className='btn'>delete</button>
                                <button onClick={editUser} id={e.users_uid} className='btn'>edit</button>
                            </td>
                        </tr>
                    )
                })
                : []}
            </tbody>
            </table>
        </div>
    )
}

export default Home;
