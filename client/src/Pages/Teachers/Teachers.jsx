import './Teachers.scss'
import useTeachers from '../../Hooks/useTeachers';

function Taechers() {
    const teacher = useTeachers('get')
    const [setTeacherDelete] = useTeachers('delete')

    const deleteTeacher = (e) => {
        setTeacherDelete(e.target.id)
        window.location = '/'
    }
    return (
        <div className='teacher'>
                <h2 className='teacher_title'>Teachers</h2>
            <ul className='teacher_list'>
                {teacher.length ? teacher.map(t => {
                    return (
                        <li key={t.first_name} className='teacher_item'>
                            <span className='teacher_name_wrapper'>First Name: <h3>{t.first_name}</h3></span >
                            <span className='teacher_name_wrapper'>Last Name: <h3>{t.last_name}</h3></span >
                            <span className='teacher_name_wrapper'>Teach Course: <h3>{t.course_name}</h3></span >
                            <span className='teacher_name_wrapper'>
                                Tel Nuber: <h3>+{t.phone_number}</h3>
                                <a className='cicle_btn' href={`tel:+${t.phone_number}`}>call</a>
                            </span >
                            <span className='teacher_name_wrapper'>
                                Teacher Salary: <h3>{t.salary}</h3>
                            </span>
                            <h3 key={t.first_name}>Groups: </h3>
                            {t.groupArr ? t.groupArr.map(g => {
                                return (
                                    <span key={g.group_name} >{g.group_name}, </span>
                                )
                            }) : []}
                            <button onClick={deleteTeacher} id={t.teacher_uid} className='btn'>delete teacher</button>
                        </li>
                    )
                }): []}
            </ul>
        </div>
    )
}

export default Taechers;
