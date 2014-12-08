var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.image('star', 'assets/Berry.png');
    this.load.image('anthill', 'assets/ANTHILL.png');
    this.load.spritesheet('ant', 'assets/antstuff.png', 50, 48);
    this.load.tilemap('level1', 'assets/tilemaps/SMALL-MAP.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/tilemaps/ForestFile.png');
    this.load.image('AntSim', 'assets/AntSim.png')
    
  },
  create: function() {
    this.state.start('MainMenu');
  }
};