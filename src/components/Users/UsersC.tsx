import React from 'react';
import { UsersPropsType } from './UsersContainer';
import s from './Users.module.css';
import axios, { AxiosResponse } from 'axios'
import { ResponseGetUserType, ResponseItemType } from 'redux/users-reducer';



class UsersC extends React.Component<UsersPropsType> {

	componentDidMount() {
		axios.get<ResponseGetUserType>("https://social-network.samuraijs.com/api/1.0/users")
			.then((res) => {
				this.props.setUsers(res.data.items)
				console.log(res.data.items)
			})
	}


	render() {
		return (
			<div>
				<ul className={s.list}>
					{
						this.props.usersPage.users.map(u => {
							return (
								<li className={s.item} key={u.id}>
									<div className={s.follow}>
										<img className={s.photo} src={u.photos.small ? u.photos.small :
											'https://img.freepik.com/free-photo/medium-shot-man-with-afro-hairstyle_23-2150677170.jpg?size=626&ext=jpg&ga=GA1.2.1895128746.1689229530&semt=sph'} />
										{
											u.followed ? <button onClick={() => this.props.unfollow(u.id)}>unfollow</button>
												: <button onClick={() => this.props.follow(u.id)}>follow</button>
										}

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
						})
					}
				</ul>
			</div >
		);
	}
}

export default UsersC;