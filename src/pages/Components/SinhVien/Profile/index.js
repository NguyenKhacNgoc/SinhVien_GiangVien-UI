import { useEffect, useState } from 'react';
import styles from './Profile.module.scss'
import classNames from 'classnames/bind';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles)
function Profile() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchUserIn4 = async() => {
            try{
                const accessToken = localStorage.getItem('accessToken')
                const response = await axios.get('http://localhost:8080/api/user', {
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
                    localStorage.removeItem('accessToken')
                    navigate('/user/login')
                }
                
            }
        }
        fetchUserIn4()
    }, [])
    
    const handlelogout = () => {
        localStorage.removeItem('accessToken')
        navigate('/user/login')
    }
    return (
        <div className='grid'>
            <div className={classNames('grid__row', cx('grid__row'))}>
            <h1>Thông tin sinh viên</h1>
            
            {user&&(
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
                            <span className={cx('label')}>Mã sinh viên:</span>
                            <span className={cx('value')}>{user.masv}</span>
                        </div>
                        <div className={cx('detail-row')}>
                            <span className={cx('label')}>Ngày sinh:</span>
                            <span className={cx('value')}>{new Date(user.ngaysinh).getDate()}-{new Date(user.ngaysinh).getMonth() + 1}-{new Date(user.ngaysinh).getFullYear()}</span>
                        </div>
                        <div className={cx('detail-row')}>
                            <span className={cx('label')}>Lớp:</span>
                            <span className={cx('value')}>{user.lopHC.name}</span>
                        </div>
                        <div className={cx('detail-row')}>
                            <span className={cx('label')}>Cố vấn học tập:</span>
                            <span className={cx('value')}>{user.lopHC.covan.name}</span>
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
            )}
           
              
            </div>
            

        </div>
    )
}

export default Profile;