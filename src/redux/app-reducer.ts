import { ActionType, AppThunkDispatch } from './redux-store'
import { getAuthUserData } from './auth-reducer'

const initialState = {
    initialized: false,
}

export type InitialStateAppType = typeof initialState

const appReducer = (state = initialState, action: ActionType): InitialStateAppType => {
    switch (action.type) {
        case 'SET-INITIALIZED':
            return { ...state, initialized: true }

        default:
            return state
    }
}

export const initializedSuccess = () => ({ type: 'SET-INITIALIZED' } as const)

export const initializeApp = () => {
    return (dispatch: AppThunkDispatch) => {
        let promise = dispatch(getAuthUserData())

        Promise.all([promise]).then(() => {
            dispatch(initializedSuccess())
        })
    }
}

export default appReducer
