import { PostType } from 'components/Profile/MyPosts/Post/Post';
import { ActionType } from './redux-store';

export type ProfileStateType = {
	posts: PostType[]
	newPostText: string | undefined
}

export let initialState = {
	posts: [
		{ id: '1', message: 'Hi! How are you?', like: 15 },
		{ id: '2', message: 'Welcome!', like: 10 },
		{ id: '3', message: 'Blabla', like: 11 },
	],
	newPostText: 'react.js'
}

const profileReducer = (state: ProfileStateType = initialState, action: ActionType) => {

	switch (action.type) {
		case 'ADD-POST':
			let newPost: PostType = {
				id: String(new Date().getTime()),
				message: state.newPostText,
				like: 0
			}
			state.posts.push(newPost)
			console.log(newPost)
			state.newPostText = '';
			return state;

		case 'CHANGE-TEXT-POST':
			state.newPostText = action.newText
			console.log(action.newText)
			return state;

		default:
			return state;
	}
}

export default profileReducer;