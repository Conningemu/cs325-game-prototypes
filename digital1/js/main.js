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
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    //800,600
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/Cowboy.png' );
		game.load.image( 'sky', 'assets/sky.png');
		game.load.image( 'ground', 'assets/ground.png');
		game.load.image( 'ground2', 'assets/ground2.png');
		game.load.image( 'bullet', 'assets/bullet.png');
		game.load.image( 'target', 'assets/target.png');
		game.load.image( 'targetC', 'assets/TargetCenter.png');
    }
    
    var bouncy;
	var ground; 
	
	var target;
	var targetC;
    
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
		game.add.sprite(0, 0, 'sky');
		game.add.sprite(0, 500, 'ground');
		game.add.sprite(100, 100, 'bullet');
		
		ground = game.add.sprite(0, 532, 'ground2');
		game.physics.enable( ground, Phaser.Physics.ARCADE);
		ground.body.immovable = true;
		
		target = game.add.sprite(0, 0,'target');
		game.physics.enable(target, Phaser.Physics.ARCADE);
		target.anchor.setTo( 0.5, 0.5 );
		targetC = game.add.sprite(0, 0,'targetC'); //Added to get extra precision on the target
		game.physics.enable(targetC, Phaser.Physics.ARCADE);
		targetC.anchor.setTo( 0.5, 0.5 );
		
        bouncy = game.add.sprite( 200, 500, 'logo' );
        bouncy.anchor.setTo( 0.5, 0.5 );

        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "I'm Trying", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
		
		game.physics.arcade.moveToPointer(target, 800);
		game.physics.arcade.moveToPointer(targetC, 800);
		if (Phaser.Rectangle.contains(targetC.body, game.input.x, game.input.y))
        {
            target.body.velocity.setTo(0, 0);
			targetC.body.velocity.setTo(0, 0);
        }
		
		var hitPlatform = game.physics.arcade.collide(bouncy, ground);
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
    }
};
