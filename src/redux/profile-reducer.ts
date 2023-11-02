import { PostType } from 'components/Profile/MyPosts/Post/Post'
import { ActionType, AppStateType, AppThunkDispatch } from './redux-store'
import { getProfile, getUserStatus, saveUserPhoto, updateProfile, updateUserStatus } from 'api/api'
import { Dispatch } from 'redux'
import { FormProfileDataType } from 'components/Profile/ProfileInfo/ProfileDataForm'
import { ThunkDispatch } from 'redux-thunk'
import { stopSubmit } from 'redux-form'

export type InitialStateProfileType = {
    posts: PostType[]
    profile: ResponseGetProfileType
    status: string
}

const initialResponseGetProfile = {
    userId: 2,
    aboutMe: '',
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
    status: 'first status!',
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

        case 'SAVE-PHOTO':
            return { ...state, profile: { ...state.profile, photos: action.data.photos } }

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

export const savePhotoSuccess = (data: DataPhotoType) => {
    return {
        type: 'SAVE-PHOTO',
        data: data,
    } as const
}

export const saveProfileSuccess = (data: DataPhotoType) => {
    return {
        type: 'SAVE-PROFILE',
        data: data,
    } as const
}

export const getProfileTC = (userId: string) => {
    return async (dispatch: Dispatch<ActionType>) => {
        const data = await getProfile(userId)
        dispatch(setProfile(data))
    }
}

export const saveProfileTC = (newProfile: FormProfileDataType) => {
    return async (dispatch: AppThunkDispatch, getState: any) => {
        const userId = getState().auth.data.id
        const data = await updateProfile(newProfile)
        if (data.resultCode === 0) {
            dispatch(getProfileTC(userId))
        } else {
            const action = stopSubmit('edit-profile', { _error: data.messages[0] })
            dispatch(action)
            return Promise.reject(data.messages[0])
        }
    }
}

export const getStatusTC = (userId: string) => {
    return async (dispatch: Dispatch<ActionType>) => {
        const data = await getUserStatus(userId)
        dispatch(setStatus(data))
    }
}

export const updateStatusTC = (status: string) => {
    return async (dispatch: Dispatch<ActionType>) => {
        const data = await updateUserStatus(status)
        if (data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
}

export const savePhotoTC = (file: File) => {
    return async (dispatch: Dispatch<ActionType>) => {
        const data = await saveUserPhoto(file)
        if (data.resultCode === 0) {
            dispatch(savePhotoSuccess(data.data))
        }
    }
}

export default profileReducer

export type ResponseGetProfileType = {
    userId: number
    aboutMe: string
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

export type ResponseStatusType<T> = {
    resultCode: number
    messages: string[]
    data: T
}

export type DataPhotoType = {
    photos: {
        small: string | null
        large: string | null
    }
}
