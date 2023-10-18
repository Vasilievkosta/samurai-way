import Preloader from 'components/common/Preloader/Preloader'
import { PropsType } from '../Profile'
import fotoGirl from '../../../photo/avaGirl-1.jpg'
import ProfileStatus from './ProfileStatus'

const ProfileInfo = (props: PropsType) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus} />

            <div className="description">
                <img src={props.profile?.photos.large ? props.profile.photos.large : fotoGirl} alt="Profile" />
                <p>{props.profile.fullName}</p>
            </div>
        </div>
    )
}

export default ProfileInfo
