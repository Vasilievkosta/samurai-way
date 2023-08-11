import React from 'react';
import s from './MyPosts.module.css'
import Post, { PostType } from './Post/Post';
import { ActionType, addPostAC, changedTextPostAC, } from 'redux/redux-store';

export type MyPostType = {
	posts: PostType[]
	dispatch: (action: ActionType) => void
	newPostText: string | undefined
}

const MyPosts = (props: MyPostType) => {

	let postsElement: React.RefObject<HTMLTextAreaElement> = React.createRef();

	const handleButtonClick = () => {

		props.dispatch(addPostAC())
		postsElement.current?.focus()
	}

	const handleMessageChange = () => {
		let character = postsElement.current?.value;
		console.log(character)
		props.dispatch(changedTextPostAC(character))
	}

	return (
		<>
			<div>
				<textarea ref={postsElement} onChange={handleMessageChange} value={props.newPostText} />
				<button onClick={handleButtonClick}>Add post</button>
			</div>
			<div className={s.posts}>
				{
					props.posts.map(p => <Post message={p.message} like={p.like} key={p.id} />)
				}
			</div>
		</>
	)
}

export default MyPosts;
