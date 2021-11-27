import './Home.scss'
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
            <h2 className='teacher_title'>Students</h2>
            <table>
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
                        </td>
                    </tr>
                )
            })
            : []}
            </table>
        </div>
    )
}

export default Home;
