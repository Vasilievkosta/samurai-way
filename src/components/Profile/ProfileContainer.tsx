import React from 'react'
import Profile from './Profile'
import { ResponseGetProfileType, setProfile, setStatus, updateStatusTC } from 'redux/profile-reducer'
import { connect } from 'react-redux'
import { AppStateType } from 'redux/redux-store'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { getProfile, getUserStatus } from 'api/api'
import { withAuthRedirect } from 'hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '20001'
        }
        getProfile(userId).then((data) => {
            this.props.setProfile(data)
        })
        getUserStatus(userId).then((data) => {
            this.props.setStatus(data)
        })
    }
    render() {
        return (
            <Profile profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatusTC} />
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
}
type MapDispatchPropsType = {
    setProfile: (profile: ResponseGetProfileType) => void
    setStatus: (userId: string) => void
    updateStatusTC: (status: string) => void
}
type ProfilePropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { setProfile, setStatus, updateStatusTC }),
    withAuthRedirect,
    withRouter
)(ProfileContainer)
