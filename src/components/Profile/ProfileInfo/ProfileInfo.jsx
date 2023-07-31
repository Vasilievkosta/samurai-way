
import s from './ProfileInfo.module.css'


const ProfileInfo = () => {
	return (
		<div >
			<div className={s.photo}>
				<img src='https://media.istockphoto.com/id/844226534/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BB%D0%B8%D1%81%D1%82-%D1%84%D0%BE%D0%BD.jpg?s=612x612&w=0&k=20&c=4mK5lJl8YaMW-7rOME8wQsRvTVzVtJbDUufwgDQ0zN4=' alt='foto' />
			</div>
			<div className="description">
				ava + description
			</div>
		</div>
	)
}

export default ProfileInfo;