import { ComponentType } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AppStateType } from 'redux/redux-store'

type MapStatePropsType = {
    resultCode: number
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        resultCode: state.auth.resultCode,
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStatePropsType) => {
        let { resultCode, ...restProps } = props

        if (resultCode === 1) return <Redirect to={'/login'} />

        return <Component {...(restProps as T & {})} />
    }

    let ConnectRedirectComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectRedirectComponent
}
