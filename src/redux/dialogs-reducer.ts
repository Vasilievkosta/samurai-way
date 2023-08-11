import { DialogType, MessageType } from 'components/Dialogs/Dialogs';
import { ActionType } from './redux-store';

export type DialogsStateType = {
	dialogs: DialogType[]
	messages: MessageType[]
	newMessageBody: string
}

export let initialState = {
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

const dialogsReducer = (state: DialogsStateType = initialState, action: ActionType) => {
	switch (action.type) {
		case 'SEND-MESSAGE':
			let newMessage = {
				id: String(new Date().getTime()),
				message: state.newMessageBody
			}
			state.messages.push(newMessage)
			state.newMessageBody = ''
			return state;

		case 'CHANGE-NEW-MESSAGE':
			state.newMessageBody = action.newMessage
			return state;

		default:
			return state;
	}
}

export default dialogsReducer;