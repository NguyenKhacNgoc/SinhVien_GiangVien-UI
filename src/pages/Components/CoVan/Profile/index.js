import { useEffect, useState } from 'react';
import styles from './Profile.module.scss'
import classNames from 'classnames/bind';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles)
function Profile() {
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchUserIn4 = async() => {
            try{
                const accessToken = sessionStorage.getItem('accessTokenCoVan')
                const response = await axios.get('http://localhost:8080/api/covan/profile', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                
                if(response.status === 200){
                    
                    setUser(response.data)
                    
                }
                  
            }catch(error){
                console.log(error)
                if(error.message === 'Network Error'){
                    alert('Server không phản hồi')
                }
                else{
                    sessionStorage.removeItem('accessTokenCoVan')
                    navigate('/covan/login')
                }
                
            }
        }
        fetchUserIn4()
    }, [])
    
    const handlelogout = () => {
        sessionStorage.removeItem('accessTokenCoVan')
        navigate('/covan/login')
    }
    return (
        <div className='grid'>
            <div className={classNames('grid__row', cx('grid__row'))}>
            <h1>Thông tin Cố vấn</h1>
            <div className={cx('student-card')}>
                <div className={cx('student-details')}>
                    
                    <div className={cx('detail-row')}>
                        <span className={cx('label')}>Tên:</span>
                        <span className={cx('value')}>{user.name}</span>
                    </div>
                    <div className={cx('detail-row')}>
                        <span className={cx('label')}>Email:</span>
                        <span className={cx('value')}>{user.email}</span>
                    </div>
                    <div className={cx('detail-row')}>
                        <button
                            onClick={handlelogout}
                            
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} size='2xl'/>
                        </button>
                    </div>
                </div>
            </div>
           
            </div>
            

        </div>
    )
}

export default Profile;