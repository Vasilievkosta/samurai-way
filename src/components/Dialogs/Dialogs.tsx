import s from './Dialogs.module.css'
import { DialogItem } from './DialogItem'
import { MessageItem } from './MessageItem'
import { DialogsType } from './DialogsContainer'
import { reduxForm, Field, InjectedFormProps } from 'redux-form'
import { maxLengthCreator, required } from 'utils/validators/validators'
import { Element } from 'components/common/Controls/FormControls'

type FormDataType = {
    newMessage: string
}

const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder="your message"
                    name="newMessage"
                    component={Element}
                    elementType="textarea"
                    validate={[required, maxLength50]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<FormDataType>({ form: 'dialogs' })(AddMessageForm)

const Dialogs = (props: DialogsType) => {
    const addNewMessage = (value: FormDataType) => {
        props.sendMessageHandler(value.newMessage)
    }

    return (
        <div className={s.wrap}>
            <div className={s.dialogs}>
                {props.dialogsPage.dialogs.map((d) => (
                    <DialogItem name={d.name} id={d.id} key={d.id} />
                ))}
            </div>
            <ul className={s.messages}>
                {props.dialogsPage.messages.map((m) => (
                    <MessageItem message={m.message} key={m.id} />
                ))}
            </ul>
            <div>
                <AddMessageReduxForm onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

export default Dialogs
