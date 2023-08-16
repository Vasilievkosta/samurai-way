import { combineReducers, createStore } from 'redux';
import profileReducer, { addPostAC, changedTextPostAC } from './profile-reducer';
import dialogsReducer, { changedNewMessageAC, sendMessageAC } from './dialogs-reducer';
import usersReducer, { followedUserAC, setUsersAC, unfollowedUserAC } from './users-reducer';

export const rootReducer = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

export type ActionType = ReturnType<typeof addPostAC>
	| ReturnType<typeof changedTextPostAC>
	| ReturnType<typeof changedNewMessageAC>
	| ReturnType<typeof sendMessageAC>
	| ReturnType<typeof followedUserAC>
	| ReturnType<typeof unfollowedUserAC>
	| ReturnType<typeof setUsersAC>
