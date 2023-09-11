import React from 'react'
import { connect } from 'react-redux'
import { AppStateType } from 'redux/redux-store'
import {
    ResponseItemType,
    follow,
    setCurrentPage,
    setIsFetching,
    setTotalCount,
    setUsers,
    unfollow,
} from 'redux/users-reducer'
import Users from './Users'
import Preloader from 'components/common/Preloader/Preloader'
import { getUsers } from 'api/api'

class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.setIsFetching(true)

        getUsers(this.props.currentPage, this.props.pageSize).then((data) => {
            this.props.setUsers(data.items)
            this.props.setTotalCount(data.totalCount)
            this.props.setIsFetching(false)
        })
    }

    onPageChange = (pageNumber: number): void => {
        this.props.setCurrentPage(pageNumber)
        this.props.setIsFetching(true)

        getUsers(pageNumber * 20, this.props.pageSize).then((data) => {
            this.props.setUsers(data.items)
            this.props.setIsFetching(false)
        })
    }

    render() {
        return (
            <>
                {this.props.isFetching && <Preloader />}
                <Users
                    totalCount={this.props.totalCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    onPageChange={this.onPageChange}
                    users={this.props.users}
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
}

type MapDispatchPropsType = {
    setUsers: (users: ResponseItemType[]) => void
    follow: (id: number | string) => void
    unfollow: (id: number | string) => void
    setTotalCount: (totalCount: number) => void
    setCurrentPage: (currentPage: number) => void
    setIsFetching: (isFetching: boolean) => void
}

type UsersPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        totalCount: state.usersPage.totalCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

export default connect(mapStateToProps, { setUsers, follow, unfollow, setTotalCount, setCurrentPage, setIsFetching })(
    UsersContainer
)
