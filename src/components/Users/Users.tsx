import React from 'react'
import s from './Users.module.css'
import { ResponseItemType } from 'redux/users-reducer'
import { NavLink } from 'react-router-dom'
import fotoGirl from '../../photo/avaGirl-1.jpg'

type PropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    follow: (id: number | string) => void
    unfollow: (id: number | string) => void
    onPageChange: (id: number) => void
    users: ResponseItemType[]
}

const Users = (props: PropsType) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize / 50)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <p>{props.totalCount}</p>
            <span>{pagesCount * 50}</span>
            <p>{props.currentPage}</p>

            <div className={s.count}>
                {pages.map((p) => {
                    return (
                        <span
                            className={props.currentPage === p ? s.selectedPage : ''}
                            onClick={() => props.onPageChange(p)}
                        >
                            {p}
                        </span>
                    )
                })}
            </div>
            <ul className={s.list}>
                {props.users.map((u) => {
                    return (
                        <li className={s.item} key={u.id}>
                            <div className={s.follow}>
                                <NavLink to={'/profile/' + u.id}>
                                    <img
                                        className={s.photo}
                                        src={
                                            u.photos.small
                                                ? u.photos.small
                                                : // 'https://img.freepik.com/free-photo/medium-shot-man-with-afro-hairstyle_23-2150677170.jpg?size=626&ext=jpg&ga=GA1.2.1895128746.1689229530&semt=sph'
                                                  fotoGirl
                                        }
                                    />
                                </NavLink>

                                {u.followed ? (
                                    <button onClick={() => props.unfollow(u.id)}>unfollow</button>
                                ) : (
                                    <button onClick={() => props.follow(u.id)}>follow</button>
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
