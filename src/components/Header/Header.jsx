import React from 'react';
import s from './Header.module.css'
import imageLogo from '../../photo/rotation.png';

const Header = () => {
	return <header className={s.header}>
		<img src={imageLogo} alt='logo' />
		header
	</header>
}

export default Header;