import React from 'react'
import { ResponseGetProfileType } from 'redux/profile-reducer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

export type PropsType = {
    profile: ResponseGetProfileType
}

const Profile = (props: PropsType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile
