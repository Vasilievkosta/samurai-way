import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { MyPostType } from './MyPosts/MyPosts';



const Profile = (props: MyPostType) => {
	return (
		<div >
			<ProfileInfo />
			<MyPosts data={props.data} dispatch={props.dispatch} newPostText={props.newPostText} />
		</div>
	)
}

export default Profile;