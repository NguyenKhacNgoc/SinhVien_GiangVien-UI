import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react';

import axios from 'axios';


const cx = classNames.bind(styles)
function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(true)
    const handleChangeEmail = (e) =>{
        setEmail(e.target.value)
        setErrorEmail('')
        setError('')
        setSuccess('')
        

        if(e.target.value !== ''){
            validateEmail(e.target.value)
        }
        else{
            setIsValidEmail(true)
        }

    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
        setErrorPassword('')
        setError('')
        setSuccess('')


    }
    const validateEmail = (validEmail) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(validEmail))
    }
    const handleLogin = () => {
        if(!email){
            setErrorEmail('Email đang bỏ trống')

        }
        if(!password){
            setErrorPassword('Password đang bỏ trống')
        }
        if(email&&password&&isValidEmail){
            handleClickLogin()
        }

    }
    const handleClickLogin = async() => {
        const loginPayload = {
            email:email,
            password:password,
            role:'sinhvien'
        }
        try{
            const response = await axios.post('http://localhost:8080/api/login', loginPayload)
            sessionStorage.setItem('accessToken', response.data.token)
            setError('')
            navigate('/profile')
            
            

        }catch(error){
            console.log(error)
            setSuccess('')
            if(error.message === 'Network Error'){
                alert('Server không phản hồi')
            }
            else{
                setError('Thông tin tài khoản không chính xác')

            }
            
            
        }
    }
   
    
    
    return (
        <div className='grid'>
            <h1>Login</h1>
            <div className={classNames('grid__row', cx('grid__row'))} >
                <div className={cx('form-login')}>
                    <label className={cx('form-login-label')}>Email</label>
                    <input
                        className={cx('form-login-input')}
                        type="email"
                        placeholder='Nhập vào email...'
                        onChange={handleChangeEmail}
                        value={email}
                    />
                    {!isValidEmail && (
                        <p>Sai định dạng email</p>
                    )}
                    {errorEmail&&(
                        <p>{errorEmail}</p>
                    )}
                    <label className={cx('form-login-label')}>Mật khẩu</label>
                    <input
                        className={cx('form-login-input')}
                        type="password"
                        placeholder='Nhập vào mật khẩu...'
                        onChange={handleChangePassword}
                        value={password}
                    />
                    {errorPassword&&(
                        <p>{errorPassword}</p>
                    )}
                    {error&&(
                        <p>{error}</p>
                    )}
                    {success&&(
                        <p style={{color:'green'}}>{success}</p>
                    )}
                    <button
                        className={cx('form-login-button')}  
                        onClick={handleLogin}
                    >Đăng nhập</button>
                    <Link
                        className={cx('form-login-link')}
                        to='/user/register'

                    >Bạn chưa có tài khoản
                    </Link>
                    
                   
                </div>

            </div>
        </div>
    )
}

export default Login;