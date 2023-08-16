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
			return {
				...state,
				posts: [...state.posts, newPost],
				newPostText: ''
			}

		case 'CHANGE-TEXT-POST':
			return { ...state, newPostText: action.newText }


		default:
			return state;
	}
}

export const addPostAC = () => ({ type: 'ADD-POST' }) as const

export const changedTextPostAC = (newText: string | undefined) => {
	return {
		type: 'CHANGE-TEXT-POST',
		newText: newText
	} as const
}

export default profileReducer;