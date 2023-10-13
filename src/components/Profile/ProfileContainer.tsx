import React from 'react'
import Profile from './Profile'
import { ResponseGetProfileType, setProfile } from 'redux/profile-reducer'
import { connect } from 'react-redux'
import { AppStateType } from 'redux/redux-store'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { getProfile } from 'api/api'
import { withAuthRedirect } from 'hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        getProfile(userId).then((data) => {
            this.props.setProfile(data)
        })
    }
    render() {
        return <Profile profile={this.props.profile} />
    }
}

type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

type MapStatePropsType = {
    profile: ResponseGetProfileType
}
type MapDispatchPropsType = {
    setProfile: (profile: ResponseGetProfileType) => void
}
type ProfilePropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { setProfile }),
    withAuthRedirect,
    withRouter
)(ProfileContainer)
