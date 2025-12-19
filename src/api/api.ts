import axios, { AxiosResponse } from 'axios'
import { FormProfileDataType } from 'components/Profile/ProfileInfo/ProfileDataForm'
import { ResponseFollowType } from 'components/Users/Users'
import { ResponseAuthType } from 'redux/auth-reducer'
import { DataPhotoType, ResponseGetProfileType, ResponseStatusType } from 'redux/profile-reducer'
import { ResponseGetUserType } from 'redux/users-reducer'

const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY as string,
    },
})

instance.interceptors.request.use((config) => {
    if (!config.headers) {
        config.headers = {}
    }
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('auth-token')}`
    return config
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

export const updateProfile = (newProfile: FormProfileDataType): Promise<ResponseStatusType<{}>> => {
    return instance.put(`profile`, newProfile).then((res: AxiosResponse<ResponseStatusType<{}>>) => {
        return res.data
    })
}

export const getUserStatus = (userId: string): Promise<string> => {
    return instance.get(`profile/status/${userId}`).then((res: AxiosResponse<string>) => {
        return res.data
    })
}

export const updateUserStatus = (status: string): Promise<ResponseStatusType<{}>> => {
    return instance.put(`profile/status`, { status: status }).then((res: AxiosResponse<ResponseStatusType<{}>>) => {
        return res.data
    })
}

export const saveUserPhoto = (photoFile: File): Promise<ResponseStatusType<DataPhotoType>> => {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance
        .put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res: AxiosResponse<ResponseStatusType<DataPhotoType>>) => {
            return res.data
        })
}

export const getMe = (): Promise<ResponseAuthType> => {
    return instance.get(`auth/me`).then((res: AxiosResponse<ResponseAuthType>) => {
        return res.data
    })
}

export const login = (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
): Promise<ResponseAuthType> => {
    return instance
        .post(`auth/login`, { email, password, rememberMe, captcha })
        .then((res: AxiosResponse<ResponseAuthType>) => {
            return res.data
        })
}

export const logout = (): Promise<ResponseAuthType> => {
    return instance.delete(`auth/login`).then((res: AxiosResponse<ResponseAuthType>) => {
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

export const getCaptchaUrl = (): Promise<{ url: string }> => {
    return instance.get(`security/get-captcha-url`).then((res: AxiosResponse<{ url: string }>) => {
        return res.data
    })
}
