import { PostType } from 'components/Profile/MyPosts/Post/Post';
import { DialogType, MessageType } from 'components/Dialogs/Dialogs';


let rerenderEntireTree = () => {
	console.log('Stare changed')
}

export type stateType = {
	posts: PostType[]
	newPostText: string | undefined
	dialogs: DialogType[]
	messages: MessageType[]
}

export let state: stateType = {
	posts: [
		{ id: '1', message: 'Hi! How are you?', like: 15 },
		{ id: '2', message: 'Welcome!', like: 10 },
		{ id: '3', message: 'Blabla', like: 11 },

	],

	newPostText: 'react.js',

	dialogs: [
		{ name: 'Vincent', id: '1' },
		{ name: 'Nata', id: '2' },
		{ name: 'Billi-Bom', id: '3' },
		{ name: 'Sergio', id: '4' },
	],
	messages: [
		{ id: '1', message: 'Jo' },
		{ id: '2', message: 'Welcome!!' },
		{ id: '3', message: 'How are you?' }
	]
}

export const addPost = (postMessage: string | undefined) => {
	let newPost = {
		id: String(Math.round(Math.random() * 10000)),
		message: postMessage,
		like: 0
	}
	state.posts.push(newPost)
	console.log(newPost)
	state.newPostText = '';
	rerenderEntireTree();
}

export const updateNewPostText = (newText: string | undefined) => {

	state.newPostText = newText
	console.log(newText)
	rerenderEntireTree();
}

export const subscribe = (observer: () => void) => {
	console.log('subscribe')
	rerenderEntireTree = observer;
}

// @ts-ignore
window.state = state;

