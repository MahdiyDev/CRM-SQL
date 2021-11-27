import './Header.scss'
import CourseModal from '../CourseModal/CourseModal';
import UserModal from '../UserModal/UserModal';
import GroupModal from '../GroupModal/GroupModal';
import TeacherModal from '../TeacherModal/TeacherModal';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ children }) {
    const [modal, setModal] = useState('modal-close')
    const burgerModal = useRef()
    const openModal = () => {
        setModal('modal')
    }
    return (
        <>
            <header className='header'>
                <div className="burger_btn_wrapper">
                    <button className="burger-btn" onClick={()=>burgerModal.current.classList.add('burger--active')}>
                        <div className="burger-btn-inner"></div>
                    </button>
                </div>
                <Link to='/' className='header_title_link'>
                    <h1 className='header_title'>MahdiyTeach</h1>
                </Link>
                <div className="burger" onClick={(e) => e.target.classList.remove('burger--active')} ref={burgerModal}>
                    <ul className='burger_list'>
                        <li className='burger_item'>
                            <Link to='/' className='burger_link'>Home</Link>
                        </li>
                        <li className='burger_item'>
                            <Link to='/courses' className='burger_link'>Courses</Link>
                        </li>
                        <li className='burger_item'>
                            <Link to='/teachers' className='burger_link'>Teachers</Link>
                        </li>
                    </ul>
                </div>
                <div className="cicle_btn_wrapper">
                    <button onClick={openModal} className='cicle_btn modal-openner'>+</button>
                </div>
                <div className={modal} onClick={(e)=>e.target.classList.value === 'modal' ? setModal('modal-close') :
                    ''}>
                    <ul className='header_list'>
                        <li className='header_item'>
                            <CourseModal />
                        </li>
                        <li className='header_item'>
                            <TeacherModal />
                        </li>
                        <li className='header_item'>
                            <GroupModal />
                        </li>
                        <li className='header_item'>
                            <UserModal />
                        </li>
                    </ul>
                </div>
            </header>
            {children}
        </>
    )
}

export default Header;
