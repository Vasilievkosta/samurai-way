import React, { useState, useEffect } from 'react'

function News() {
    const [count, setCount] = useState(1)
    console.log('count')

    useEffect(() => {
        console.log(count)
        document.title = `You clicked ${count} times`
    })

    return (
        <div>
            <p>You clicked {count} times</p>

            <button onClick={() => setCount(count + 1)}>Click me</button>
            <Clock />
        </div>
    )
}

export default News

function Clock() {
    const [date, setDate] = useState(new Date())
    console.log('clock')

    useEffect(() => {
        console.log('useEffect')
        const idInt = setInterval(() => {
            console.log('Tick! ', idInt)
            setDate(new Date())
        }, 1000)
        return () => {
            clearInterval(idInt)
        }
    }, [])

    return (
        <>
            <p>{date.getSeconds()}</p>
        </>
    )
}
