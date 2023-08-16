import { DialogType } from 'components/Dialogs/DialogItem';
import { MessageType } from 'components/Dialogs/MessageItem';
import { ActionType } from './redux-store';

export type InitialStateDialogsType = {
	dialogs: DialogType[]
	messages: MessageType[]
	newMessageBody: string
}

const initialState = {
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
	],

	newMessageBody: ''
}

const dialogsReducer = (state: InitialStateDialogsType = initialState, action: ActionType): InitialStateDialogsType => {
	switch (action.type) {
		case 'SEND-MESSAGE':
			let newMessage = {
				id: String(new Date().getTime()),
				message: state.newMessageBody
			}
			return {
				...state,
				messages: [...state.messages, newMessage],
				newMessageBody: ''
			};

		case 'CHANGE-NEW-MESSAGE':
			return { ...state, newMessageBody: action.newMessage }


		default:
			return state;
	}
}

export const sendMessageAC = () => ({ type: 'SEND-MESSAGE' }) as const

export const changedNewMessageAC = (newMessage: string) => {
	return {
		type: 'CHANGE-NEW-MESSAGE',
		newMessage: newMessage
	} as const
}

export default dialogsReducer;