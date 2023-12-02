import s from './Track.module.css'
import { useContext } from 'react'
import { AudioContext } from '../context/AudioContext'

export const secondsToMMSS = (seconds) => {
    return new Date(seconds * 60 * 1000).toISOString().substring(11, 16)
}

const Track = (track) => {
    const { preview, title, artists, duration } = track

    const { currentTrack, isPlaying, handleToggleAudio } = useContext(AudioContext)

    const isCurrentTrack = currentTrack.id === track.id
    const watchPause = isCurrentTrack && isPlaying

    const toogleClick = () => {
        handleToggleAudio(track)
    }

    return (
        <div className={isCurrentTrack ? `${s.track} ${s.playing}` : s.track}>
            <button className={watchPause ? `${s.button} ${s.pause}` : s.button} onClick={toogleClick}></button>

            <img className={s.preview} src={preview} alt="" />
            <div className={s.credits}>
                <b>{title}</b>
                <p>{artists}</p>
            </div>
            <div>{secondsToMMSS(duration)}</div>
        </div>
    )
}

export default Track
