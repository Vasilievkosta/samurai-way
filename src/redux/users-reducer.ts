import { deleteFollow, getUsers, postFollow } from 'api/api'
import { ActionType } from './redux-store'
import { Dispatch } from 'redux'

const initialState = {
    users: [] as ResponseItemType[],
    totalCount: 0,
    pageSize: 100,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as any,
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

        case 'SET-FOLLOWING-PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id]
                    : [state.followingInProgress.filter((id: number) => id !== action.id)],
            }

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

export const setFollowingInProgress = (isFetching: boolean, id: number) =>
    ({ type: 'SET-FOLLOWING-PROGRESS', isFetching, id } as const)

export const getUsersTC = (currentPage: number, pageSize: number) => {
    return async (dispatch: Dispatch<ActionType>) => {
        dispatch(setIsFetching(true))

        let data = await getUsers(currentPage, pageSize)
        dispatch(setUsers(data.items))
        dispatch(setTotalCount(data.totalCount))
        dispatch(setIsFetching(false))
    }
}

export const unfollowTC = (userId: number) => {
    return async (dispatch: Dispatch<ActionType>) => {
        dispatch(setFollowingInProgress(true, userId))

        let data = await deleteFollow(userId)
        if (data.resultCode === 0) {
            dispatch(unfollow(userId))
            dispatch(setFollowingInProgress(false, userId))
        }
    }
}

export const followTC = (userId: number) => {
    return async (dispatch: Dispatch<ActionType>) => {
        dispatch(setFollowingInProgress(true, userId))

        let data = await postFollow(userId)
        if (data.resultCode === 0) {
            dispatch(follow(userId))
            dispatch(setFollowingInProgress(false, userId))
        }
    }
}

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
