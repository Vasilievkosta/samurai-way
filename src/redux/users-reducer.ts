
import { ActionType } from './redux-store';

export type UserType = {
	// id: string
	// photoURL: string
	// followed: boolean
	// fullName: string
	// status: string
	// location: { city: string, country: string }
	"name": string
	"id": number | string
	"photos": {
		"small": string | null
		"large": string | null
	},
	"status": string | null
	"followed": boolean
}

const initialState = {
	users: [
		// { id: '1', photoURL: 'https://img.freepik.com/free-photo/waist-up-portrait-of-handsome-serious-unshaven-male-keeps-hands-together-dressed-in-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?size=626&ext=jpg&ga=GA1.2.1895128746.1689229530&semt=sph', followed: false, fullName: 'Dimych', status: 'I am a boss', location: { city: 'Minsk', country: 'Belarus' } },
		// { id: '2', photoURL: 'https://img.freepik.com/free-photo/medium-shot-man-with-afro-hairstyle_23-2150677170.jpg?size=626&ext=jpg&ga=GA1.2.1895128746.1689229530&semt=sph', followed: true, fullName: 'Alex', status: 'I am also a boss', location: { city: 'Moscow', country: 'Russia' } },
		// { id: '3', photoURL: 'https://img.freepik.com/free-photo/happy-bearded-young-man-looks-with-joyful-expression-has-friendly-smile-wears-yellow-sweater-and-red-hat_295783-1388.jpg?size=626&ext=jpg&ga=GA1.2.1895128746.1689229530&semt=sph', followed: false, fullName: 'Andrew', status: 'I am a Hugo-boss', location: { city: 'Kiev', country: 'Ukraine' } },
	] as UserType[]
}

export type InitialStateUsersType = typeof initialState

const usersReducer = (state = initialState, action: ActionType): InitialStateUsersType => {

	switch (action.type) {
		case 'FOLLOWED':
			return {
				...state, users: state.users.map(u => {
					if (u.id === action.id) {
						return { ...u, followed: true }
					}
					return u
				})
			}

		case 'UNFOLLOWED':
			return {
				...state, users: state.users.map(u => {
					if (u.id === action.id) {
						return { ...u, followed: false }
					}
					return u
				})
			}
		case 'SET-USERS':
			return { ...state, users: [...state.users, ...action.users] }


		default:
			return state;
	}
}

export const followedUserAC = (id: string | number) => ({ type: 'FOLLOWED', id }) as const

export const unfollowedUserAC = (id: string | number) => ({ type: 'UNFOLLOWED', id }) as const

export const setUsersAC = (users: UserType[]) => ({ type: 'SET-USERS', users }) as const


export default usersReducer;

export type ResponseGetUserType = {
	"items": ResponseItemType[]
	"totalCount": number,
	"error": string | null
}

export type ResponseItemType = {
	"name": string
	"id": number
	"photos": {
		"small": string | null
		"large": string | null
	},
	"status": null
	"followed": boolean
}