class musicPlayer {
    constructor(client, opts) {
        return new (require('discord-music-player')).Player(client, opts)
    }
}
module.exports = musicPlayer;