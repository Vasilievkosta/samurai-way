import s from './Post.module.css'
import fotoGirl from 'assets/photo/avaGirl-2.jpg'

export type PostType = {
    id?: string
    message: string | undefined
    like: number
}

const Post = (props: PostType) => {
    return (
        <>
            <div className={s.item}>
                <img src={fotoGirl} alt="photoUser" />
                {props.message}
                <p>like: {props.like}</p>
            </div>
        </>
    )
}

export default Post
