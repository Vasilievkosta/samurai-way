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
        <div>
            <p>{props.totalCount}</p>
            <span>{pagesCount}</span>
            <p>{props.currentPage}</p>
            <div className={s.count}>
                {portionNumber > 1 && (
                    <button
                        onClick={() => {
                            setPortionNumber(portionNumber - 1)
                        }}
                    >
                        PREV
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
                        onClick={() => {
                            setPortionNumber(portionNumber + 1)
                        }}
                    >
                        NEXT
                    </button>
                )}
            </div>
        </div>
    )
}

export default Paginator
