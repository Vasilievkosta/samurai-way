// import { PostType } from 'components/Profile/MyPosts/Post/Post';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import { AppStateType } from './redux-store';


// export let store: StoreType = {
// 	state: {
// 		profilePage: {
// 			posts: [
// 				{ id: '1', message: 'Hi! How are you?', like: 15 },
// 				{ id: '2', message: 'Welcome!', like: 10 },
// 				{ id: '3', message: 'Blabla', like: 11 },
// 			],
// 			newPostText: 'react.js'
// 		},
// 		dialogsPage: {
// 			dialogs: [
// 				{ name: 'Vincent', id: '1' },
// 				{ name: 'Nata', id: '2' },
// 				{ name: 'Billi-Bom', id: '3' },
// 				{ name: 'Sergio', id: '4' },
// 			],
// 			messages: [
// 				{ id: '1', message: 'Jo' },
// 				{ id: '2', message: 'Welcome!!' },
// 				{ id: '3', message: 'How are you?' }
// 			],
// 			newMessageBody: ''
// 		}
// 	},
// 	_rerenderEntireTree() {
// 		console.log('Stare changed')
// 	},
// 	getState() {
// 		return this._state
// 	},
// 	subscribe(observer) {
// 		console.log('subscribe')
// 		this._rerenderEntireTree = observer;
// 	},
// dispatch(action: ActionType) {
// 	if (action.type === 'ADD-POST') {
// 		let newPost: PostType = {
// 			id: String(new Date().getTime()),
// 			message: this._state.profilePage.newPostText,
// 			like: 0
// 		}
// 		this._state.profilePage.posts.push(newPost)
// 		console.log(newPost)
// 		this._state.profilePage.newPostText = '';
// 		this._rerenderEntireTree();

// 	} else if (action.type === 'CHANGE-TEXT-POST') {
// 		this._state.profilePage.newPostText = action.newText
// 		this._rerenderEntireTree();

// 	} else if (action.type === 'CHANGE-NEW-MESSAGE') {
// 		this._state.dialogsPage.newMessageBody = action.newMessage
// 		this._rerenderEntireTree();

// 	} else if (action.type === 'SEND-MESSAGE') {
// 		let newMessage = {
// 			id: String(new Date().getTime()),
// 			message: this._state.dialogsPage.newMessageBody
// 		}
// 		this._state.dialogsPage.messages.push(newMessage)
// 		this._state.dialogsPage.newMessageBody = ''
// 		this._rerenderEntireTree();
// 	}
// },



// 	dispatch(action: ActionType) {
// 		this._state.profilePage = profileReducer(this._state.profilePage, action);

// 		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
// 		this._rerenderEntireTree();
// 	}
// }



export type ActionType = ReturnType<typeof addPostAC>
	| ReturnType<typeof changedTextPostAC>
	| ReturnType<typeof changedNewMessageAC>
	| ReturnType<typeof sendMessageAC>

export const addPostAC = () => ({ type: 'ADD-POST' }) as const

export const changedTextPostAC = (newText: string | undefined) => {
	return {
		type: 'CHANGE-TEXT-POST',
		newText: newText
	} as const
}

export const sendMessageAC = () => ({ type: 'SEND-MESSAGE' }) as const

export const changedNewMessageAC = (newMessage: string) => {
	return {
		type: 'CHANGE-NEW-MESSAGE',
		newMessage: newMessage
	} as const
}

export type StoreType = {
	_state: AppStateType
	getState: () => AppStateType
	subscribe: (observer: () => void) => void
	_rerenderEntireTree: () => void
	dispatch: (action: ActionType) => void
}


// @ts-ignore
// window.store = store;

