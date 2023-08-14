import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import { MyPostType } from './MyPostsContainer';

const MyPosts = (props: MyPostType) => {

	let postsElement: React.RefObject<HTMLTextAreaElement> = React.createRef();

	const callbackButtonClick = () => {
		props.handleButtonClick()
		postsElement.current?.focus()
	}

	const callbackMessageChange = () => {
		let character = postsElement.current?.value;
		console.log(character)
		props.handleMessageChange(character)
	}

	return (
		<>
			<div>
				<textarea ref={postsElement} onChange={callbackMessageChange} value={props.profilePage.newPostText} />
				<button onClick={callbackButtonClick}>Add post</button>
			</div>
			<div className={s.posts}>
				{
					props.profilePage.posts.map(p => <Post message={p.message} like={p.like} key={p.id} />)
				}
			</div>
		</>
	)
}

export default MyPosts;
