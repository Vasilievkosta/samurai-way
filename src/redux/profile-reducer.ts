import { PostType } from 'components/Profile/MyPosts/Post/Post';
import { ActionType } from './redux-store';

export type InitialStateProfileType = {
	posts: PostType[]
	newPostText: string | undefined
}

const initialState: InitialStateProfileType = {
	posts: [
		{ id: '1', message: 'Hi! How are you?', like: 15 },
		{ id: '2', message: 'Welcome!', like: 10 },
		{ id: '3', message: 'Blabla', like: 11 },
	],
	newPostText: 'react.js'
}

const profileReducer = (state: InitialStateProfileType = initialState, action: ActionType): InitialStateProfileType => {

	switch (action.type) {
		case 'ADD-POST':
			let newPost: PostType = {
				id: String(new Date().getTime()),
				message: state.newPostText,
				like: 0
			}
			let copyState = { ...state, posts: state.posts.map(m => m) }
			copyState.posts.push(newPost)
			console.log(newPost)
			copyState.newPostText = '';
			return copyState;

		case 'CHANGE-TEXT-POST':
			let newState = { ...state }
			newState.newPostText = action.newText
			console.log(action.newText)
			return newState;

		default:
			return state;
	}
}

export default profileReducer;