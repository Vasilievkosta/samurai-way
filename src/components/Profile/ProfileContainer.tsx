import React from 'react'
import Profile from './Profile'
import { ResponseGetProfileType, setProfile } from 'redux/profile-reducer'
import { connect } from 'react-redux'
import { AppStateType } from 'redux/redux-store'
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom'
import { getProfile } from 'api/api'

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
        if (this.props.resultCode === 1) return <Redirect to={'/login'} />
        return <Profile profile={this.props.profile} />
    }
}

type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

type MapStatePropsType = {
    profile: ResponseGetProfileType
    resultCode: number
}
type MapDispatchPropsType = {
    setProfile: (profile: ResponseGetProfileType) => void
}
type ProfilePropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        resultCode: state.auth.resultCode,
    }
}

let WithRouterProfileContainer = withRouter(ProfileContainer)

export default connect(mapStateToProps, { setProfile })(WithRouterProfileContainer)
