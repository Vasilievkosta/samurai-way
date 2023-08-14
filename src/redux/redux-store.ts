import { combineReducers, createStore } from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';

export const rootReducer = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);



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