
import { NavLink } from 'react-router-dom'
import s from './Dialogs.module.css'

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
}

const Dialogs = (props: DialogPropsType) => {

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
		</div>
	)
}

export default Dialogs;