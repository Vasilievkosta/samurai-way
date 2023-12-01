import { useState } from 'react'
import s from './Music.module.css'
import { tracksList } from 'assets/tracks/tracksList'
import Track from './Track/Track'

const runSearch = (query) => {
    if (!query) {
        return tracksList
    }
    const lowerCaseQuery = query.toLowerCase()

    return tracksList.filter(
        (track) =>
            track.title.toLowerCase().includes(lowerCaseQuery) || track.artists.toLowerCase().includes(lowerCaseQuery)
    )
}

const Music = () => {
    const [tracks, setTracks] = useState(tracksList)

    const handleChange = (e) => {
        const foundTracks = runSearch(e.target.value)
        setTracks(foundTracks)
    }

    return (
        <div className={s.music}>
            <input className={s.input} placeholder="Поиск трека" onChange={handleChange} />
            <ul className={s.list}>
                {tracks.map((track) => (
                    <li key={track.id}>
                        <Track {...track} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Music
