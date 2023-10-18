import { InitialStateProfileType, addPostAC } from 'redux/profile-reducer'
import { ActionType, AppStateType } from 'redux/redux-store'
import MyPosts from './MyPosts'
import { connect } from 'react-redux'

type MapStatePropsType = {
    profilePage: InitialStateProfileType
}

type MapDispatchPropsType = {
    handleButtonClick: (post: string) => void
}

export type MyPostType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profilePage: state.profilePage,
    }
}

const mapDispatchToProps = (dispatch: (action: ActionType) => void): MapDispatchPropsType => {
    return {
        handleButtonClick: (post: string) => {
            dispatch(addPostAC(post))
        },
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
