
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './RegisteredClass.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)
function RegisteredClass() {
    const [classes, setClasses] = useState([])
    const navigate = useNavigate()
    const fetchUserIn4 = async() => {
      try{
        const accessToken = localStorage.getItem('accessToken')
        
        const response = await axios.get('http://localhost:8080/api/registeredclass', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        
        setClasses(response.data)
        


      }catch(error){
        console.log(error)
        if(error.message === 'Network Error') alert('Server không phản hồi')
        else if(error.response.data === 'Xác thực thất bại'){
          alert('Xác thực thất bại, vui lòng đăng nhập lại')
          localStorage.removeItem('accessToken')
          navigate('/user/login')

      }
        
      }
    }
    useEffect(() => {
      
      fetchUserIn4()
    }, [])

    const handleCancelClick = async (lopID) => {
      try{
        
        const accessToken = localStorage.getItem('accessToken')
        const response = await axios.put(`http://localhost:8080/api/removeclass`,{lopID:lopID},
        {
          headers: {
          Authorization: `Bearer ${accessToken}`
        }
        })
        alert(response.data)
        fetchUserIn4()
          
      }catch(error){
        console.log(error)
                
      }
    }
    const HanHuy = (handangky) => {
      const hanhuy = new Date(handangky)
      hanhuy.setDate(hanhuy.getDate() - 1)
      return hanhuy
    }
    const checkHanHuy = (hanhuy) => {
      const ngayhientai = new Date()
      return ngayhientai < hanhuy
    }
    const convertDayOfWeek = (day) => {
      switch (day) {
        case 'MONDAY':
          return 'Thứ 2';
        case 'TUESDAY':
          return 'Thứ 3';
        case 'WEDNESDAY':
          return 'Thứ 4';
        case 'THURSDAY':
          return 'Thứ 5';
        case 'FRIDAY':
          return 'Thứ 6';
        case 'SATURDAY':
          return 'Thứ 7';
        case 'SUNDAY':
          return 'Chủ nhật';
        default:
          return '';
      }
    }
    
    return (
        <div className="grid">
          <h1>Lớp đã đăng ký</h1>
          <div className={classNames('grid__row', cx('grid__row'))}>
          {classes.map((cls) => (
            <div className={cx('grid__column-3')} key={cls.id}>
              <div className={cx('class-item')}>
                <h2>{cls.mon.name}</h2>
                <p>Mã lớp: {cls.id}</p>
                <p>Ngày học: {convertDayOfWeek(cls.ngayhoc)}</p>
                <p>Phòng học: {cls.phonghoc}</p>
                <p>Buổi học: {cls.buoihoc}</p>
                <p>Số lượng: {cls.sinhViens.length}/{cls.soluong}</p>
                <p style={{fontWeight:'bold'}}>Huỷ trước {String(HanHuy(cls.ngayketthucdangky).getHours()).padStart(2,0)}:{String(HanHuy(cls.ngayketthucdangky).getMinutes()).padStart(2,'0')} ngày {HanHuy(cls.ngayketthucdangky).getDate()}-{HanHuy(cls.ngayketthucdangky).getMonth() + 1}-{HanHuy(cls.ngayketthucdangky).getFullYear()}</p>
                {checkHanHuy(HanHuy(cls.ngayketthucdangky)) ? (
                  <button
                  onClick={() => {handleCancelClick(cls.id)}}
                    
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} size='2xl' />
                  </button>

                ):(
                  <>
                  <p style={{color:'red', fontWeight:'bold'}}>Hết hạn huỷ</p>
                  <button disabled style={{color:'gray'}}
                  >
                  <FontAwesomeIcon icon={faRightFromBracket} size='2xl' />
                  </button>
                  </>
                  
                )}
              </div>
            </div>
          ))}
          </div>
        
      </div>
    )
}

export default RegisteredClass;