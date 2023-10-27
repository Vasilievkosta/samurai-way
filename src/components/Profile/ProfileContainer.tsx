import React from 'react'
import Profile from './Profile'
import { ResponseGetProfileType, savePhotoTC, setProfile, setStatus, updateStatusTC } from 'redux/profile-reducer'
import { connect } from 'react-redux'
import { AppStateType } from 'redux/redux-store'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { getProfile, getUserStatus } from 'api/api'
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
        getProfile(userId).then((data) => {
            this.props.setProfile(data)
        })
        getUserStatus(userId).then((data) => {
            this.props.setStatus(data)
        })
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
    setProfile: (profile: ResponseGetProfileType) => void
    setStatus: (userId: string) => void
    updateStatusTC: (status: string) => void
    savePhotoTC: (file: File) => void
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
    connect(mapStateToProps, { setProfile, setStatus, updateStatusTC, savePhotoTC }),
    // withAuthRedirect,
    withRouter
)(ProfileContainer)
