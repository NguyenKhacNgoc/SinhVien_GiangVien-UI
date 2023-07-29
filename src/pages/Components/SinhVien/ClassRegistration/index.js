
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './ClassRegistration.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles)
function ClassRegistration() {
    const [classes, setClasses] = useState([])
    const navigate = useNavigate()
    const fetchUserIn4 = async() => {
      try{
        const accessToken = sessionStorage.getItem('accessToken')
        const response = await axios.get('http://localhost:8080/api/lich', {
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
          sessionStorage.removeItem('accessToken')
          navigate('/user/login')
        }
        
      }
    }
    useEffect(() => {
      fetchUserIn4()
      
    }, [])
    const handleDangKyClick = async (lopID) => {
      try{
        
        const accessToken = sessionStorage.getItem('accessToken')
        const response = await axios.put(`http://localhost:8080/api/addclass`,{lopID:lopID},
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
    const checkHanDangKy = (start, end) => {
      const currentDate = new Date()
      const startDate = new Date(start)
      const endDate = new Date(end)
      if(currentDate>startDate&&currentDate<endDate) return true
      else return false
    }
    
    const HanDangKyGio = (date) => {
       const currentDate = new Date()
      const handangky = new Date(date)
      const timeDiff = Math.abs(handangky - currentDate)
      const hoursDiff = Math.floor(timeDiff / (60 * 60 * 1000))
      return hoursDiff
    }
    const HanDangKyPhut = (date) => {
      const currentDate = new Date()
     const handangky = new Date(date)
     const timeDiff = Math.abs(handangky - currentDate)
     const minutesDiff = Math.floor((timeDiff / (60 * 1000)) % 60)
     return minutesDiff
   }
   
   const checkSLSV = (sinhvienddk, soluong) => {
    return sinhvienddk < soluong

   }
   const setColorSL = (index) => {
    if(index) return 'green'
    else return 'maroon'
   }
   const checkStatus = (start, end) => {
    const startDate = new Date(start)
    const currentDate = new Date()
    const endDate = new Date(end)
    if(currentDate < startDate) return 1
    else if(currentDate>startDate&&currentDate<endDate) return 2
    else  return 3
    
   }
   const stylesStatus = (index) => {
    switch(index){
      case 1: return 'Chờ đăng ký'
      case 2: return 'Có thể đăng ký'
      case 3: return 'Đã quá hạn'
      default: return 'Error'
    }
   }
   const setColorSTT = (index) => {
    switch(index){
      case 1: return 'gray'
      case 2: return 'green'
      case 3: return 'Maroon'
      default: return 'white'
    }

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
          <h1>Đăng ký lớp tín chỉ</h1>
          <div className={classNames('grid__row', cx('grid__row'))}>
          {classes.map((cls) => (
            <div className={cx('grid__column-3')} key={cls.id}>
              <div className={cx('class-item')}>
                <h2>{cls.mon.name}</h2>
                <p>Mã lớp: {cls.id}</p>
                <p>Ngày học: {convertDayOfWeek(cls.ngayhoc)}</p>
                <p>Phòng học: {cls.phonghoc}</p>
                <p>Buổi học: {cls.buoihoc}</p>
                <p>Số lượng: <span style={{padding:'4px', borderRadius:'4px', color:'#fff', backgroundColor: setColorSL(checkSLSV(cls.sinhViens.length, cls.soluong ))}}>{cls.sinhViens.length}/{cls.soluong}</span></p>
                <p>Trạng thái: <span style={{padding:'4px', borderRadius:'4px', color:'#fff', backgroundColor: setColorSTT(checkStatus(cls.ngaymodangky, cls.ngayketthucdangky))}}>{stylesStatus(checkStatus(cls.ngaymodangky, cls.ngayketthucdangky))}</span> </p>
                <p>Đăng ký từ: {String(new Date(cls.ngaymodangky).getHours()).padStart(2,0)}:{String(new Date(cls.ngaymodangky).getMinutes()).padStart(2,'0')} ngày {new Date(cls.ngaymodangky).getDate()}-{new Date(cls.ngaymodangky).getMonth() + 1}-{new Date(cls.ngaymodangky).getFullYear()}</p>
                <p>Đến trước: {String(new Date(cls.ngayketthucdangky).getHours()).padStart(2,0)}:{String(new Date(cls.ngayketthucdangky).getMinutes()).padStart(2,'0')} ngày {new Date(cls.ngayketthucdangky).getDate()}-{new Date(cls.ngayketthucdangky).getMonth() + 1}-{new Date(cls.ngayketthucdangky).getFullYear()}</p>
                {checkHanDangKy(cls.ngaymodangky, cls.ngayketthucdangky) && checkSLSV(cls.sinhViens.length, cls.soluong ) ? (
                  <>
                  <p
                    style={{color:'teal', fontWeight:'bold'}}
                  >
                  Còn {HanDangKyGio(cls.ngayketthucdangky)} giờ {HanDangKyPhut(cls.ngayketthucdangky)} phút để đăng ký 
                  </p>
                  <button
                    onClick={() => { handleDangKyClick(cls.id); }}
                  >
                    <FontAwesomeIcon icon={faRightToBracket} size='2xl' />
                  </button>
                  </>

                ): (
                  
                  <button
                    disabled
                    style={{ color: 'gray' }}
                  >
                  <FontAwesomeIcon icon={faRightToBracket} size='2xl' />
                  </button>
                  
                  )}
                  
              </div>
            </div>
          ))}
          </div>
        
      </div>
    )
}

export default ClassRegistration;