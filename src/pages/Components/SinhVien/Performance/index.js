import axios from 'axios';
import styles from './Performance.module.scss'
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useEffect } from 'react';
const cx = classNames.bind(styles)
function Performance() {
    const [diems, SetDiems] = useState([])
    const data = [
        {
            maLop: 'L01',
            tenMon: 'Toán',
            soTinChi: 3,
            diemChuyenCan: 8.5,
            diemGiuaKy: 7.8,
            diemCuoiKy: 9.0
        },
        {
            maLop: 'L02',
            tenMon: 'Toán',
            soTinChi: 3,
            diemChuyenCan: 8.5,
            diemGiuaKy: 7.8,
            diemCuoiKy: 9.0
        },
        {
            maLop: 'L03',
            tenMon: 'Toán',
            soTinChi: 3,
            diemChuyenCan: 8.5,
            diemGiuaKy: 7.8,
            diemCuoiKy: 9.0
            }
        
        // Thêm dữ liệu cho các bản ghi khác tương tự
    ];
    const fetchData = async() => {
        try{
            const accessToken = sessionStorage.getItem('accessToken')
            const response = await axios.get('http://localhost:8080/api/getDiem', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            SetDiems(response.data)
            
        }
        catch(error){
            console.log(error)

        }
    }
    useEffect(() => {
        fetchData()
    },[])
    return (
        <div className="grid">
            <div className='grid__row'>
                <div className={cx('scoreboard')}>
                    <table>
                        <thead>
                            <tr>
                                <th>Mã lớp</th>
                                <th>Tên môn</th>
                                <th>Số tín chỉ</th>
                                <th>Điểm chuyên cần</th>
                                <th>Điểm giữa kỳ</th>
                                <th>Điểm cuối kỳ</th>
                            </tr>
                        </thead>
                        <tbody>
                        {diems.map((diem) => (
                            <tr key={diem.id}>
                                <td>{diem.lopTC.id}</td>
                                <td>{diem.lopTC.mon.name}</td>
                                <td>{diem.lopTC.mon.sotinchi}</td>
                                <td>{diem.cc}</td>
                                <td>{diem.gk}</td>
                                <td>{diem.thi}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Performance;