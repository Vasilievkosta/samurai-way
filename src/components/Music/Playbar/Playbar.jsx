import { useContext, useEffect, useState } from 'react'
import { AudioContext } from '../context/AudioContext'
import s from './Playbar.module.css'
import style from '../Track/Track.module.css'
import { secondsToMMSS } from '../Track/Track'

const Playbar = () => {
    const [currentTime, setCurrentTime] = useState(0)

    const { audio, currentTrack, handleToggleAudio, isPlaying } = useContext(AudioContext)
    const { title, artist, preview, duration } = currentTrack

    const sliderCurrentTime = Math.round((currentTime / duration) * 100)

    const handleChangeCurrentTime = (_, value) => {
        const time = Math.round((value / 100) * duration)

        setCurrentTime(time)
        audio.currentTime = time
    }

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(audio.currentTime)
        }, 1000)

        return () => {
            clearInterval(timeInterval)
        }
    }, [])

    return (
        <div className={s.playbar}>
            <img className={s.preview} src={preview} alt="" />
            <button
                className={isPlaying ? `${style.button} ${style.pause}` : style.button}
                onClick={() => handleToggleAudio(currentTrack)}
            ></button>
            <div className={s.credits}>
                <h4>{title}</h4>
                <p>{artist}</p>
            </div>
            <div className={s.slider}>
                <p>{secondsToMMSS(currentTime)}</p>
                <div>
                    Slider step={1} min={0} max={100} value={sliderCurrentTime} onChange={handleChangeCurrentTime}
                </div>
                <p>{secondsToMMSS(duration)}</p>
            </div>
        </div>
    )
}

export default Playbar
