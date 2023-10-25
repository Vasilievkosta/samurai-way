import { getMe, login, logout } from 'api/api'
import { ActionType, AppThunkDispatch } from './redux-store'
import { Dispatch } from 'redux'
import { stopSubmit } from 'redux-form'

const initialState = {
    resultCode: 1,
    messages: [],
    data: {
        id: 2,
        email: 'blabla@bla.bla',
        login: 'samurai',
    },
}

export type InitialStateAuthType = typeof initialState

const authReducer = (state = initialState, action: ActionType): InitialStateAuthType => {
    switch (action.type) {
        case 'SET-AUTH-USER':
            return { ...state, data: action.data, resultCode: 0 }

        case 'SET-LOGOUT':
            return { ...state, resultCode: 1 }

        default:
            return state
    }
}

export const setAuthUserData = (data: AuthDataType) => ({ type: 'SET-AUTH-USER', data } as const)

export const setLogout = () => ({ type: 'SET-LOGOUT' } as const)

export const getAuthUserData = () => {
    return async (dispatch: Dispatch<ActionType>) => {
        return getMe().then((data) => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(data.data))
            }
        })
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => {
    return async (dispatch: AppThunkDispatch) => {
        let data = await login(email, password, rememberMe)

        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error!'
            let action = stopSubmit('login', { _error: message })
            dispatch(action)
        }
    }
}

export const logoutTC = () => {
    return async (dispatch: Dispatch<ActionType>) => {
        let data = await logout()

        if (data.resultCode === 0) {
            dispatch(setAuthUserData(initialState.data))
            dispatch(setLogout())
        }
    }
}

export default authReducer

export type ResponseAuthType = {
    resultCode: number
    messages: string[]
    data: AuthDataType
}

export type AuthDataType = {
    id: number
    email: string
    login: string
}
