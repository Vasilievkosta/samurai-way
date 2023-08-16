import React from 'react';
import { UsersPropsType } from './UsersContainer';
import s from './Users.module.css'

const Users = (props: UsersPropsType) => {


	return (
		<div>
			<ul className={s.list}>
				{
					props.usersPage.users.map(u => {
						return (
							<li className={s.item} key={u.id}>
								<div className={s.follow}>
									<img className={s.photo} src={u.photoURL} />
									{
										u.followed ? <button onClick={() => props.unfollow(u.id)}>unfollow</button>
											: <button onClick={() => props.follow(u.id)}>follow</button>
									}

								</div>
								<div className={s.description}>
									<div className={s.about}>
										<p>{u.fullName}</p>
										<p>{u.status}</p>
									</div>
									<div className={s.address}>
										<p>{u.location.city}</p>
										<p>{u.location.country}</p>
									</div>
								</div>
							</li>
						)
					})
				}
			</ul>
		</div>
	);
}

export default Users;