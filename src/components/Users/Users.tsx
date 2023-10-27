import React from 'react'
import s from './Users.module.css'
import { ResponseItemType } from 'redux/users-reducer'
import { NavLink } from 'react-router-dom'
import fotoGirl from 'assets/photo/avaGirl-1.jpg'
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
                            <div className={s.follow}>
                                <NavLink to={'/profile/' + u.id}>
                                    <img
                                        className={s.photo}
                                        src={u.photos.small ? u.photos.small : fotoGirl}
                                        alt="foto"
                                    />
                                </NavLink>

                                {u.followed ? (
                                    <button
                                        disabled={props.followingInProgress.some((id) => id === u.id)}
                                        onClick={() => {
                                            props.unfollowTC(u.id)
                                        }}
                                    >
                                        unfollow
                                    </button>
                                ) : (
                                    <button
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

export default Users
