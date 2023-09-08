import React from 'react'
import { UsersPropsType } from './UsersContainer'
import s from './Users.module.css'
import axios, { AxiosResponse } from 'axios'
import { ResponseGetUserType, ResponseItemType } from 'redux/users-reducer'

class UsersC extends React.Component<UsersPropsType> {
    componentDidMount() {
        axios
            .get<ResponseGetUserType>(
                `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
            )
            .then((res) => {
                this.props.setUsers(res.data.items)
                console.log(res.data)
                console.log(res.data.totalCount)
                this.props.setTotalCount(res.data.totalCount)
            })
    }

    onPageChange = (pageNumber: number): void => {
        this.props.setCurrentPage(pageNumber)
        axios
            .get<ResponseGetUserType>(
                `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
            )
            .then((res) => {
                this.props.setUsers(res.data.items)
            })
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize / 10)

        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        console.log(pages)
        console.log(pagesCount)

        return (
            <div>
                <p>{this.props.totalCount}</p>
                <p>{this.props.currentPage}</p>
                <div className={s.count}>
                    {pages.map((p) => {
                        return (
                            <span
                                className={this.props.currentPage === p ? s.selectedPage : ''}
                                onClick={() => this.onPageChange(p)}
                            >
                                {p}
                            </span>
                        )
                    })}
                </div>
                <ul className={s.list}>
                    {this.props.users.map((u) => {
                        return (
                            <li className={s.item} key={u.id}>
                                <div className={s.follow}>
                                    <img
                                        className={s.photo}
                                        src={
                                            u.photos.small
                                                ? u.photos.small
                                                : 'https://img.freepik.com/free-photo/medium-shot-man-with-afro-hairstyle_23-2150677170.jpg?size=626&ext=jpg&ga=GA1.2.1895128746.1689229530&semt=sph'
                                        }
                                    />
                                    {u.followed ? (
                                        <button onClick={() => this.props.unfollow(u.id)}>unfollow</button>
                                    ) : (
                                        <button onClick={() => this.props.follow(u.id)}>follow</button>
                                    )}
                                </div>
                                <div className={s.description}>
                                    <div className={s.about}>
                                        <p>{u.name}</p>
                                        <p>{u.status}</p>
                                    </div>
                                    <div className={s.address}>
                                        <p>{'u.location.city'}</p>
                                        <p>{'u.location.country'}</p>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default UsersC
