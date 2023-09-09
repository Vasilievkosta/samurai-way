import { ActionType } from './redux-store'

const initialState = {
    users: [] as ResponseItemType[],
    totalCount: 0,
    pageSize: 20,
    currentPage: 2,
    isFetching: false,
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

        case 'SET-CURRENT-PAGE':
            return { ...state, currentPage: action.currentPage }
        case 'SET-IS-FETCHING':
            return { ...state, isFetching: action.isFetching }

        default:
            return state
    }
}

export const follow = (id: string | number) => ({ type: 'FOLLOWED', id } as const)

export const unfollow = (id: string | number) => ({ type: 'UNFOLLOWED', id } as const)

export const setUsers = (users: ResponseItemType[]) => ({ type: 'SET-USERS', users } as const)

export const setTotalCount = (totalCount: number) => ({ type: 'SET-COUNT', totalCount } as const)

export const setCurrentPage = (currentPage: number) => ({ type: 'SET-CURRENT-PAGE', currentPage } as const)

export const setIsFetching = (isFetching: boolean) => ({ type: 'SET-IS-FETCHING', isFetching } as const)

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
