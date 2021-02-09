import axios from 'axios'
import getRandomSearch, {randomOffset} from './getRandom'

const GET_ALBUM = 'GET_ALBUM'
const GET_PLAYLIST = 'GET_PLAYLIST'
const GET_RANDOM_PLAYLIST = 'GET_RANDOM_PLAYLIST'
const GET_AUDIO_FEAT = 'GET_AUDIO_FEAT'
const GET_AUDIO_FEAT_PLAYER = 'GET_AUDIO_FEAT_PLAYER'

const getRandomPlaylist = rPlaylist => ({
  type: GET_RANDOM_PLAYLIST,
  rPlaylist
})

const getAlbum = album => ({
  type: GET_ALBUM,
  album
})

const getUserPlaylist = playlist => ({
  type: GET_PLAYLIST,
  playlist
})

const getAudioFeat = featArr => ({
  type: GET_AUDIO_FEAT,
  featArr
})

const getAudioFeatPlayer = featArrPlayer => ({
  type: GET_AUDIO_FEAT_PLAYER,
  featArrPlayer
})

export const fetchAudioFeatPlayer = (token, trackId) => {
  return async dispatch => {
    try {
      const {data} = await axios({
        url: 'https://api.spotify.com/v1/audio-features',
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token
        },
        params: {
          ids: trackId.toString()
        }
      })
      dispatch(getAudioFeatPlayer(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchAudioFeat = (token, trackId) => {
  return async dispatch => {
    try {
      const {data} = await axios({
        url: '	https://api.spotify.com/v1/audio-features',
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token
        },
        params: {
          ids: trackId.toString()
        }
      })
      dispatch(getAudioFeat(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchRPlaylist = token => {
  return async dispatch => {
    try {
      const q = getRandomSearch()
      const offset = Math.floor(Math.random() * 1000)
      const {data} = await axios({
        url: 'https://api.spotify.com/v1/search',
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token
        },
        params: {
          type: 'track',
          q,
          offset,
          market: 'US'
        }
      })
      dispatch(getRandomPlaylist(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchAlbum = token => {
  return async dispatch => {
    try {
      const {data} = await axios({
        url: 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy',
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      dispatch(getAlbum(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchUserPlaylist = token => {
  return async dispatch => {
    try {
      const {data} = await axios({
        url: 'https://api.spotify.com/v1/me/top/tracks',
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      dispatch(getUserPlaylist(data))
    } catch (error) {
      console.error(error)
    }
  }
}

let initialState = {
  token: null,
  album: null,
  playlist: null,
  playerFeatArray: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALBUM:
      return {...state, album: action.album}
    case GET_PLAYLIST:
      return {...state, playlist: action.playlist}
    case GET_RANDOM_PLAYLIST:
      return {...state, rPlaylist: action.rPlaylist}
    case GET_AUDIO_FEAT:
      return {...state, featArr: action.featArr}
    case GET_AUDIO_FEAT_PLAYER:
      return [...state, action.featArrPlayer]
    default:
      return state
  }
}
