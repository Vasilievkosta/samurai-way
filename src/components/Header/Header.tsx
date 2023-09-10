import React from 'react'
import s from './Header.module.css'
import imageLogo from '../../photo/rotation.png'
import { NavLink } from 'react-router-dom'
import { AuthDataType, ResponseAuthType } from 'redux/auth-reducer'

type PropsType = {
    dataAuth: ResponseAuthType
    setAuthUserData: (data: AuthDataType) => void
}

const Header = (props: PropsType) => {
    console.log(props)
    return (
        <header className={s.header}>
            <img src={imageLogo} alt="logo" />

            <div className={s.login}>
                {props.dataAuth.resultCode === 0 ? props.dataAuth.data.login : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header
