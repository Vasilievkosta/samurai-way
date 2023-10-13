// import { PropsType, RootStateType } from 'App';
import Dialogs from './Dialogs'
import { ActionType, AppStateType } from 'redux/redux-store'
import { connect } from 'react-redux'
import { InitialStateDialogsType, changedNewMessageAC, sendMessageAC } from 'redux/dialogs-reducer'
import { withAuthRedirect } from 'hoc/withAuthRedirect'
import { compose } from 'redux'

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
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch: (action: ActionType) => void): MapDispatchPropsType => {
    return {
        changeMessageHandler: (text: string) => {
            dispatch(changedNewMessageAC(text))
        },
        sendMessageHandler: () => {
            dispatch(sendMessageAC())
        },
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs)
