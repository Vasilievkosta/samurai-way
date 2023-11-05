import Preloader from 'components/common/Preloader/Preloader'
import { PropsType } from '../Profile'
import foto from 'assets/photo/avaGirl-1.jpg'
import ProfileStatus from './ProfileStatus'
import React, { ChangeEvent } from 'react'
import { ResponseGetProfileType } from 'redux/profile-reducer'
import { ProfileDataReduxForm } from './ProfileDataForm'

const ProfileInfo = (props: PropsType) => {
    const { profile, status, updateStatus, isOwner, savePhoto, saveProfile } = props
    const [editMode, setEditMode] = React.useState(false)

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files?.[0])
        }
    }

    const goToEdimMode = () => {
        setEditMode(true)
    }

    const onSubmit = (profile: ResponseGetProfileType) => {
        saveProfile(profile).then(() => {
            setEditMode(false)
        })
    }

    // const profileData = { contacts: profile.contacts }
    return (
        <div>
            <div>
                <b>My status</b>:<ProfileStatus status={status} updateStatus={updateStatus} />
            </div>

            <div className="description">
                <img src={profile.photos.large || foto} alt="Profile" />
                {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
                {editMode ? (
                    <ProfileDataReduxForm initialValues={profile} onSubmit={onSubmit} />
                ) : (
                    <ProfileData {...profile} isOwner={isOwner} goToEdimMode={goToEdimMode} />
                )}
            </div>
        </div>
    )
}

export default ProfileInfo

type ProfileDataProps = ResponseGetProfileType & {
    isOwner: boolean
    goToEdimMode: () => void
}

const ProfileData: React.FC<ProfileDataProps> = (props) => {
    const { fullName, aboutMe, lookingForAJobDescription, lookingForAJob, contacts, isOwner, goToEdimMode } = props
    return (
        <div>
            {isOwner && (
                <div>
                    <button onClick={goToEdimMode}>edit</button>
                </div>
            )}
            <div>
                <b>Full name</b>:{fullName}
            </div>
            <div>
                <b>About me</b>:{aboutMe}
            </div>
            <div>
                <b>My skills</b>:{lookingForAJobDescription}
            </div>
            <div>
                <b>Looking for a job</b>:{lookingForAJob ? 'yes' : 'no'}
            </div>
            <div>
                Contact:
                {Object.keys(contacts).map((key) => {
                    const contactKey = key as keyof typeof contacts
                    const contactValue = contacts[contactKey]

                    if (contactValue && contactValue.trim() !== '') {
                        return <Contact key={key} contactTitle={key} contactValue={contactValue} />
                    }

                    return null
                })}
            </div>
        </div>
    )
}

type ContactProps = {
    contactTitle: string
    contactValue: string
}

export const Contact = (props: ContactProps) => {
    return (
        <div>
            <b>{props.contactTitle}</b>: {props.contactValue}
        </div>
    )
}
