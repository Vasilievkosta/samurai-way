import React from 'react';
import s from './MyPosts.module.css'
import Post, { PostType } from './Post/Post';

export type MyPostType = {
	data: PostType[]
	addPost: (postMessage: string | undefined) => void
	updateNewPostText: (newMessage: string | undefined) => void
	newPostText: string | undefined
}

const MyPosts = (props: MyPostType) => {

	let postsElement: React.RefObject<HTMLTextAreaElement> = React.createRef();

	const handleButtonClick = () => {
		let text = postsElement.current?.value;
		// console.log(postsElement.current?.value);
		props.addPost(text)

		postsElement.current?.focus()
	}

	const handleMessageChange = () => {
		let character = postsElement.current?.value;
		props.updateNewPostText(character)
	}

	return (
		<>
			<div>
				<textarea ref={postsElement} onChange={handleMessageChange} value={props.newPostText} />
				<button onClick={handleButtonClick}>Add post</button>
			</div>
			<div className={s.posts}>
				{
					props.data.map(p => <Post message={p.message} like={p.like} key={p.id} />)
				}
			</div>
		</>
	)
}

export default MyPosts;