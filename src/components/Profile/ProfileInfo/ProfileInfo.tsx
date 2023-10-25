import Preloader from 'components/common/Preloader/Preloader'
import { PropsType } from '../Profile'
import fotoGirl from '../../../photo/avaGirl-1.jpg'
import ProfileStatus from './ProfileStatus'

const ProfileInfo = (props: PropsType) => {
    const { profile, status, updateStatus } = props
    if (!profile) {
        return <Preloader />
    }
    return (
        <div>
            <ProfileStatus status={status} updateStatus={updateStatus} />

            <div className="description">
                <img src={profile?.photos.large ? profile.photos.large : fotoGirl} alt="Profile" />
                <p>{profile.fullName}</p>
            </div>
        </div>
    )
}

export default ProfileInfo
