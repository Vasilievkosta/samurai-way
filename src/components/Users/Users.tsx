import React from 'react'
import s from './Users.module.css'
import { ResponseItemType } from 'redux/users-reducer'
import { NavLink } from 'react-router-dom'
import Paginator from 'components/Paginator/Paginator'

type PropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChange: (id: number) => void
    users: ResponseItemType[]
    followingInProgress: Array<number>
    followTC: (id: number) => any
    unfollowTC: (id: number) => any
}

export type ResponseFollowType = {
    resultCode: number
    messages: string[]
    data: {}
}

const Users = (props: PropsType) => {
    return (
        <div>
            <Paginator
                totalCount={props.totalCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChange={props.onPageChange}
            />

            <ul className={s.list}>
                {props.users.map((u) => {
                    return (
                        <li className={s.item} key={u.id}>
                            <div className={s.photoLink}>
                                <NavLink to={'/profile/' + u.id}>
                                    {u.photos.small ? (
                                        <img className={s.photo} src={u.photos.small} alt="foto" />
                                    ) : (
                                        <div className={s.avatar}>{u.name.substring(0, 2)}</div>
                                    )}
                                </NavLink>
                            </div>
                            <div className={s.description}>
                                <div className={s.about}>
                                    <p className={s.name}>{u.name}</p>
                                    <span>{u.status}</span>
                                </div>
                                <div>
                                    {u.followed ? (
                                        <button
                                            className="btn"
                                            disabled={props.followingInProgress.some((id) => id === u.id)}
                                            onClick={() => {
                                                props.unfollowTC(u.id)
                                            }}
                                        >
                                            unfollow
                                        </button>
                                    ) : (
                                        <button
                                            className="btn"
                                            disabled={props.followingInProgress.some((id) => id === u.id)}
                                            onClick={() => {
                                                console.log(u.id)
                                                props.followTC(u.id)
                                            }}
                                        >
                                            follow
                                        </button>
                                    )}
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Users
