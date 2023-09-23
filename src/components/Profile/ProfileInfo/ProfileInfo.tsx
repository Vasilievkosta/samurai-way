import Preloader from 'components/common/Preloader/Preloader'
import { PropsType } from '../Profile'
import s from './ProfileInfo.module.css'
import fotoGirl from '../../../photo/avaGirl-1.jpg'

const ProfileInfo = (props: PropsType) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <div className={s.photo}>
                <img
                    src="https://media.istockphoto.com/id/844226534/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BB%D0%B8%D1%81%D1%82-%D1%84%D0%BE%D0%BD.jpg?s=612x612&w=0&k=20&c=4mK5lJl8YaMW-7rOME8wQsRvTVzVtJbDUufwgDQ0zN4="
                    alt="foto"
                />
            </div>
            <div className="description">
                <img src={props.profile?.photos.large ? props.profile.photos.large : fotoGirl} alt="Profile" />
                <p>{props.profile.fullName}</p>
            </div>
        </div>
    )
}

export default ProfileInfo
