import Dialogs from './Dialogs'
import { ActionType, AppStateType } from 'redux/redux-store'
import { connect } from 'react-redux'
import { InitialStateDialogsType, sendMessageAC } from 'redux/dialogs-reducer'
import { withAuthRedirect } from 'hoc/withAuthRedirect'
import { compose } from 'redux'

type MapStatePropsType = {
    dialogsPage: InitialStateDialogsType
}

type MapDispatchPropsType = {
    sendMessageHandler: (newMessage: string) => void
}

export type DialogsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch: (action: ActionType) => void): MapDispatchPropsType => {
    return {
        sendMessageHandler: (newMessage: string) => {
            dispatch(sendMessageAC(newMessage))
        },
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs)
