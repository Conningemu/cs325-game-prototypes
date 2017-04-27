window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 848, 450, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    //800,600
    function preload() {
		game.load.image('ground', 'assets/ground.png');
		game.load.image('player', 'assets/player.png');
    }
    
	// Define movement constants
	var MAX_SPEED = 500; // pixels/second
	var ACCELERATION = 1500; // pixels/second/second
	var DRAG = 600; // pixels/second
	var GRAVITY = 2600; // pixels/second/second
	var JUMP_SPEED = -1000; // pixels/second (negative y is up)

    var player;
	var ground;

    function create() {
		game.stage.backgroundColor = 0x4488cc;
		
		
		
		 // Create a player sprite
		player = game.add.sprite(game.width/2, game.height - 64, 'player');

		// Enable physics on the player
		game.physics.enable(player, Phaser.Physics.ARCADE);

		// Make player collide with world boundaries so he doesn't leave the stage
		player.body.collideWorldBounds = true;

		// Set player minimum and maximum movement speed
		player.body.maxVelocity.setTo(MAX_SPEED, MAX_SPEED * 10); // x, y

		// Add drag to the player that slows them down when they are not accelerating
		player.body.drag.setTo(DRAG, 0); // x, y

		// Since we're jumping we need gravity
		game.physics.arcade.gravity.y = GRAVITY;

		// Create some ground for the player to walk on
		ground = game.add.group();
		for(var x = 0; x < game.width; x += 32) {
			// Add the ground blocks, enable physics on each, make them immovable
			var groundBlock = game.add.sprite(x, game.height - 32, 'ground');
			game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
			groundBlock.body.immovable = true;
			groundBlock.body.allowGravity = false;
			ground.add(groundBlock);
		}

		// Capture certain keys to prevent their default actions in the browser.
		// This is only necessary because this is an HTML5 game. Games on other
		// platforms may not need code like 
		game.input.keyboard.addKeyCapture([
			Phaser.Keyboard.LEFT,
			Phaser.Keyboard.RIGHT,
			Phaser.Keyboard.UP,
			Phaser.Keyboard.DOWN
		]);

    }

    
    function update() {
		 // Collide the player with the ground
		game.physics.arcade.collide(player, ground);

		if (leftInputIsActive()) {
			// If the LEFT key is down, set the player velocity to move left
			player.body.acceleration.x = -ACCELERATION;
		} else if (rightInputIsActive()) {
			// If the RIGHT key is down, set the player velocity to move right
			player.body.acceleration.x = ACCELERATION;
		} else {
			player.body.acceleration.x = 0;
		}

		// Set a variable that is true when the player is touching the ground
		var onTheGround = player.body.touching.down;

		if (onTheGround && upInputIsActive()) {
			// Jump when the player is touching the ground and the up arrow is pressed
			player.body.velocity.y = JUMP_SPEED;
		}
	}
	
	function leftInputIsActive(){
		var isActive = false;

		isActive = game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
		isActive |= (game.input.activePointer.isDown && game.input.activePointer.x < game.width/4);

		return isActive;
	}
	
	function rightInputIsActive(){
		 var isActive = false;

		isActive = game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
		isActive |= (game.input.activePointer.isDown && game.input.activePointer.x > game.width/2 + game.width/4);

		return isActive;
		
	}
	
	function upInputIsActive(){
		var isActive = false;

		isActive = game.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
		isActive |= (game.input.activePointer.justPressed(duration + 1000/60) &&
			game.input.activePointer.x > game.width/4 &&
			game.input.activePointer.x < game.width/2 + game.width/4);

		return isActive;
	}
};
