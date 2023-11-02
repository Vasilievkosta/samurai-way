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
    captcha: string
}

type CaptchaType = {
    captchaUrl: string
}

const LoginForm: React.FC<InjectedFormProps<FormDataType, CaptchaType> & CaptchaType> = ({
    handleSubmit,
    error,
    captchaUrl,
}) => {
    return (
        <form onSubmit={handleSubmit}>
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
            {error && <span className={s.loginError}>{error}</span>}
            <div>
                <button>Login</button>
            </div>
            {captchaUrl && <img src={captchaUrl} alt="captcha" />}
            {captchaUrl && (
                <Field
                    placeholder="Symbols from image"
                    name="captcha"
                    component={Element}
                    elementType="input"
                    validate={[required]}
                />
            )}
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType, CaptchaType>({ form: 'login' })(LoginForm)

const Login = (props: PropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.resultCode === 0) {
        return <Redirect to="/profile" />
    }

    return (
        <div className={s.login}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}

type MapDispatchPropsType = {
    loginTC: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type MapStatePropsType = {
    resultCode: number
    captchaUrl: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        resultCode: state.auth.resultCode,
        captchaUrl: state.auth.captcha.url,
    }
}

export default connect(mapStateToProps, { loginTC })(Login)
