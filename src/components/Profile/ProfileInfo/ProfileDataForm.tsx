import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { required } from 'utils/validators/validators'
import { Element } from 'components/common/Controls/FormControls'
import { ResponseGetProfileType } from 'redux/profile-reducer'

export type FormProfileDataType = {
    aboutMe: string
    lookingForAJobDescriptions: string
    lookingForAJob: boolean
    fullName: string
    contacts: ContactsType
}

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

const ProfileDataForm: React.FC<InjectedFormProps<ResponseGetProfileType>> = (props) => {
    const contacts = props.initialValues.contacts!

    return (
        <form onSubmit={props.handleSubmit}>
            <div style={{ display: 'flex' }}>
                <div>
                    {props.error && <div style={{ color: 'red' }}>{props.error}</div>}
                    <div style={{ display: 'flex' }}>
                        <b>Full name </b>:
                        <Field
                            placeholder="fullName"
                            name="fullName"
                            component={Element}
                            elementType="input"
                            validate={[required]}
                        />
                    </div>

                    <div style={{ display: 'flex' }}>
                        <b>About Me </b>:
                        <Field
                            placeholder="aboutMe"
                            name="aboutMe"
                            component={Element}
                            elementType="input"
                            validate={[required]}
                        />
                    </div>

                    <div style={{ display: 'flex' }}>
                        <b>My skills</b>:
                        <Field
                            placeholder="My skills"
                            name="lookingForAJobDescription"
                            component={Element}
                            elementType="textarea"
                            validate={[required]}
                        />
                    </div>

                    <div style={{ display: 'flex' }}>
                        <b>Looking for a job</b>:
                        <Field name="lookingForAJob" component={Element} elementType="input" type="checkbox" />
                    </div>
                </div>

                <div>
                    Contacts:
                    {Object.keys(contacts).map((key) => {
                        return (
                            <div style={{ display: 'flex' }} key={key}>
                                <b>{key}</b>
                                <Field
                                    placeholder={key}
                                    name={`contacts.${key}`}
                                    component={Element}
                                    elementType="input"
                                />
                            </div>
                        )
                    })}
                    <div>
                        <button className="btn">enter</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export const ProfileDataReduxForm = reduxForm<ResponseGetProfileType>({ form: 'edit-profile' })(ProfileDataForm)
