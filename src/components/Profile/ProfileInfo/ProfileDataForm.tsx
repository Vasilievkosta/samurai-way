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
    // contacts: {
    //     github: string
    //     vk: string
    //     facebook: string
    //     instagram: string
    //     twitter: string
    //     website: string
    //     youtube: string
    //     mainLink: string
    // }
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
    console.log(props.error)

    return (
        <form onSubmit={props.handleSubmit}>
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

            <div>
                Contacts:
                {Object.keys(contacts).map((c) => {
                    return (
                        <div style={{ display: 'flex' }}>
                            <b>{c}</b>
                            <Field
                                key={c}
                                placeholder={c}
                                name={`contacts.${c}`}
                                component={Element}
                                elementType="input"
                            />
                        </div>
                    )
                })}
            </div>
            <div>
                <button>enter</button>
            </div>
        </form>
    )
}

export const ProfileDataReduxForm = reduxForm<ResponseGetProfileType>({ form: 'edit-profile' })(ProfileDataForm)
