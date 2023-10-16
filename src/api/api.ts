import axios, { AxiosResponse } from 'axios'
import { ResponseFollowType } from 'components/Users/Users'
import { ResponseAuthType } from 'redux/auth-reducer'
import { ResponseGetProfileType, ResponseStatusType } from 'redux/profile-reducer'
import { ResponseGetUserType } from 'redux/users-reducer'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '20104153-3dfc-4547-aac8-f28dda96c7d5',
    },
})

export const getUsers = (currentPage: number, pageSize: number): Promise<ResponseGetUserType> => {
    return instance
        .get(`users?page=${currentPage}&count=${pageSize}`)
        .then((res: AxiosResponse<ResponseGetUserType>) => {
            return res.data
        })
}

export const getProfile = (userId: string): Promise<ResponseGetProfileType> => {
    return instance.get(`profile/${userId}`).then((res: AxiosResponse<ResponseGetProfileType>) => {
        return res.data
    })
}

export const getUserStatus = (userId: string): Promise<string> => {
    return instance.get(`profile/status/${userId}`).then((res: AxiosResponse<string>) => {
        return res.data
    })
}

export const updateUserStatus = (status: string): Promise<ResponseStatusType> => {
    return instance.put(`profile/status`, { status: status }).then((res: AxiosResponse<ResponseStatusType>) => {
        return res.data
    })
}

export const getMe = (): Promise<ResponseAuthType> => {
    return instance.get(`auth/me`).then((res: AxiosResponse<ResponseAuthType>) => {
        return res.data
    })
}

export const postFollow = (id: number): Promise<ResponseFollowType> => {
    return instance.post(`follow/${id}`).then((res: AxiosResponse<ResponseFollowType>) => {
        return res.data
    })
}

export const deleteFollow = (id: number): Promise<ResponseFollowType> => {
    return instance.delete(`follow/${id}`).then((res: AxiosResponse<ResponseFollowType>) => {
        return res.data
    })
}
