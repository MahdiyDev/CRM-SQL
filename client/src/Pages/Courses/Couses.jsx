import useCourse from '../../Hooks/useCourse';
import './Courses.scss'

function Courses() {
    const course = useCourse('get')
    const [setCourseDelete] = useCourse('delete')

    const deleteCourse = (e) => {
        setCourseDelete(e.target.id)
        window.location = '/'
    }
    
    return (
        <div className="course">
            <h2 className='course_tile teacher_title'>Courses</h2>
            <ul className='course_list teacher_list'>
                {course.length ? course.map(c => {
                    return (
                        <li key={c.course_name} className='course_item teacher_item'>
                            <span className='teacher_name_wrapper'>Course Name: <h3>{c.course_name}</h3></span >
                            <button onClick={deleteCourse} id={c.course_uid} className='btn'>delete course</button>
                        </li>
                    )
                }) : []}
            </ul>
        </div>
    )
}

export default Courses;
