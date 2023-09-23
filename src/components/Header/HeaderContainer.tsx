import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { AppStateType } from 'redux/redux-store'
import { AuthDataType, ResponseAuthType, setAuthUserData } from 'redux/auth-reducer'
import { getMe } from 'api/api'

class HeaderContainer extends React.Component<PropsType> {
    componentDidMount() {
        getMe().then((data) => {
            console.log(data)
            if (data.resultCode === 0) {
                this.props.setAuthUserData(data.data)
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
