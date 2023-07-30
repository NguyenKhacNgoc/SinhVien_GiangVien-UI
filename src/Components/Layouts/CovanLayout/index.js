import { faCalendarCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './CovanLayOut.module.scss'
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles)
function CoVanLayOut({children}) {
    const islogged = localStorage.getItem('accessTokenCoVan')
    return (
        <>
        <header className={cx('header')}>
            <Link 
                className={cx('header-link')} 
                //to={'/user/login'}
                to={islogged?'/covan/home':'/covan/login'}
                
            >
                <FontAwesomeIcon icon={faCalendarCheck} size="2xl" />
            </Link>
            <Link 
                className={cx('header-link')} 
                //to={'/user/login'}
                to={islogged?'/covan/profile':'/covan/login'}
                
            >
                <FontAwesomeIcon icon={faUser} size="2xl" />
            </Link>
        </header>
        <div className="container">
            {children}
        </div>
        </>
    )
}

export default CoVanLayOut;