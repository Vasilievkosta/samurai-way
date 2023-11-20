import React, { ReactNode } from 'react'
import s from './Modal.module.css'

type PropsType = {
    active: boolean
    setActive: (active: boolean) => void
    children: ReactNode
}

export const Modal = ({ active, setActive, children }: PropsType) => {
    return (
        <div className={active ? `${s.modal} ${s.active}` : s.modal} onClick={() => setActive(false)}>
            <div className={s.modal__content} onClick={(e) => e.stopPropagation()}>
                <div className={s.modal__buttons}>
                    <button className={s.modal__btn} onClick={() => setActive(false)}>
                        &#10006;
                    </button>
                </div>

                {children}
            </div>
        </div>
    )
}
