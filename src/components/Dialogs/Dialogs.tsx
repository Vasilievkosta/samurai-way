
import { NavLink } from 'react-router-dom'
import s from './Dialogs.module.css'
import { ChangeEvent } from 'react'
import { ActionType, changedNewMessageAC, sendMessageAC } from 'redux/state'

export type DialogType = {
	name: string,
	id: string
}
export type MessageType = {
	id?: string,
	message: string
}

const DialogItem = (props: DialogType) => {
	const path = `/dialogs/${props.id}`
	return (
		<div className="dialog">
			<NavLink to={path}>{props.name}</NavLink>
		</div >
	)
}

const MessageItem = (props: MessageType) => {
	return <li className="message">{props.message}</li >
}

type DialogPropsType = {
	dialogs: DialogType[],
	messages: MessageType[]
	newMessageBody: string
	dispatch: (action: ActionType) => void
}

const Dialogs = (props: DialogPropsType) => {

	const changeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		props.dispatch(changedNewMessageAC(e.currentTarget.value))
	}
	const sendMessageHandler = () => {
		props.dispatch(sendMessageAC())
	}
	return (
		<div className={s.wrap}>
			<div className={s.dialogs}>
				{
					props.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id} />)
				}
			</div>
			<ul className={s.messages}>
				{
					props.messages.map(m => <MessageItem message={m.message} key={m.id} />)
				}
			</ul>
			<div>
				<textarea value={props.newMessageBody} onChange={changeMessageHandler}></textarea>
				<button onClick={sendMessageHandler}>Send</button>
			</div>
		</div>
	)
}

export default Dialogs;