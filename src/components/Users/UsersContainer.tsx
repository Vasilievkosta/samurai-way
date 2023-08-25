import React from 'react';
import { connect } from 'react-redux';
import { ActionType, AppStateType } from 'redux/redux-store';
import { InitialStateUsersType, UserType, followedUserAC, setUsersAC, unfollowedUserAC } from 'redux/users-reducer';
import UsersC from './UsersC';

type MapStatePropsType = {
	usersPage: InitialStateUsersType
}

type MapDispatchPropsType = {
	setUsers: (users: UserType[]) => void
	follow: (id: number | string) => void
	unfollow: (id: number | string) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		usersPage: state.usersPage
	}
}

let mapDispatchToProps = (dispatch: (action: ActionType) => void): MapDispatchPropsType => {
	return {
		setUsers: (users: UserType[]) => {
			dispatch(setUsersAC(users))
		},
		follow: (id: number | string) => {
			dispatch(followedUserAC(id))
		},
		unfollow: (id: number | string) => {
			dispatch(unfollowedUserAC(id))
		}
	}
}



const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC)

export default UsersContainer;
