import { InitialStateProfileType } from 'redux/profile-reducer'
import { ActionType, AppStateType, addPostAC, changedTextPostAC } from 'redux/redux-store'
import MyPosts from './MyPosts'
import { connect } from 'react-redux';

type MapStatePropsType = {
	profilePage: InitialStateProfileType
}

type MapDispatchPropsType = {
	handleMessageChange: (text: string | undefined) => void
	handleButtonClick: () => void
}

export type MyPostType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		profilePage: state.profilePage
	}
}

const mapDispatchToProps = (dispatch: (action: ActionType) => void): MapDispatchPropsType => {
	return {
		handleMessageChange: (text: string | undefined) => {
			dispatch(changedTextPostAC(text))
		},
		handleButtonClick: () => {
			dispatch(addPostAC())
		}
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;