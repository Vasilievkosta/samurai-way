import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import { MyPostType } from './MyPostsContainer'
import { reduxForm, Field, InjectedFormProps } from 'redux-form'
import { maxLengthCreator, required } from 'utils/validators/validators'
import { Element } from 'components/common/Controls/FormControls'

type FormDataType = {
    newPost: string
}

const maxLength90 = maxLengthCreator(90)

const AddPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form className={s.form} onSubmit={props.handleSubmit}>
            <div className={s.textarea}>
                <Field
                    className={s.field}
                    placeholder="new post"
                    component={Element}
                    elementType="textarea"
                    name="newPost"
                    validate={[required, maxLength90]}
                />
            </div>
            <div>
                <button className="btn">Add post</button>
            </div>
        </form>
    )
}

const AddPostReduxForm = reduxForm<FormDataType>({ form: 'post' })(AddPostForm)

const MyPosts = (props: MyPostType) => {
    const addNewPost = (value: FormDataType) => {
        props.handleButtonClick(value.newPost)
    }

    return (
        <>
            <ul className={s.posts}>
                {props.profilePage.posts.map((p) => (
                    <Post message={p.message} like={p.like} key={p.id} />
                ))}
            </ul>
            <div>
                <AddPostReduxForm onSubmit={addNewPost} />
            </div>
        </>
    )
}

export default MyPosts
