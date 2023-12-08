import { useState } from 'react'
import s from './Paginator.module.css'

type PropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChange: (id: number) => void
}

const Paginator = (props: PropsType) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionSize = 20
    const portionCount = Math.ceil(pagesCount / portionSize)

    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize
    return (
        <div className={s.paginator}>
            <p className={s.registered}>
                {props.totalCount}
                <span> - registered users now</span>
            </p>

            <div className={s.count}>
                {portionNumber > 1 && (
                    <button
                        className={s.btn}
                        onClick={() => {
                            setPortionNumber(portionNumber - 1)
                        }}
                    >
                        &laquo;
                    </button>
                )}
                {pages
                    .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => {
                        return (
                            <span
                                key={p}
                                className={props.currentPage === p ? s.selectedPage : ''}
                                onClick={() => props.onPageChange(p)}
                            >
                                {p}
                            </span>
                        )
                    })}
                {portionCount > portionNumber && (
                    <button
                        className={s.btn}
                        onClick={() => {
                            setPortionNumber(portionNumber + 1)
                        }}
                    >
                        &raquo;
                    </button>
                )}
            </div>
        </div>
    )
}

export default Paginator
