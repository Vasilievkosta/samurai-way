import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'

import profileReducer, {
    addPostAC,
    setStatus,
    setProfile,
    savePhotoSuccess,
    saveProfileSuccess,
} from './profile-reducer'
import dialogsReducer, { sendMessageAC } from './dialogs-reducer'
import usersReducer, {
    follow,
    setCurrentPage,
    setFollowingInProgress,
    setIsFetching,
    setTotalCount,
    setUsers,
    unfollow,
} from './users-reducer'

import authReducer, { getCaptchaSuccess, setAuthUserData, setLogout } from './auth-reducer'
import { reducer as formReducer } from 'redux-form'
import appReducer, { initializedSuccess } from './app-reducer'

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

export type ActionType =
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof setProfile>
    | ReturnType<typeof saveProfileSuccess>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof savePhotoSuccess>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setTotalCount>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setIsFetching>
    | ReturnType<typeof setFollowingInProgress>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setLogout>
    | ReturnType<typeof initializedSuccess>
    | ReturnType<typeof getCaptchaSuccess>

// @ts-ignore
window.store = store
