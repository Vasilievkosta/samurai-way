import Preloader from 'components/common/Preloader/Preloader'
import { PropsType } from '../Profile'
import foto from 'assets/photo/avaGirl-1.jpg'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
import React, { ChangeEvent } from 'react'
import { ResponseGetProfileType } from 'redux/profile-reducer'
import { ProfileDataReduxForm } from './ProfileDataForm'
import { Modal } from 'components/common/Modal/Modal'

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
        <div className={s.profile}>
            <div>
                <b>My status</b>:<ProfileStatus status={status} updateStatus={updateStatus} />
            </div>

            <div className={s.description}>
                <div>
                    <img src={profile.photos.large || foto} alt="Profile" />
                    {isOwner && <input className={s.editFoto} type="file" onChange={onMainPhotoSelected} />}
                </div>

                <div>
                    {editMode ? (
                        <Modal active={editMode} setActive={setEditMode}>
                            <ProfileDataReduxForm initialValues={profile} onSubmit={onSubmit} />
                        </Modal>
                    ) : (
                        <ProfileData {...profile} isOwner={isOwner} goToEdimMode={goToEdimMode} />
                    )}
                </div>
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
            <div className={s.about}>
                <ul className={s.list}>
                    <li>
                        Full name: <span className={s.name}>{fullName} </span>
                    </li>
                    <li>
                        <b>About me: </b>
                        <span>{aboutMe}</span>
                    </li>
                    <li>
                        My skills: <span>{lookingForAJobDescription}</span>
                    </li>
                    <li>
                        Looking for a job: <span>{lookingForAJob ? 'yes' : 'no'}</span>
                    </li>
                </ul>

                <div className={s.contact}>
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
            {isOwner && (
                <div>
                    <button className="btn" onClick={goToEdimMode}>
                        edit profile
                    </button>
                </div>
            )}
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
