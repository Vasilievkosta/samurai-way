import { NavLink } from 'react-router-dom'

export type DialogType = {
	name: string,
	id: string
}

export const DialogItem = (props: DialogType) => {
	const path = `/dialogs/${props.id}`
	return (
		<div className="dialog">
			<NavLink to={path}>{props.name}</NavLink>
		</div >
	)
}
