import { combineReducers, createStore } from 'redux'
import profileReducer, { addPostAC, changedTextPostAC, setProfile } from './profile-reducer'
import dialogsReducer, { changedNewMessageAC, sendMessageAC } from './dialogs-reducer'
import usersReducer, { follow, setCurrentPage, setIsFetching, setTotalCount, setUsers, unfollow } from './users-reducer'

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

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
// @ts-ignore
window.store = store
