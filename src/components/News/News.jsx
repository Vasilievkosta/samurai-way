import { useState, useEffect } from 'react'

function News() {
    const [count, setCount] = useState(1)

    useEffect(() => {
        document.title = `You clicked ${count} times`
    })

    return (
        <div>
            <p>You clicked {count} times</p>

            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    )
}

export default News
