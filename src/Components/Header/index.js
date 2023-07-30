import { faCalendarDays, faCalendarPlus, faCheckToSlot, faHouse, faPersonWalkingLuggage, faSquarePollVertical, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './Header.module.scss'
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles)
function Header() {
    const islogged = localStorage.getItem('accessToken')
    return (
        <header className={cx('header')}>
            <Link 
                className={cx('header-link')}
               
                to={islogged?'/classschedule':'/user/login'}
            >
                <FontAwesomeIcon icon={faCalendarDays} size="2xl" />
            </Link>
            <Link 
                className = {cx('header-link')}
                to={islogged?'/classregistration':'/user/login'}
            > 
                <FontAwesomeIcon icon={faCalendarPlus} size="2xl"/>
            </Link>
            <Link 
                className = {cx('header-link')}
                
                to={islogged?'/registeredclass':'/user/login'}
            > 
                <FontAwesomeIcon icon={faCheckToSlot} size="2xl"/>
            </Link>
            <Link 
                className={cx('header-link')}
                
                to={islogged?'/performance':'/user/login'}
            >
                <FontAwesomeIcon icon={faSquarePollVertical} size="2xl" />
            </Link>
            <Link 
                className={cx('header-link')} 
                //to={'/user/login'}
                to={islogged?'/profile':'/user/login'}
                
            >
                <FontAwesomeIcon icon={faUserGraduate} size="2xl" />
            </Link>
        </header>
    )
}

export default Header;