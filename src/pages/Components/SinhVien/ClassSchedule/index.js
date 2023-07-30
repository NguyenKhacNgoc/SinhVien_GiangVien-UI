import { useState } from 'react'
import styles from './ClassSchedule.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassArrowRight} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
const cx = classNames.bind(styles)
function ClassSchedule() {
    const [date, setDate] = useState(new Date().toISOString().slice(0,10))
    const navigate = useNavigate()
    const [schedules, setSchedules] = useState([])
    const fetchData = async() => {
        try{
            const accessToken = localStorage.getItem('accessToken')
            const response = await axios.get(`http://localhost:8080/api/getschedules?date=${date}`,{
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setSchedules(response.data)

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
    const convertdayofweeks = (day) => {
        switch (day) {
            case 0:
              return 'Chủ nhật';
            case 1:
              return 'Thứ 2';
            case 2:
              return 'Thứ 3';
            case 3:
              return 'Thứ 4';
            case 4:
              return 'Thứ 5';
            case 5:
              return 'Thứ 6';
            case 6:
              return 'Thứ 7';
            default:
              return '';
          }

    }
    const setstatuscolor = (trangthai) => {
        switch(trangthai){
            case 'Học': return 'lime'
            case 'Nghỉ': return 'gray'
            case 'Thi': return 'red'
            default: return 'white'
        }
    }

    
    
    return (
        <div className="grid">
            <h1>Lịch học</h1>
            <div className='grid__row'>
                <div className={cx('form-calendar')}>
                    <input
                        className={cx('form-calendar-input')}
                        type='date'
                        value={date}
                        onChange={(e) => {setDate(e.target.value)}}
                        
                    />
                    <button
                        className={cx('form-calendar-btn')}
                        onClick={() => {fetchData()}}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} size='2xl'/>

                    </button>
                </div>

            </div>
            {schedules.map((schedule) => (
                <div className='grid__row' key={schedule.id}>
                    <h3>{convertdayofweeks(new Date(schedule.batdau).getDay())} ngày {new Date(schedule.batdau).getDate()} - {new Date(schedule.batdau).getMonth() + 1} - {new Date(schedule.batdau).getFullYear()}</h3>
                    <table className={cx('class-schedule-table')}>
                        <thead>
                            <tr>
                                <th>Giờ</th>
                                <th>Phòng học</th>
                                <th>Môn</th>
                                <th>Mã lớp</th>
                                <th>Trạng thái</th>
                                </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{new Date(schedule.batdau).getHours()}:{String(new Date(schedule.batdau).getMinutes()).padStart(2, '0')} - {new Date(schedule.ketthuc).getHours()}:{String(new Date(schedule.batdau).getMinutes()).padStart(2, '0')}</td>
                                <td>{schedule.lopTC.phonghoc}</td>
                                <td >{schedule.lopTC.mon.name}</td>
                                <td>{schedule.lopTC.id}</td>
                                <td><span style={{padding:'5px', borderRadius:'5px', backgroundColor: setstatuscolor(schedule.trangthai)}}>{schedule.trangthai}</span></td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}

export default ClassSchedule;