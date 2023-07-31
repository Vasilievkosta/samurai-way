import s from './Post.module.css'

export type PostType = {
	id?: string,
	message: string | undefined,
	like: number
}

const Post = (props: PostType) => {
	return (
		<>
			<div className={s.item}>
				<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGCG_HvieXwqPt3zjiGTQyRm7Rb5CBNWhJZ6TjU3pGsNqRwSuETtjtCX8vaAq6OoTPjVY&usqp=CAU' />
				{props.message}
				<p>like: {props.like}</p>
			</div>
		</>
	)
}

export default Post;