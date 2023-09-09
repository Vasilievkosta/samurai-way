import React from 'react'
import Profile from './Profile'
import axios from 'axios'
import { ResponseGetProfileType, setProfile } from 'redux/profile-reducer'
import { connect } from 'react-redux'
import { AppStateType } from 'redux/redux-store'
import { RouteComponentProps, withRouter } from 'react-router-dom'

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        axios
            .get<ResponseGetProfileType>(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then((res) => {
                this.props.setProfile(res.data)
                console.log(res.data)
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

let WithRouterProfileContainer = withRouter(ProfileContainer)

export default connect(mapStateToProps, { setProfile })(WithRouterProfileContainer)
