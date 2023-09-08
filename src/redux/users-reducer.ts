import { ActionType } from './redux-store'

const initialState = {
    users: [] as ResponseItemType[],
    totalCount: 0,
    pageSize: 100,
    currentPage: 2,
}

export type InitialStateUsersType = typeof initialState

const usersReducer = (state = initialState, action: ActionType): InitialStateUsersType => {
    switch (action.type) {
        case 'FOLLOWED':
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.id) {
                        return { ...u, followed: true }
                    }
                    return u
                }),
            }

        case 'UNFOLLOWED':
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.id) {
                        return { ...u, followed: false }
                    }
                    return u
                }),
            }

        case 'SET-USERS':
            return { ...state, users: action.users }

        case 'SET-COUNT':
            return { ...state, totalCount: action.totalCount }

        case 'SET-PAGE':
            return { ...state, currentPage: action.currentPage }

        default:
            return state
    }
}

export const followedUserAC = (id: string | number) => ({ type: 'FOLLOWED', id } as const)

export const unfollowedUserAC = (id: string | number) => ({ type: 'UNFOLLOWED', id } as const)

export const setUsersAC = (users: ResponseItemType[]) => ({ type: 'SET-USERS', users } as const)

export const setTotalCountAC = (totalCount: number) => ({ type: 'SET-COUNT', totalCount } as const)

export const setCurrentPageAC = (currentPage: number) => ({ type: 'SET-PAGE', currentPage } as const)

export default usersReducer

export type ResponseGetUserType = {
    items: ResponseItemType[]
    totalCount: number
    error: string | null
}

export type ResponseItemType = {
    name: string
    id: number
    photos: {
        small: string | null
        large: string | null
    }
    status: null
    followed: boolean
}

//export type UserType = {
//     id: string
//     photoURL: string
//     followed: boolean
//     fullName: string
//     status: string
//     location: { city: string, country: string }
//     name: string
//     id: number | string
//     photos: {
//         small: string | null
//         large: string | null
//     }
//     status: string | null
//     followed: boolean
// }
