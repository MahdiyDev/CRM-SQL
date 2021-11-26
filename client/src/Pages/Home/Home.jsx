import './Home.scss'
import UserModal from '../../component/UserModal/UserModal'
import CourseModal from '../../component/CourseModal/CourseModal'
import GroupModal from '../../component/GroupModal/GroupModal'
import TeacherModal from '../../component/TeacherModal/TeacherModal'
import useUsers from '../../Hooks/useUsers'

function Home() {
    const user = useUsers('get')
    const [setUserDelete] = useUsers('delete')
    
    const deleteUser = (e) => {
        setUserDelete(e.target.id)
        window.location = '/' 
    }

    return (
        <div className='home'>
            <UserModal />
            <CourseModal />
            <GroupModal />
            <TeacherModal />
            <tr>
                <th className='table' >First Name</th>
                <th className='table' >Last Name</th>
                <th className='table' >Group Name</th>
                <th className='table' >Is Paid</th>
                <th className='table' >Paid Price</th>
                <th className='table' >Course Price</th>
                <th className='table' >Course Name</th>
                <th className='table' >Phone Number</th>
                <th className='table' >Options</th>
            </tr>
            {user.length ? user.map(e => {
                return (
                    <tr key={e.users_uid}>
                        <td className='table' key={e.length}>{e.first_name}</td>
                        <td className='table' key={e.length}>{e.last_name}</td>
                        <td className='table' key={e.length}>{e.group_name}</td>
                        <td className='table' key={e.length}>{e.paid_price!=="0" && e.paid_price!==null  ? "Paided" : "Not Paided"}</td>
                        <td className='table' key={e.length}>{e.paid_price}</td>
                        <td className='table' key={e.length}>{e.course_price}</td>
                        <td className='table' key={e.length}>{e.course_name}</td>
                        <td className='table' key={e.length}>{e.phone_number}</td>
                        <td className='table' key={e.length}>
                            <button onClick={deleteUser} id={e.users_uid}>delete</button>
                        </td>
                    </tr>
                )
            })
            : []}
        </div>
    )
}

export default Home;
