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

const maxLength10 = maxLengthCreator(10)

const AddPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder="new post"
                    component={Element}
                    elementType="textarea"
                    name="newPost"
                    validate={[required, maxLength10]}
                />
            </div>
            <div>
                <button>Add post</button>
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
            <div>
                <AddPostReduxForm onSubmit={addNewPost} />
            </div>
            <div className={s.posts}>
                {props.profilePage.posts.map((p) => (
                    <Post message={p.message} like={p.like} key={p.id} />
                ))}
            </div>
        </>
    )
}

export default MyPosts
