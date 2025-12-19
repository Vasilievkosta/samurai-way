import { getCaptchaUrl, getMe, login, logout } from 'api/api'
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
        token: 'token',
    },
    captcha: {
        url: '',
    },
}

export type InitialStateAuthType = typeof initialState

const authReducer = (state = initialState, action: ActionType): InitialStateAuthType => {
    switch (action.type) {
        case 'SET-AUTH-USER':
            return { ...state, data: action.data, resultCode: 0 }

        case 'SET-LOGOUT':
            return { ...state, resultCode: 1 }

        case 'GET-CAPTCHA':
            return { ...state, captcha: { url: action.url } }

        default:
            return state
    }
}

export const setAuthUserData = (data: AuthDataType) => ({ type: 'SET-AUTH-USER', data } as const)

export const setLogout = () => ({ type: 'SET-LOGOUT' } as const)

export const getCaptchaSuccess = (url: string) => ({ type: 'GET-CAPTCHA', url } as const)

export const getAuthUserData = () => {
    return async (dispatch: Dispatch<ActionType>) => {
        return getMe().then((data) => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(data.data))
            }
        })
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: AppThunkDispatch) => {
        let data = await login(email, password, rememberMe, captcha)

        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
            localStorage.setItem('auth-token', data.data.token)
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaTC())
            }
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
            localStorage.removeItem('auth-token')

            dispatch(setLogout())
        }
    }
}

export const getCaptchaTC = () => {
    return async (dispatch: Dispatch<ActionType>) => {
        let data = await getCaptchaUrl()
        dispatch(getCaptchaSuccess(data.url))
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
    token: string
}
