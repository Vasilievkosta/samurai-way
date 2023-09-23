import React from 'react'
import { connect } from 'react-redux'
import { AppStateType } from 'redux/redux-store'
import { ResponseItemType, followTC, getUsersTC, setCurrentPage, unfollowTC } from 'redux/users-reducer'
import Users from './Users'
import Preloader from 'components/common/Preloader/Preloader'

class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    }

    onPageChange = (pageNumber: number): void => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsersTC(pageNumber * 20, this.props.pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching && <Preloader />}
                <Users
                    totalCount={this.props.totalCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChange={this.onPageChange}
                    users={this.props.users}
                    followingInProgress={this.props.followingInProgress}
                    followTC={this.props.followTC}
                    unfollowTC={this.props.unfollowTC}
                />
            </>
        )
    }
}

type MapStatePropsType = {
    users: ResponseItemType[]
    totalCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

type MapDispatchPropsType = {
    setCurrentPage: (currentPage: number) => void
    getUsersTC: (currentPage: number, pageSize: number) => void
    followTC: (id: number) => void
    unfollowTC: (id: number) => void
}

type UsersPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        totalCount: state.usersPage.totalCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export default connect(mapStateToProps, {
    setCurrentPage,
    getUsersTC,
    followTC,
    unfollowTC,
})(UsersContainer)
