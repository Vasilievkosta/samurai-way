
export type MessageType = {
	id?: string,
	message: string
}

export const MessageItem = (props: MessageType) => {
	return <li className="message">{props.message}</li >
}