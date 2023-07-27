import axios from 'axios'
import styles from './Register.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [error, setError] = useState('')
    const [success,setSuccess] = useState('')
    const [errorPassword, setErrPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorVerificationCode, setErrorVerificationCode] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(true)

    const handleSendVerificationCodes = () => {
        
        if(!email){
            setErrorEmail('Không bỏ trống email')
        }
        else{
            if(isValidEmail){
                handleSendVerificationCode()
            }
        }
    }
    const handleRegisters = (e) => {
        
        if(!verificationCode){
            setErrorVerificationCode('Thiếu mã xác nhận')
        }
        if(!password){
            setErrPassword('Không bỏ trống mật khẩu')
        }
        if(!email){
            
            setErrorEmail('Không bỏ trống email')
        }
        if(verificationCode&&password&&email&&isValidEmail){
            handleRegister()
        }
    }
    const handleSendVerificationCode = async () => {
        const user = {
            email:email
        }
        try{
            const response = await axios.post('http://localhost:8080/api/covan/send-verification-code', user)
           
            setSuccess(response.data)
            setError('')
            
        }catch(error){
            try{
                setError(error.response.data)
                setSuccess('')
            }catch{
                alert('Server die')
            }
           
            
        }
    }
    const handleRegister = async() => {
        const user = {
            email:email,
            password: password,
            verificationCode:verificationCode
        }
        try{
            const response = await axios.post('http://localhost:8080/api/covan/register', user)
            setSuccess(response.data)
            setError('')

        }catch(error){
            if(error.message === 'Network Error'){
                alert('Server không phản hồi')
            }
            else{
                setError(error.response.data)
                setSuccess('')

            } 
        }
    }
    
    const onChangeEmail = (e) => {
        
        setEmail(e.target.value)
        setErrorEmail('')
        setError('')
        setSuccess('')
        if(e.target.value !==''){
            validateEmail(e.target.value)
        }
        else{
            setIsValidEmail(true)
        }
        
        
    }
    const validateEmail = (validEmail) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(validEmail)) 
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
        setErrPassword('')
        setError('')
        setSuccess('')
    }
    const onChangeVerificationCode = (e) => {
        setVerificationCode(e.target.value)
        setErrorVerificationCode('')
        setError('')
        setSuccess('')
        

    }

    return (
        <div className="grid">
            <h1>Register</h1>
            <div className={classNames('grid__row', cx('grid__row'))}>
                <div className={cx('form-register')}>
                    <label className={cx('form-register-label')}>Email</label>
                    <input
                        className={cx('form-register-input')}
                        type="email"
                        placeholder='Nhập vào email...'
                        onChange={onChangeEmail}
                        value={email}
                        
                    />
                    {errorEmail&&(
                        <p >{errorEmail}</p>
                    )}
                    {!isValidEmail && (
                        <p >Sai định dạng email</p>
                       
                    )}
                    
                    
                    <label className={cx('form-register-label')}>Mật khẩu</label>
                    <input
                        className={cx('form-register-input')}
                        type="password"
                        placeholder='Nhập vào mật khẩu...'
                        onChange={onChangePassword}
                        value={password}
                    />
                    {errorPassword&&(
                        <p >{errorPassword}</p>
                    )}
                    <label className={cx('form-register-label')}>Mã xác minh</label>
                    <input
                        className={cx('form-register-input')}
                        type='text'
                        placeholder='Nhập mã xác minh'
                        onChange={onChangeVerificationCode}
                        value={verificationCode}
                    />
                    {errorVerificationCode&&(
                        <p >{errorVerificationCode}</p>
                    )}
                    {error&&(
                        <p >{error}</p>

                    )}
                    {success&&(
                        <p style={{color:'green'}}>{success}</p>
                    )}
                    
                    <button
                        className={cx('form-register-button')}
                        style={{backgroundColor:'orange'}}
                        onClick={handleSendVerificationCodes}
                    >Nhận mã xác minh
                    </button><br/>
                    <button
                        className={cx('form-register-button')}
                        onClick={handleRegisters}
                    >Đăng ký</button>
                    <Link
                        className={cx('form-register-link')}
                        to='/covan/login'

                    >Bạn đã có tài khoản
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Register;