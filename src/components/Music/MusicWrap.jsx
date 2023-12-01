import Music from './Music'
import Playbar from './Playbar/Playbar'
import AudioProvider from './context/AudioContext'

const MusicWrap = () => {
    return (
        <AudioProvider>
            <Music />
            <Playbar />
        </AudioProvider>
    )
}

export default MusicWrap
