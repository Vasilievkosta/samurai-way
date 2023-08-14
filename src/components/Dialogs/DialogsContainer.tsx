// import { PropsType, RootStateType } from 'App';
import Dialogs from './Dialogs';
import { ActionType, AppStateType, changedNewMessageAC, sendMessageAC } from 'redux/redux-store'
import { connect } from 'react-redux';
import { InitialStateDialogsType } from 'redux/dialogs-reducer';

type MapStatePropsType = {
	dialogsPage: InitialStateDialogsType
}

type MapDispatchPropsType = {
	changeMessageHandler: (text: string) => void
	sendMessageHandler: () => void
}

export type DialogsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		dialogsPage: state.dialogsPage
	}
}

let mapDispatchToProps = (dispatch: (action: ActionType) => void): MapDispatchPropsType => {
	return {
		changeMessageHandler: (text: string) => {
			dispatch(changedNewMessageAC(text))
		},
		sendMessageHandler: () => {
			dispatch(sendMessageAC())
		}
	}
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;