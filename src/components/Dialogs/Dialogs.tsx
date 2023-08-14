
import s from './Dialogs.module.css'
import { ChangeEvent } from 'react'
import { DialogItem } from './DialogItem'
import { MessageItem } from './MessageItem'
import { DialogsType } from './DialogsContainer'

const Dialogs = (props: DialogsType) => {

	const callbackChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
		props.changeMessageHandler(e.currentTarget.value)
	}
	const callbackSendMessage = () => {
		props.sendMessageHandler()
	}
	return (
		<div className={s.wrap}>
			<div className={s.dialogs}>
				{
					props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id} />)
				}
			</div>
			<ul className={s.messages}>
				{
					props.dialogsPage.messages.map(m => <MessageItem message={m.message} key={m.id} />)
				}
			</ul>
			<div>
				<textarea value={props.dialogsPage.newMessageBody} onChange={callbackChangeMessage}></textarea>
				<button onClick={callbackSendMessage}>Send</button>
			</div>
		</div>
	)
}

export default Dialogs;