
import styles from './Home.module.scss'
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles)

function Home() {
    const navigate = useNavigate()
    const [lopHCs, setLopHCs] = useState([])
    const [sinhviens, setSinhViens] = useState(null)
    const fetchData = async() => {
        try{
            const accessToken = sessionStorage.getItem('accessTokenCoVan')
            const response = await axios.get('http://localhost:8080/api/covan/getlopHC',{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setLopHCs(response.data)

        }
        catch(error){
            console.log(error)
            if(error.message === 'Network Error') alert('Server không phản hồi')
            else if(error.response.data === 'Xác thực thất bại'){
              alert('Xác thực thất bại, vui lòng đăng nhập lại')
              sessionStorage.removeItem('accessTokenCoVan')
              navigate('/covan/login')
            }
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    const handleLopHCClick = async(lophcid) => {
        try{
            const accessToken = sessionStorage.getItem('accessTokenCoVan')
            const response = await axios.get(`http://localhost:8080/api/covan/getsvbylophc?lophc=${lophcid}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setSinhViens(response.data)

        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className='grid'>
            <div className={classNames('grid__row', cx('grid__row'))}>
                <ul style={{listStyle:'none'}}>
                {lopHCs.map((lhc) => (
                    <li key={lhc.id}>
                        <button className={cx('classname-link')} onClick={() => {handleLopHCClick(lhc.id)}}>{lhc.name}</button>
                    </li>
                ))}    
                </ul>
                
            </div>
            {sinhviens && (
                <div className={classNames('grid__row', cx('grid__row'))}>
                    <div className={cx('sinhvien-list')}>
                    <table>
                        <thead>
                            <tr>
                                <th>Mã sinh viên</th>
                                <th>Tên sinh viên</th>
                                <th>Ngày sinh</th>
                                <th>Email</th>
                                <th>Lớp hành chính</th>
                                <th>Cố vấn học tập</th>
                            </tr>
                        </thead>
                        <tbody>
                        {sinhviens.map((sinhvien) => (
                            <tr key={sinhvien.id}>
                                <td>{sinhvien.masv}</td>
                                <td>
                                    <Link
                                        to={`/covan/loptinchi/${sinhvien.id}`}
                                        className={cx('sinhvien-list-link')}
                                    > <span>{sinhvien.name}</span></Link>
                                    
                                </td>
                                <td>{new Date(sinhvien.ngaysinh).getDate()}-{new Date(sinhvien.ngaysinh).getMonth()+1}-{new Date(sinhvien.ngaysinh).getFullYear()}</td>
                                <td>{sinhvien.email}</td>
                                <td>{sinhvien.lopHC.name}</td>
                                <td>{sinhvien.lopHC.covan.name}</td>
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

export default Home;