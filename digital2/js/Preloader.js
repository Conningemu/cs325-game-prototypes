
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('titlePage', 'assets/dog.jpg');
		this.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
		this.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
		
		//	Game stuff + lots of other required assets here
		this.load.tilemap('level', 'assets/TestMap.json', null, Phaser.Tilemap.TILED_JSON); //Couldn't quite get this to work
		
		this.load.image('block', 'assets/block.png');
		this.load.image('sblock', 'assets/sblock.png');
		this.load.image('ssblock', 'assets/tile.png');
		this.load.image('sssblock', 'assets/stile.png');
		this.load.image('tiles', 'assets/BaseTiles.png');
		this.load.spritesheet('chicken', 'assets/chicken.png',32,32);
		this.load.spritesheet('enemy', 'assets/enemy.png',32,48);
		this.load.image('poo', 'assets/BirdPoo.png');
		
        this.load.image( 'logo', 'assets/phaser.png' );
		this.load.image('title', 'assets/Title.png');
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
