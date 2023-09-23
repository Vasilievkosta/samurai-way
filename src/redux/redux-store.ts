import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'

import profileReducer, { addPostAC, changedTextPostAC, setProfile } from './profile-reducer'
import dialogsReducer, { changedNewMessageAC, sendMessageAC } from './dialogs-reducer'
import usersReducer, {
    follow,
    setCurrentPage,
    setFollowingInProgress,
    setIsFetching,
    setTotalCount,
    setUsers,
    unfollow,
} from './users-reducer'

import authReducer, { setAuthUserData } from './auth-reducer'

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

export type ActionType =
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof changedTextPostAC>
    | ReturnType<typeof setProfile>
    | ReturnType<typeof changedNewMessageAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setTotalCount>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setIsFetching>
    | ReturnType<typeof setFollowingInProgress>
    | ReturnType<typeof setAuthUserData>

// @ts-ignore
window.store = store
