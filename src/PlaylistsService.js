const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const playlistQuery = {
      text: `SELECT playlists.id, playlists.name, users.username FROM playlists 
            LEFT JOIN users ON playlists.owner = users.id
            LEFT JOIN collaborations ON playlists.id = collaborations.playlist_id
            WHERE playlists.id = $1`,
      values: [playlistId],
    };
    const songQuery = {
      text: `SELECT playlistsongs.*, songs.title, songs.performer FROM playlistsongs
            LEFT JOIN songs ON songs.id = playlistsongs.song_id
            WHERE playlistsongs.playlist_id = $1`,
      values: [playlistId],
  };
    const playlistResult = await this._pool.query(playlistQuery);
    const songResult = await this._pool.query(songQuery);
    return { 
      playlist: {
      id: playlistResult.rows[0].id,
      name: playlistResult.rows[0].name,
      songs: [{
          id: songResult.rows[0].song_id,
          title: songResult.rows[0].title,
          performer: songResult.rows[0].performer,
        }]
      }
  };
  }
}

module.exports = PlaylistsService;
