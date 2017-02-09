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
		game.load.spritesheet( 'walk', 'assets/Cowboy_Walk.png',64,64,9 );
		game.load.spritesheet( 'explode', 'assets/Explode.png',128,128,16);
		game.load.image( 'sky', 'assets/sky.png');
		game.load.image( 'ground', 'assets/ground.png');
		game.load.image( 'ground2', 'assets/ground2.png');
		game.load.image( 'bullet', 'assets/bullet.png');
		game.load.image( 'target', 'assets/target.png');
		game.load.image( 'targetC', 'assets/TargetCenter.png');
		game.load.image( 'post', 'assets/WoodenPost.png');
		game.load.image( 'target64', 'assets/Target64.png');
		
		game.load.audio( 'boom', 'assets/boom.wav');
		game.load.audio( 'footsteps', 'assets/pitterpatter.wav');
		game.load.audio( 'pew', 'assets/pew.wav');
    }
    
    var bouncy;
	var ground; 
	
	var boom;
	var footsteps;
	var pew;
	
	var target;
	var targetC;
	
	var bullets;
	var fireRate = 500;
	var nextFire = 0;
	
	var level = 1;
	var enemiesRem = 1;
	
	var enemies;
	var explosions;
	
	var shootStart = false;
    
    function create() {
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
        // Create a sprite at the center of the screen using the 'logo' image.
		game.add.sprite(0, 0, 'sky');
		game.add.sprite(0, 500, 'ground');
		
		//sound
		boom = game.add.audio('boom');
		footsteps = game.add.audio('footsteps');
		pew = game.add.audio('pew'); 
		
		//The ground that is physical
		ground = game.add.sprite(0, 532, 'ground2');
		game.physics.enable( ground, Phaser.Physics.ARCADE);
		ground.body.immovable = true;
		
		//enemy
		game.add.sprite(675,468,'post');
		enemies = game.add.group();
		enemies.enableBody = true;
		enemies.physicsBodyType = Phaser.Physics.ARCADE;
		var enemyT64 = enemies.create(658,436, 'target64');
		
		//Explosions
		explosions = game.add.group();
		explosions.createMultiple(30, 'explode');
		explosions.forEach(setupEnemy, this);
		//var explode = enemyT64.animations.add('explode');
		//enemies.callAll('animations.add','animations','explode');
		
		//The Target Icon 
		target = game.add.sprite(0, 0,'target');
		game.physics.enable(target, Phaser.Physics.ARCADE);
		target.anchor.setTo( 0.5, 0.5 );
		targetC = game.add.sprite(0, 0,'targetC'); //Added to get extra precision on the target
		game.physics.enable(targetC, Phaser.Physics.ARCADE);
		targetC.anchor.setTo( 0.5, 0.5 );
		
		//Bullet
		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;

		bullets.createMultiple(50, 'bullet');
		bullets.setAll('checkWorldBounds', true);
		bullets.setAll('outOfBoundsKill', true);
		
		//Bouncy the Cowboy
		bouncy = game.add.sprite( -300, 500, 'walk' );
        //bouncy = game.add.sprite( 200, 500, 'walk' );
        bouncy.anchor.setTo( 0.5, 0.5 );
		var walk = bouncy.animations.add('walk');

        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = false;
		bouncy.checkWorldBounds = true;
		bouncy.events.onOutOfBounds.add(walk1, this);
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#000000", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Bouncy's Shooting Range", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
	
	function setupEnemy(base)
	{
		base.anchor.x = 0.5;
		base.anchor.y = 0.5;
		base.animations.add('explode');
	}
    
    function update() {
		game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);
		
		//Shoots gun
		if (bouncy.x > 200 && enemiesRem > 0)
		{
			bouncy.body.velocity.x = 0;
			bouncy.animations.stop(null,true);
			shootStart = true;
			
		}
		
		if(enemiesRem == 0)
		{
			walk1(bouncy);
			//if(bouncy.outOfBounds == true)
			if(bouncy.x > 850)
			{
				bouncy.kill();
				bouncy.reset(-100, 500);
				enemies.callAll('revive');
				enemiesRem = enemiesRem +1;
			}
		}
		
		if (game.input.activePointer.isDown && shootStart == true && bouncy.body.velocity.x == 0)
		{
			shoot();
		}
	
		
		//Target Movement towards the mouse for aiming
		game.physics.arcade.moveToPointer(target, 800);
		game.physics.arcade.moveToPointer(targetC, 800);
		if (Phaser.Rectangle.contains(targetC.body, game.input.x, game.input.y))
        {
            target.body.velocity.setTo(0, 0);
			targetC.body.velocity.setTo(0, 0);
        }
		
		var hitPlatform = game.physics.arcade.collide(bouncy, ground);
    }
	
	function walk1(bouncy)
	{
		bouncy.animations.play('walk', 30, true);
		bouncy.body.velocity.x = 175;
	}
	
	function shoot() 
	{

		if (game.time.now > nextFire && bullets.countDead() > 0)
		{
			pew.play();
			
			nextFire = game.time.now + fireRate;

			var bullet = bullets.getFirstDead();

			bullet.reset(bouncy.x - 8, bouncy.y - 8);

			game.physics.arcade.moveToPointer(bullet, 1200);
		}

	}
	
	function collisionHandler(bullet, enemy)
	{
		bullet.kill();
		enemy.kill();
		boom.play();
		
		var explosion = explosions.getFirstExists(false);
		explosion.reset(enemy.body.x+30, enemy.body.y+20);
		explosion.play('explode', 30, false, true);
		
		enemiesRem = enemiesRem - 1;
		level = level+1;

	}
};
