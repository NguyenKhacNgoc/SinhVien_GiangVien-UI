import axios from 'axios';
import styles from './Performance.module.scss'
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHighlighter } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles)
function Performance() {
    const navigate = useNavigate()
    const [diems, SetDiems] = useState()
    const {loptcID, sinhvienID} = useParams()
    const [isEdit, setIsEdit] = useState(true)
    const [cc, setCC] = useState()
    const [gk, setGK] = useState()
    const [thi, setThi] = useState()
    const fetchData = async() => {
        try{
            const accessToken = localStorage.getItem('accessTokenAdmin')
            const response = await axios.get(`http://localhost:8080/api/admin/getdiemsv?loptcID=${loptcID}&sinhvienID=${sinhvienID}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            SetDiems(response.data)
            setCC(response.data.cc)
            setGK(response.data.gk)
            setThi(response.data.thi)
            
        }
        catch(error){
            console.log(error)
            if(error.message === 'Network Error') alert('Server không phản hồi')
            else if(error.response.data === 'Xác thực thất bại'){
              alert('Xác thực thất bại, vui lòng đăng nhập lại')
              localStorage.removeItem('accessTokenAdmin')
              navigate('/admin/login')
            }

        }
    }
    useEffect(() => {
        fetchData()
    },[])

    const handleUpdate = async() => {
        try{
            const accessToken = localStorage.getItem('accessTokenAdmin')
            const data = {
                lopTC: loptcID,
                sinhVien: sinhvienID,
                cc: cc,
                gk: gk,
                thi: thi
            }
            const response = await axios.put('http://localhost:8080/api/admin/putdiem', data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            alert(response.data)
            fetchData()

        }catch(error){
            console.log(error)
            alert(error.response.data)
        }

    }
    return (
        <div className="grid">
            <div className='grid__row'>
                <div className={cx('scoreboard')}>
                    <table>
                        <thead>
                            <tr>
                                <th>Mã sinh viên</th>
                                <th>Tên sinh viên</th>
                                <th>Mã lớp</th>
                                <th>Tên môn</th>
                                <th>Số tín chỉ</th>
                                <th>Điểm chuyên cần</th>
                                <th>Điểm giữa kỳ</th>
                                <th>Điểm cuối kỳ</th>
                                <th>Sửa</th>
                                <th>Gửi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {diems && (

                            <tr >
                                <td>{diems.sinhVien.masv}</td>
                                <td>{diems.sinhVien.name}</td>
                                <td>{diems.lopTC.id}</td>
                                <td>{diems.lopTC.mon.name}</td>
                                <td>{diems.lopTC.mon.sotinchi}</td>
                                <td>
                                    <input 
                                        type='number' 
                                        min={0} 
                                        max={10} 
                                        disabled ={isEdit} 
                                        value={cc}
                                        onChange={(e) =>{setCC(e.target.value)}}
                                        
                                    />
                                </td>
                                <td>
                                    <input 
                                        type='number' 
                                        min={0} max={10} 
                                        disabled = {isEdit} 
                                        
                                        value={gk}
                                        onChange={(e) =>{setGK(e.target.value)}}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type='number' 
                                        min={0} max={10} 
                                        disabled = {isEdit} 
                                       
                                        value={thi}
                                        onChange={(e) =>{setThi(e.target.value)}}
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => {setIsEdit(false)}}
                                        
                                    >
                                        <FontAwesomeIcon icon={faHighlighter} size='2xl'/>
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleUpdate()} 
                                    >
                                        <FontAwesomeIcon icon={faCheck} size='2xl'/>
                                    </button>
                                </td>
                            </tr>
                            )}
                       
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Performance;