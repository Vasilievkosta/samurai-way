import React from 'react'
import { UsersPropsType } from './UsersContainer'
import s from './Users.module.css'
import axios, { AxiosResponse } from 'axios'
import { ResponseGetUserType, ResponseItemType } from 'redux/users-reducer'

const Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        // props.setUsers([
        // 	{ id: '1', photoURL: 'https://img.freepik.com/free-photo/waist-up-portrait-of-handsome-serious-unshaven-male-keeps-hands-together-dressed-in-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?size=626&ext=jpg&ga=GA1.2.1895128746.1689229530&semt=sph', followed: false, fullName: 'Dimych', status: 'I am a boss', location: { city: 'Minsk', country: 'Belarus' } },
        // 	{ id: '2', photoURL: 'https://img.freepik.com/free-photo/medium-shot-man-with-afro-hairstyle_23-2150677170.jpg?size=626&ext=jpg&ga=GA1.2.1895128746.1689229530&semt=sph', followed: true, fullName: 'Alex', status: 'I am also a boss', location: { city: 'Moscow', country: 'Russia' } },
        // 	{ id: '3', photoURL: 'https://img.freepik.com/free-photo/happy-bearded-young-man-looks-with-joyful-expression-has-friendly-smile-wears-yellow-sweater-and-red-hat_295783-1388.jpg?size=626&ext=jpg&ga=GA1.2.1895128746.1689229530&semt=sph', followed: false, fullName: 'Andrew', status: 'I am a Hugo-boss', location: { city: 'Kiev', country: 'Ukraine' } },
        // ])
        axios.get<ResponseGetUserType>('https://social-network.samuraijs.com/api/1.0/users').then((res) => {
            props.setUsers(res.data.items)
        })
    }

    return (
        <div>
            <ul className={s.list}>
                {props.users.map((u) => {
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
