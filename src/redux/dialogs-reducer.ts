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
			let copyState = {
				...state,
				dialogs: state.dialogs.map(d => { return { ...d } }),
				messages: state.messages.map(m => { return { ...m } })
			};
			copyState.messages.push(newMessage)
			copyState.newMessageBody = ''
			return copyState;

		case 'CHANGE-NEW-MESSAGE':
			let newState = { ...state }
			newState.newMessageBody = action.newMessage
			return newState;

		default:
			return state;
	}
}

export default dialogsReducer;