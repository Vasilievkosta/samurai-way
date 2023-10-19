import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { AppStateType } from 'redux/redux-store'
import { ResponseAuthType, logoutTC } from 'redux/auth-reducer'

class HeaderContainer extends React.Component<HeaderPropsType> {
    render() {
        return <Header {...this.props} />
    }
}

type MapStatePropsType = {
    dataAuth: ResponseAuthType
}

type MapDispatchPropsType = {
    logoutTC: () => void
}

export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dataAuth: state.auth,
    }
}

export default connect(mapStateToProps, { logoutTC })(HeaderContainer)
