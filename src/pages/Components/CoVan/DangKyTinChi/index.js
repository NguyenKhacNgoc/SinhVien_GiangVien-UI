import { useParams, useNavigate } from "react-router-dom";
import styles from './DangKyTinChi.module.scss'
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles)
function DangKyTinChi() {
  const navigate = useNavigate()
    const {sinhvienID} = useParams()
    const [classes, setClasses] = useState([])
    const [classed, setClassed] = useState([])
    const fetchDataChua = async() => {
        try{
            const accessToken = sessionStorage.getItem('accessTokenCoVan')
            const response = await axios.get(`http://localhost:8080/api/covan/getloptinchi?sinhvienID=${sinhvienID}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setClasses(response.data)
            
        }catch(error){
            console.log(error)
        }
    }
    const fetchDataDa = async() => {
        try{
            const accessToken = sessionStorage.getItem('accessTokenCoVan')
            const response = await axios.get(`http://localhost:8080/api/covan/getloptinchied?sinhvienID=${sinhvienID}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setClassed(response.data)

        }catch(error){
            console.log(error)
            if(error.message === 'Network Error') alert('Server không phản hồi')
            else if(error.response.data === 'Xác thực thất bại'){
              alert('Xác thực thất bại, vui lòng đăng nhập lại')
              sessionStorage.removeItem('accessTokenCoVan')
              navigate('/covan/login')
            }
        }
    }

    const checkSLSV = (sinhvienddk, soluong) => {
        return sinhvienddk < soluong
    
    }
    const setColorSL = (index) => {
        if(index) return 'lime'
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
        case 2: return 'lime'
        case 3: return 'Maroon'
        default: return 'white'
      }
  
     }
    const hanDangKy = (date) => {
        return new Date(date) < new Date()
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
    const handleDangKyClick = async (lopID) => {
        try{

          const accessToken = sessionStorage.getItem('accessTokenCoVan')
          const data = {
            lopID: lopID,
            sinhvienID: sinhvienID
          }
          const response = await axios.put(`http://localhost:8080/api/covan/addclass`, data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          alert(response.data)
          fetchDataChua()
          fetchDataDa()
          
        }catch(error){
          console.log(error)
          
        }
  
    }
    const handleCancelClick = async (lopID) => {
        try{
          
          const accessToken = sessionStorage.getItem('accessTokenCoVan')
          const data = {
            lopID: lopID,
            sinhvienID: sinhvienID
          }
          const response = await axios.put(`http://localhost:8080/api/covan/removeclass`, data, {

            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          alert(response.data)
          fetchDataChua()
          fetchDataDa()
            
        }catch(error){
          console.log(error)
                  
        }
      }

    useEffect(() => {
        fetchDataChua()
        fetchDataDa()

    }, [])
    
    return (
        <div className="grid">
            <h2>Đăng ký lớp tín chỉ cho sinh viên</h2>
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
                           
                            {checkSLSV(cls.sinhViens.length, cls.soluong) && hanDangKy(cls.ngaymodangky)?(
                                <button
                                    onClick={() => { handleDangKyClick(cls.id); }}
                                
                            >
                                <FontAwesomeIcon icon={faRightToBracket} size='2xl' />
                                </button>
                                
                            ):(
                                <button disabled style={{color:'gray'}}
                                
                            >
                                <FontAwesomeIcon icon={faRightToBracket} size='2xl' />
                                </button>
                                
                            )}
                        </div>

                    </div>
                ))}

            </div>
            <h2>Đã đăng ký</h2>
            <div className={classNames('grid__row', cx('grid__row'))}>
                {classed.map((cls) => (
                    <div className={cx('grid__column-3')} key={cls.id}>
                        <div className={cx('class-item')}>
                            <h2>{cls.mon.name}</h2>
                            <p>Mã lớp: {cls.id}</p>
                            <p>Ngày học: {convertDayOfWeek(cls.ngayhoc)}</p>
                            <p>Phòng học: {cls.phonghoc}</p>
                            <p>Buổi học: {cls.buoihoc}</p>
                            <p>Số lượng: <span style={{padding:'4px', borderRadius:'4px', color:'#fff', backgroundColor: setColorSL(checkSLSV(cls.sinhViens.length, cls.soluong ))}}>{cls.sinhViens.length}/{cls.soluong}</span></p>
                            <p>Đăng ký từ: {String(new Date(cls.ngaymodangky).getHours()).padStart(2,0)}:{String(new Date(cls.ngaymodangky).getMinutes()).padStart(2,'0')} ngày {new Date(cls.ngaymodangky).getDate()}-{new Date(cls.ngaymodangky).getMonth() + 1}-{new Date(cls.ngaymodangky).getFullYear()}</p>
                            <p>Đến trước: {String(new Date(cls.ngayketthucdangky).getHours()).padStart(2,0)}:{String(new Date(cls.ngayketthucdangky).getMinutes()).padStart(2,'0')} ngày {new Date(cls.ngayketthucdangky).getDate()}-{new Date(cls.ngayketthucdangky).getMonth() + 1}-{new Date(cls.ngayketthucdangky).getFullYear()}</p>
                            <button
                                className={cx('button-huy')}
                                style={{color:'maroon'}}
                                onClick={() => {handleCancelClick(cls.id)}}
                                
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} size='2xl' />
                                </button>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    )
}

export default DangKyTinChi;