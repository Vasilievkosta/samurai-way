import Preloader from 'components/common/Preloader/Preloader'
import { PropsType } from '../Profile'
import fotoGirl from 'assets/photo/avaGirl-1.jpg'
import ProfileStatus from './ProfileStatus'
import { ChangeEvent } from 'react'

const ProfileInfo = (props: PropsType) => {
    const { profile, status, updateStatus, isOwner, savePhoto } = props

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files?.[0])
        }
    }

    return (
        <div>
            <p>
                <b>My status</b>:<ProfileStatus status={status} updateStatus={updateStatus} />
            </p>

            <div className="description">
                <img src={profile?.photos.large || fotoGirl} alt="Profile" />
                {isOwner && <input type="file" onChange={onMainPhotoSelected} />}

                <p>
                    <b>Full name</b>:{profile.fullName}
                </p>
                <p>
                    <b>My skills</b>:{profile.lookingForAJobDescription}
                </p>
                <p>
                    <b>Looking for a job</b>:{profile.lookingForAJob ? 'yes' : 'no'}
                </p>
            </div>
        </div>
    )
}

export default ProfileInfo
