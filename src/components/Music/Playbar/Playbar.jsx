import { useContext, useEffect, useState } from 'react'
import { AudioContext } from '../context/AudioContext'
import s from './Playbar.module.css'
import style from '../Track/Track.module.css'
import { secondsToMMSS } from '../Track/Track'
import SliderDemo from '../../common/Slider/Slider'

const Playbar = () => {
    const { currentTrack, handleToggleAudio, isPlaying } = useContext(AudioContext)
    const { title, artist, preview } = currentTrack

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
                <TimeControl />
            </div>
        </div>
    )
}

export default Playbar

const TimeControl = () => {
    const { audio, currentTrack } = useContext(AudioContext)
    const { duration } = currentTrack
    const [currentTime, setCurrentTime] = useState(0)
    const sliderCurrentTime = Math.round((currentTime / duration) * 100)

    const handleChangeCurrentTime = (value) => {
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
        <>
            <p>{secondsToMMSS(currentTime)}</p>
            <SliderDemo value={sliderCurrentTime} onChange={handleChangeCurrentTime} />
            <p>{secondsToMMSS(duration)}</p>
        </>
    )
}
