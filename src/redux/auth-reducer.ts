import { getMe, login, logout } from 'api/api'
import { ActionType, AppThunkDispatch } from './redux-store'
import { Dispatch } from 'redux'

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
    return (dispatch: Dispatch<ActionType>) => {
        getMe().then((data) => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(data.data))
            }
        })
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: AppThunkDispatch) => {
        login(email, password, rememberMe).then((data) => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        })
    }
}

export const logoutTC = () => {
    return (dispatch: Dispatch<ActionType>) => {
        logout().then((data) => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(initialState.data))
                dispatch(setLogout())
            }
        })
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
