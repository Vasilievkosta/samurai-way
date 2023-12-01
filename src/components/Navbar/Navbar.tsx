import { NavLink } from 'react-router-dom'
import s from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <ul className={s.list}>
                <li>
                    <NavLink to="/profile" activeClassName={s.activeLink}>
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dialogs" activeClassName={s.activeLink}>
                        Messages
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users" activeClassName={s.activeLink}>
                        Users
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/music" activeClassName={s.activeLink}>
                        Music
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/settings" activeClassName={s.activeLink}>
                        Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
