import React from 'react'
import { reduxForm, Field, InjectedFormProps } from 'redux-form'
import s from './Login.module.css'
import { required } from 'utils/validators/validators'
import { Element } from 'components/common/Controls/FormControls'
import { connect } from 'react-redux'
import { loginTC } from 'redux/auth-reducer'
import { AppStateType } from 'redux/redux-store'
import { Redirect } from 'react-router-dom'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder="E-mail"
                    name="email"
                    component={Element}
                    elementType="input"
                    validate={[required]}
                />
            </div>
            <div>
                <Field
                    placeholder="Password"
                    name="password"
                    component={Element}
                    elementType="input"
                    validate={[required]}
                    type="password"
                />
            </div>
            <div>
                <Field component={Element} elementType="input" name="rememberMe" type="checkbox" /> remember me
            </div>
            {props.error && <span className={s.loginError}>{props.error}</span>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({ form: 'login' })(LoginForm)

const Login = (props: PropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.loginTC(formData.email, formData.password, formData.rememberMe)
    }
    if (props.resultCode === 0) {
        return <Redirect to="/profile" />
    }

    return (
        <div className={s.login}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

type MapDispatchPropsType = {
    loginTC: (email: string, password: string, rememberMe: boolean) => void
}
type MapStatePropsType = {
    resultCode: number
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        resultCode: state.auth.resultCode,
    }
}

export default connect(mapStateToProps, { loginTC })(Login)
