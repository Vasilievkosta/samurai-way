import React from 'react'
import { connect } from 'react-redux'
import { ActionType, AppStateType } from 'redux/redux-store'
import {
    InitialStateUsersType,
    ResponseItemType,
    followedUserAC,
    setCurrentPageAC,
    setTotalCountAC,
    setUsersAC,
    unfollowedUserAC,
} from 'redux/users-reducer'
import UsersC from './UsersC'

type MapStatePropsType = {
    users: ResponseItemType[]
    totalCount: number
    pageSize: number
    currentPage: number
}

type MapDispatchPropsType = {
    setUsers: (users: ResponseItemType[]) => void
    follow: (id: number | string) => void
    unfollow: (id: number | string) => void
    setTotalCount: (totalCount: number) => void
    setCurrentPage: (currentPage: number) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        totalCount: state.usersPage.totalCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
    }
}

let mapDispatchToProps = (dispatch: (action: ActionType) => void): MapDispatchPropsType => {
    return {
        setUsers: (users: ResponseItemType[]) => {
            dispatch(setUsersAC(users))
        },
        follow: (id: number | string) => {
            dispatch(followedUserAC(id))
        },
        unfollow: (id: number | string) => {
            dispatch(unfollowedUserAC(id))
        },
        setTotalCount: (totalCount: number) => {
            dispatch(setTotalCountAC(totalCount))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        },
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC)

export default UsersContainer
