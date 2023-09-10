import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { AppStateType } from 'redux/redux-store'
import axios from 'axios'
import { AuthDataType, ResponseAuthType, setAuthUserData } from 'redux/auth-reducer'

class HeaderContainer extends React.Component<PropsType> {
    componentDidMount() {
        axios
            .get<ResponseAuthType>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
                withCredentials: true,
            })
            .then((res) => {
                if (res.data.resultCode === 0) {
                    this.props.setAuthUserData(res.data.data)
                }
            })
    }
    render() {
        return <Header {...this.props} />
    }
}

type MapStatePropsType = {
    dataAuth: ResponseAuthType
}

type MapDispatchPropsType = {
    setAuthUserData: (data: AuthDataType) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dataAuth: state.auth,
    }
}

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer)
