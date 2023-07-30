
import styles from './LopTC.module.scss'
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)
function AdLopTC() {
    const navigate = useNavigate()
    const [lopTCs, setLopTCs] = useState([])
    const [mons, setMons] = useState([])

    const [mon, setMon] = useState("")
    const [ngayhoc, setNgayhoc] = useState("")
    const [buoihoc, setBuoihoc] = useState("")
    const [phonghoc, setPhonghoc] = useState()
    const [soluong, setSoluong] = useState()
    const [ngaymodangky, setNgaymodangky] = useState()
    const [ngayketthucdangky, setNgayketthucdangky] = useState()
    const [ngaybatdauhoc, setNgaybatdauhoc] = useState()
    const [errorMon, setErrorMon] = useState()
    const [errorNgayhoc, setErrorNgayhoc] = useState()
    const [errorBuoi, setErrorBuoi] = useState()
    const [errorPhong, setErrorPhong] = useState()
    const [errorSL, setErrorSL] = useState()
    const [errorNgaymodk, setErrorNgaymodk] = useState()
    const [errorHandk, setErrorHandk] = useState()
    const [errorNgaybdh, setErrorNgaybdh] = useState()

    const [selectedClassID, setSelectedClassID] = useState()

    const fetchData = async() => {
        try{
            const accessToken = localStorage.getItem('accessTokenAdmin')
            const response = await axios.get('http://localhost:8080/api/admin/getlopTC',{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setLopTCs(response.data.lopTCs)
            setMons(response.data.mons)

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
    }, [])
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
    const canRemove = (date) => {
        const currentDate = new Date()
        return currentDate < new Date(date)
    }
    const onChangeMon = (e) => {
        setMon(e.target.value)
        setErrorMon('')
    }
    const onChangeNgayhoc = (e) => {
        setNgayhoc(e.target.value)
        setErrorNgayhoc('')
    }
    const onChangeBuoi = (e) => {
        setBuoihoc(e.target.value)
        setErrorBuoi('')
    }
    const onChangePhong = (e) => {
        setPhonghoc(e.target.value)
        setErrorPhong('')
    }
    const onChangeSL = (e) => {
        setSoluong(e.target.value)
        setErrorSL('')
    }
    const onChangeNgaymo = (e) => {
        setNgaymodangky(e.target.value)
        setErrorNgaymodk('')
    }
    const onChangeHanDK = (e) => {
        setNgayketthucdangky(e.target.value)
        setErrorHandk('')
    }
    const onChangeNgaybdh = (e) => {
        setNgaybatdauhoc(e.target.value)
        setErrorNgaybdh('')
    }
    
    const handleClick = async() => {
        if(!mon){
            setErrorMon('Hãy chọn 1 môn học')
        }
        if(!ngayhoc){
            setErrorNgayhoc('Hãy chọn 1 ngày học')
        }
        if(!buoihoc){
            setErrorBuoi('Hãy chọn 1 buổi học')
        }
        if(!phonghoc){
            setErrorPhong('Hãy chọn 1 phòng học')
        }
        if(!soluong){
            setErrorSL('Hãy chọn số lượng')
        }
        if(!ngaymodangky){
            setErrorNgaymodk('Hãy chọn thời gian')
        }
        if(!ngayketthucdangky){
            setErrorHandk('Hãy chọn thời gian')
        }
        if(!ngaybatdauhoc){
            setErrorNgaybdh('Hãy chọn thời gian')
        }
        if(mon && ngayhoc && buoihoc && phonghoc && soluong && ngaymodangky && ngayketthucdangky && ngaybatdauhoc){
            try{
                const accessToken = localStorage.getItem('accessTokenAdmin')
                const data = {
                    mon:mon,
                    ngayhoc:ngayhoc,
                    buoihoc:buoihoc,
                    phonghoc:phonghoc,
                    soluong:soluong,
                    ngaymodangky:ngaymodangky,
                    ngayketthucdangky:ngayketthucdangky,
                    ngaybatdauhoc:ngaybatdauhoc
                }
                const response = await axios.post('http://localhost:8080/api/admin/addclass', data, {
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

    }
    const handleDelete = async(loptcID) => {
        try{
            const accessToken = localStorage.getItem('accessTokenAdmin')
            
            const response = await axios.delete(`http://localhost:8080/api/admin/deleteclass?loptc=${loptcID}`, {
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
    const setColorTrangThai = (stt) => {
        switch(stt){
            case 'Chưa hoàn thành': return 'lime'
            case 'Đã xong':  return 'gray'
            default: return 'white'
        }
    }
    const setButtonTrangThai = (stt) => {
        switch(stt){
            case 'Chưa hoàn thành': return true
            case 'Đã xong': return false
            default: return false
        }
    }
    const handleClassClick = (id) => {
        setSelectedClassID(id)
        
    }
    
    
    return (
        <div className='grid'>
            <div className={classNames('grid__row', cx('grid__row'))}>
                <div className={cx('form-addclass')}>
                    <label>Môn</label>
                    <select value={mon} onChange={onChangeMon}>
                        <option value="" disabled>Chọn môn học</option>
                        {mons.map((mon) => (
                            
                            <option value={mon.id} key={mon.id}>{mon.name}</option>
                        ))}
                        
                    </select><br/>
                    {errorMon && (
                        <><span style={{ color: 'red' }}>{errorMon}</span><br /></>
                    )}

                    <label>Ngày học</label>
                    <select value={ngayhoc} onChange={onChangeNgayhoc}>
                        <option value="" disabled>Chọn ngày học</option>
                        <option value='MONDAY'>Thứ 2</option>
                        <option value='TUESDAY'>Thứ 3</option>
                        <option value='WEDNESDAY'>Thứ 4</option>
                        <option value='THURSDAY'>Thứ 5</option>
                        <option value='FRIDAY'>Thứ 6</option>
                        <option value='SATURDAY'>Thứ 7</option>
                        <option value='SUNDAY'>Chủ nhật</option>
                    </select><br/>
                    {errorNgayhoc && (
                        <><span style={{ color: 'red' }}>{errorNgayhoc}</span><br /></>
                    )}
                    <label>Buổi</label>
                    <select value={buoihoc} onChange={onChangeBuoi}>
                    <option value="" disabled>Chọn buổi học</option>
                        <option value='Sáng'>Sáng</option>
                        <option value='Chiều'>Chiều</option>
                    </select><br/>
                    {errorBuoi && (
                        <><span style={{ color: 'red' }}>{errorBuoi}</span><br /></>
                    )}
                    <label>Phòng</label>
                    <input type='text' value={phonghoc} onChange={onChangePhong}/><br/>
                    {errorPhong && (
                        <><span style={{ color: 'red' }}>{errorPhong}</span><br /></>
                    )}
                    <label>Số lượng sinh viên</label>
                    <input type='number' value={soluong} onChange={onChangeSL}/><br/>
                    {errorSL && (
                        <><span style={{ color: 'red' }}>{errorSL}</span><br /></>
                    )}
                    <label>Mở đăng ký từ</label>
                    <input type='datetime-local' value={ngaymodangky} onChange={onChangeNgaymo}/><br/>
                    {errorNgaymodk && (
                        <><span style={{ color: 'red' }}>{errorNgaymodk}</span><br /></>
                    )}
                    <label>Đăng ký đến</label>
                    <input type='datetime-local' value={ngayketthucdangky} onChange={onChangeHanDK}/><br/>
                    {errorHandk && (
                        <><span style={{ color: 'red' }}>{errorHandk}</span><br /></>
                    )}
                    <label>Học từ</label>
                    <input type='datetime-local'  value={ngaybatdauhoc} onChange={onChangeNgaybdh}/><br/>
                    {errorNgaybdh && (
                        <><span style={{ color: 'red' }}>{errorNgaybdh}</span><br /></>
                    )}
                    <button onClick={() => {handleClick()}}>Mở thêm lớp</button>
                </div>
                
            </div>
            {lopTCs && (
                <div className={classNames('grid__row', cx('grid__row'))}>
                    <div className={cx('loptc-list')}>
                    <table>
                        <thead>
                            <tr>
                                <th>Mã lớp tín chỉ</th>
                                <th>Môn</th>
                                <th>Ngày học</th>
                                <th>Buổi học</th>
                                <th>Phòng học</th>
                                <th>Số lượng</th>
                                <th>Ngày mở đăng ký</th>
                                <th>Hạn đăng ký</th>
                                <th>Học từ</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                        {lopTCs.map((ltc) => (
                            <tr key={ltc.id}>
                                <td>{ltc.id}</td>
                                <td>
                                    <button
                                        className={cx('loptc-list-link')}
                                        
                                        onClick={() => {handleClassClick(ltc.id)}}
                                    >
                                    <span>{ltc.mon.name}</span>
                                    </button>
                                </td>
                                <td>{convertDayOfWeek(ltc.ngayhoc)}</td>
                                <td>{ltc.buoihoc}</td>
                                <td>{ltc.phonghoc}</td>
                                <td><span>{ltc.sinhViens.length}/{ltc.soluong}</span></td>
                                <td>{String(new Date(ltc.ngaymodangky).getHours()).padStart(2,0)}:{String(new Date(ltc.ngaymodangky).getMinutes()).padStart(2,0)} ngày {new Date(ltc.ngaymodangky).getDate()}-{new Date(ltc.ngaymodangky).getMonth()+1}-{new Date(ltc.ngaymodangky).getFullYear()}</td>
                                <td>{String(new Date(ltc.ngayketthucdangky).getHours()).padStart(2,0)}:{String(new Date(ltc.ngayketthucdangky).getMinutes()).padStart(2,0)} ngày {new Date(ltc.ngayketthucdangky).getDate()}-{new Date(ltc.ngayketthucdangky).getMonth()+1}-{new Date(ltc.ngayketthucdangky).getFullYear()}</td>
                                <td>{new Date(ltc.ngaybatdauhoc).getDate()}-{new Date(ltc.ngaybatdauhoc).getMonth()+1}-{new Date(ltc.ngaybatdauhoc).getFullYear()}</td>
                                <td><span style={{padding:'4px', borderRadius:'4px', backgroundColor:setColorTrangThai(ltc.trangthai)}}>{ltc.trangthai}</span></td>
                                <td>
                                    {canRemove(ltc.ngaybatdauhoc)?(
                                        <button
                                        className={cx('button-link')}
                                        onClick={() => {handleDelete(ltc.id)}}
                                        >
                                        <FontAwesomeIcon icon={faTrashCan} size='2xl'></FontAwesomeIcon>
                                        </button>

                                    ):(
                                        <button
                                        disabled
                                        className={cx('button-link')} 
                                        >
                                        <FontAwesomeIcon icon={faBan} size='2xl'></FontAwesomeIcon>
                                        </button>

                                    )}
                                    
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                </div>
            )}
            {selectedClassID && (
                <div className={classNames('grid__row', cx('grid__row'))}>
                <div className={cx('loptc-list')}>
                <table>
                    <thead>
                        <tr>
                            <th>Mã sinh viên</th>
                            <th>Tên sinh viên</th>
                            <th>Ngày sinh</th>
                            <th>Liên hệ</th>
                            <th>Mã lớp tín chỉ</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                    {lopTCs.find((ltc) => ltc.id === selectedClassID).sinhViens.map((sv) => (
                        <tr key={sv.id}>
                            <td>{sv.masv}</td>
                            <td>
                                <Link
                                    className={cx('loptc-list-link')}
                                    to={`/admin/diemsv/${selectedClassID}/${sv.id}`}
                                    target='_blank'
                                    
                                >
                                <span>{sv.name}</span>
                                </Link>
                            </td>
                            <td>{new Date(sv.ngaysinh).getDate()}-{new Date(sv.ngaysinh).getMonth() + 1}-{new Date(sv.ngaysinh).getFullYear()}</td>
                            <td>{sv.email}</td>
                            <td>{selectedClassID}</td>
                           
                            
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            </div>

            )}
            


        </div>

    )
}

export default AdLopTC;