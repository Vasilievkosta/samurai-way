import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { PropsType } from 'App';

const Profile = (props: PropsType) => {

	return (
		<div >
			<ProfileInfo />
			<MyPosts posts={props.state.profilePage.posts}
				dispatch={props.dispatch}
				newPostText={props.state.profilePage.newPostText} />
		</div>
	)
}

export default Profile;