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
            <div style={{ minHeight: '70px' }}>
                <Field
                    className={s.field}
                    placeholder="E-mail"
                    name="email"
                    component={Element}
                    elementType="input"
                    validate={[required]}
                />
            </div>
            <div style={{ minHeight: '70px' }}>
                <Field
                    className={s.field}
                    placeholder="password"
                    name="password"
                    component={Element}
                    elementType="input"
                    validate={[required]}
                    type="password"
                />
            </div>
            <div style={{ display: 'flex', marginBottom: '15px' }}>
                <Field component={Element} elementType="input" name="rememberMe" type="checkbox" /> remember me
            </div>
            <p>{error && <p>{error}</p>}</p>

            <div>
                <button className="btn">Login</button>
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
            <div style={{ marginRight: '25px' }}>
                <h1 style={{ marginBottom: '15px' }}>Login</h1>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
            </div>

            <div className={s.account}>
                <p>use common test account credentials:</p>
                <p> Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </div>
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
