import { ActionType } from './redux-store'

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
            return { ...state, data: action.data }

        default:
            return state
    }
}

export const setAuthUserData = (data: AuthDataType) => ({ type: 'SET-AUTH-USER', data } as const)

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
