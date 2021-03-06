import React, {Component} from 'react'
import {Play, FastForward, Pause, Plus} from 'react-feather'
import {connect} from 'react-redux'
import {fetchRPlaylist} from '../store/spotify'
import {fetchAudioFeatPlayer} from '../store/charting'
import {me} from '../store'
import {addPlaylist} from '../store/userPlaylist'
import AllPlaylists from './AllPlaylists'
import NowPlaying from './NowPlaying'
import RdrChart from './RdrChart'
import WorkingPlaylist from './WorkingPlaylist'

class PlayerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: true,
      queue: [],
      loaded: false
    }

    this.addToPlaylist = this.addToPlaylist.bind(this)
  }

  async componentDidMount() {
    const {getRPlaylist} = this.props
    await getRPlaylist(this.props.token)
    const songsWithUrl = this.props.rPlaylist.tracks.items.filter(track => {
      if (track) return track.preview_url
    })

    this.setState({
      queue: songsWithUrl,
      loaded: true
    })
  }

  async componentDidUpdate() {
    if (this.state.queue.length === 3 && this.state.loaded === true) {
      this.setState({loaded: false})
      await this.props.getRPlaylist(this.props.token)
      const songsWithUrl = this.props.rPlaylist.tracks.items.filter(
        track => track.preview_url !== null
      )
      this.setState({
        queue: songsWithUrl,
        loaded: true
      })
    }
  }

  addPopUp() {
    var el = document.getElementById('last-added-item')
    el.className = 'animating'

    var listener = el.addEventListener('animationend', function() {
      el.className = ''
      el.removeEventListener('animationend', listener)
    })
  }

  fastForward = () => {
    this.setState(prevState => ({
      queue: prevState.queue.slice(1),
      isPlaying: true
    }))
  }

  togglePlay = () => {
    const playerAudio = document.getElementById('player-audio')
    this.setState(state => {
      return {isPlaying: !state.isPlaying}
    })
    if (this.state.isPlaying) {
      playerAudio.pause()
    } else {
      playerAudio.play()
    }
  }

  async addToPlaylist() {
    this.addPopUp()
    const addedTrack = this.state.queue[0]
    const trackURI = addedTrack.uri
    const trackId = addedTrack.id

    this.props.addToPlaylist(
      this.props.currentPlaylistId.id,
      trackURI,
      this.props.token
    )
    await this.props.getAudioFeatPlayer(this.props.token, trackId)
  }

  sendToLogin() {
    this.props.history.push('/login')
  }

  render() {
    const {queue} = this.state
    let currentSong = queue[0]?.preview_url
    let artistName = queue[0]?.artists[0].name
    let songName = queue[0]?.name
    let albumImg = queue[0]?.album.images[1].url

    return (
      <div>
        <NowPlaying />
        {this.props.currentPlaylistId ? (
          <div>
            <div className="last-added">
              <WorkingPlaylist />
            </div>
            {currentSong && (
              <div className="player-page-outer-container fadehalf">
                <div className="player-page-container">
                  <div className="player">
                    <div className="player-info-container">
                      <div className="music-box">
                        {currentSong && (
                          <img
                            className="music-box-logo"
                            src="/images/sound-bars.gif"
                          />
                        )}
                      </div>
                      <div className="player-inner-info-container">
                        <h4 className="player-artist player-crop">
                          {artistName}
                        </h4>
                        <p className="player-song player-crop">{songName}</p>
                      </div>
                    </div>
                    <img src={albumImg} className="player-album-cover" />
                    <audio
                      id="player-audio"
                      src={currentSong}
                      autoPlay
                      onEnded={this.fastForward}
                    />

                    <div className="player-buttons">
                      <button
                        type="button"
                        className="player-btn f"
                        onClick={this.addToPlaylist}
                      >
                        <Plus className="player-btn-icon" />
                      </button>
                      <button
                        className="player-btn f"
                        type="button"
                        onClick={() => this.togglePlay()}
                      >
                        {this.state.isPlaying ? (
                          <Pause className="player-btn-icon" />
                        ) : (
                          <Play className="player-btn-icon" />
                        )}
                      </button>
                      <button
                        type="button"
                        className="player-btn f"
                        onClick={() => this.fastForward()}
                      >
                        <FastForward className="player-btn-icon" />
                      </button>
                    </div>
                  </div>
                  <RdrChart
                    id="player-page-chart override"
                    props={this.props.playlistIn}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>{this.props.isLoggedIn ? <AllPlaylists /> : 'Loading..'}</div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    playlistIn: state.charting.featArrPlayer,
    token: state.user.token,
    rPlaylist: state.spotify.rPlaylist,
    currentPlaylistId: state.userPlaylist.currentPlaylist,
    isLoggedIn: !!state.user.token
  }
}

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  getRPlaylist: token => dispatch(fetchRPlaylist(token)),
  addToPlaylist: (playlistId, trackURI, token) =>
    dispatch(addPlaylist(playlistId, trackURI, token)),
  getAudioFeatPlayer: (token, tracks) =>
    dispatch(fetchAudioFeatPlayer(token, tracks))
})

export default connect(mapState, mapDispatch)(PlayerPage)
