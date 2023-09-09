import s from './Preloader.module.css'

const Preloader = () => {
    return (
        <div className={s.loading}>
            <div className={s.obj}></div>
            <div className={s.obj}></div>
            <div className={s.obj}></div>
            <div className={s.obj}></div>
            <div className={s.obj}></div>
            <div className={s.obj}></div>
            <div className={s.obj}></div>
            <div className={s.obj}></div>
        </div>
    )
}

export default Preloader
