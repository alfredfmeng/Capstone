import React, {useState, useRef, useEffect} from 'react'
import {Play, FastForward} from 'react-feather'
import {connect} from 'react-redux'

const PlayerPage = props => {
  let currentSong = props.album
    ? props.album.tracks.items[0].preview_url
    : 'nothing here'
  console.log(currentSong)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="explore-page-container f jcc">
      <div className="player f jcc aie">
        <audio controls autoPlay src={currentSong} />
        <div className="f jcb">
          {/* <li className="player-btn"></li> */}
          <button
            className="player-btn f"
            type="button"
            // onClick={() => playSong()}
          >
            <Play />
          </button>
          {/* <li className="player-btn"><FastForward/></li> */}
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    album: state.spotify.album
  }
}

export default connect(mapState)(PlayerPage)
