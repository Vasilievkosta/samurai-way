import React from 'react'
import s from './Header.module.css'
import sprite from 'assets/images/sprite.svg'
import imageLogo from 'assets/photo/rotation.png'
import { NavLink } from 'react-router-dom'
import { HeaderPropsType } from './HeaderContainer'

const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img src={imageLogo} alt="logo" />

            <div>
                {props.dataAuth.resultCode === 0 ? (
                    <div className={s.login}>
                        <p className={s.loginName}>{props.dataAuth.data.login}</p>

                        <button className={s.btnLogout} onClick={props.logoutTC}>
                            <svg width="32px" height="32px">
                                <use xlinkHref={`${sprite}#logout`} />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <NavLink to={'/login'}>
                        <p className={s.link}>Login</p>
                    </NavLink>
                )}
            </div>
        </header>
    )
}

export default Header
