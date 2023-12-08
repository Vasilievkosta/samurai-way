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
            <li className={s.item}>
                <div className={s.message}>
                    <img className={s.image} src={fotoGirl} alt="photoUser" />
                    <p className={s.text}>{props.message}</p>
                </div>
                <p>❤️ {props.like}</p>
            </li>
        </>
    )
}

export default Post
