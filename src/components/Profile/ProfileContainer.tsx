import React from 'react'
import Profile from './Profile'
import {
    ResponseGetProfileType,
    getProfileTC,
    getStatusTC,
    savePhotoTC,
    saveProfileTC,
    updateStatusTC,
} from 'redux/profile-reducer'
import { connect } from 'react-redux'
import { AppStateType } from 'redux/redux-store'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { compose } from 'redux'

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId

        if (!userId) {
            userId = String(this.props.authorizedUserId)
            if (userId === '2') {
                this.props.history.push('/login')
            }
        }
        this.props.getProfileTC(userId)
        this.props.getStatusTC(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any): void {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatusTC}
                isOwner={!this.props.match.params.userId}
                savePhoto={this.props.savePhotoTC}
                saveProfile={this.props.saveProfileTC}
            />
        )
    }
}

type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

type MapStatePropsType = {
    profile: ResponseGetProfileType
    status: string
    authorizedUserId: number
    isAuth: boolean
}
type MapDispatchPropsType = {
    getProfileTC: (userId: string) => void
    getStatusTC: (userId: string) => void
    updateStatusTC: (status: string) => void
    savePhotoTC: (file: File) => void
    saveProfileTC: (newProfile: ResponseGetProfileType) => Promise<string>
}
type ProfilePropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.data.id,
        isAuth: state.auth.resultCode === 0,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getProfileTC, getStatusTC, updateStatusTC, savePhotoTC, saveProfileTC }),
    withRouter
)(ProfileContainer)
