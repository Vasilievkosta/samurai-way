import { PostType } from 'components/Profile/MyPosts/Post/Post'
import { ActionType } from './redux-store'
import { updateUserStatus } from 'api/api'
import { Dispatch } from 'redux'

export type InitialStateProfileType = {
    posts: PostType[]
    profile: ResponseGetProfileType
    status: string
}

const initialResponseGetProfile = {
    userId: 2,
    lookingForAJob: true,
    lookingForAJobDescription: '',
    fullName: '',
    contacts: {
        github: '',
        vk: '',
        facebook: '',
        instagram: '',
        twitter: '',
        website: '',
        youtube: '',
        mainLink: '',
    },
    photos: {
        small: null,
        large: null,
    },
}

const initialState = {
    posts: [
        { id: '1', message: 'Hi! How are you?', like: 15 },
        { id: '2', message: 'Welcome!', like: 10 },
        { id: '3', message: 'Blabla', like: 11 },
    ],
    profile: initialResponseGetProfile,
    status: 'my status!',
}

const profileReducer = (state: InitialStateProfileType = initialState, action: ActionType): InitialStateProfileType => {
    switch (action.type) {
        case 'ADD-POST':
            let newPost: PostType = {
                id: String(new Date().getTime()),
                message: action.newText,
                like: 0,
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }

        case 'SET-PROFILE':
            return { ...state, profile: action.profile }

        case 'SET-STATUS':
            return { ...state, status: action.status }

        default:
            return state
    }
}

export const addPostAC = (newText: string) => {
    return {
        type: 'ADD-POST',
        newText: newText,
    } as const
}

export const setProfile = (profile: ResponseGetProfileType) => {
    return {
        type: 'SET-PROFILE',
        profile,
    } as const
}

export const setStatus = (status: string) => {
    return {
        type: 'SET-STATUS',
        status: status,
    } as const
}

export const updateStatusTC = (status: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        updateUserStatus(status).then((data) => {
            if (data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
    }
}

export default profileReducer

export type ResponseGetProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string | null
        large: string | null
    }
}

export type ResponseStatusType = {
    resultCode: number
    messages: string[]
    data: {}
}
