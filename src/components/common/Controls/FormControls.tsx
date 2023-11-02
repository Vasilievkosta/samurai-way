import React, { InputHTMLAttributes } from 'react'
import s from './FormControls.module.css'

type ElementProps = {
    input: InputHTMLAttributes<HTMLInputElement>
    meta: {
        touched: boolean
        error: string
    }
    elementType: string
}

export const Element: React.FC<ElementProps> = ({ input, meta, elementType, ...props }) => {
    const hasError = meta.touched && meta.error

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            {React.createElement(elementType, { ...input, ...props })}
            {hasError && <p>{meta.error}</p>}
        </div>
    )
}
