
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    
    // Create your own variables.
    this.bouncy = null;
	
	this.bullets;
	this.fireRate = 500;
	this.nextFire = 0;
	
	this.score = 0;
	this.scoreString = '';
	this.scoreText;
	
	this.enemies;
	this.enemyCount = 1;
};

BasicGame.Game.prototype = {
	
	

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.game.stage.backgroundColor = '#C2DFFF';
		
		/*
		this.map = this.game.add.tilemap('level');
		this.map.addTilesetImage('BaseTiles', 'tiles');
		
		//this.backgroundlayer = this.map.createLayer('background');
		this.ground = this.map.createLayer('Layer1');
		this.game.physics.enable(this.map, Phaser.Physics.ARCADE);
		this.ground.resizeWorld();

		this.map.setCollisionBetween(1, 100, true, 'Layer1'); 
		*/
		
		this.bullets = this.game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

		this.bullets.createMultiple(50, 'poo');
		this.bullets.setAll('checkWorldBounds', true);
		this.bullets.setAll('outOfBoundsKill', true);
		
		block = this.game.add.sprite(0,400,'block');
		this.game.physics.arcade.enable(block);
		block.body.immovable = true;
		
		player = this.game.add.sprite(32, 96, 'chicken');
		this.game.physics.arcade.enable(player);
		player.body.gravity.y = 370;
		player.body.collideWorldBounds = true;
		player.animations.add('walkRight',[8,9,10,11,12,13,14,15],10,true);
		player.animations.add('walkLeft', [16,17,18,19,20,21,22,23],10,true);
		player.animations.add('flap', [24,25,26,27],60,true);
		player.goesRight = true;
		
		this.enemies = this.game.add.group();
		this.enemies.enableBody = true;
		this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
		
		this.createEnemies();
		this.enemies.setAll('body.gravity.y', 400);
		

		box1 = this.game.add.sprite(64, 384, 'ssblock');
		box2 = this.game.add.sprite(0, 340, 'sblock');
		
		this.game.physics.arcade.enable(box1);
		box1.body.immovable = true;
		this.game.physics.arcade.enable(box2);
		box2.body.immovable = true;
		
		box5 = this.game.add.sprite(368, 340, 'sblock');
		this.game.physics.arcade.enable(box5);
		box5.body.immovable = true;
		
		box3 = this.game.add.sprite(672, 384, 'ssblock');
		box4 = this.game.add.sprite(736, 340, 'sblock');
		this.game.physics.arcade.enable(box3);
		box3.body.immovable = true;
		this.game.physics.arcade.enable(box4);
		box4.body.immovable = true;
		
		box6 = this.game.add.sprite(208, 330, 'sssblock');
		this.game.physics.arcade.enable(box6);
		box6.body.immovable = true;
		box7 = this.game.add.sprite(576, 330, 'sssblock');
		this.game.physics.arcade.enable(box7);
		box7.body.immovable = true;
		
		this.scoreString = 'Score : ';
		this.scoreText = this.game.add.text(10, 10, this.scoreString + this.score, { font: '34px Arial', fill: '#000000' });
		
		//this.camera.x = (game.width * -0.5); For another Day perhaps
		//this.camera.y = (game.height * -0.5);
		this.camera.follow(player);
		
		this.cursors = this.game.input.keyboard.createCursorKeys();
    },
	
	createEnemies: function ()
	{
		var enemy = this.enemies.create(230, 200, 'enemy')
		//enemy.anchor.setTo(0.5,0.5);
		enemy.animations.add('walkL',[0,1,2,3,4],9,true);
		enemy.animations.add('walkR',[11,12,13,14,15],9, true);
		enemy.animations.add('die', [22,23,24,25,26,27,28,29,30,31,32],4, false);
	},

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
		this.game.physics.arcade.collide(this.bullets, this.enemies, this.collisionHandler, null, this);
		
        this.game.physics.arcade.collide(player, block);
		//this.game.physics.arcade.collide(box1, block);
		this.game.physics.arcade.collide(player, box1);
		this.game.physics.arcade.collide(box2, block);
		this.game.physics.arcade.collide(player, box2);
		this.game.physics.arcade.collide(box3, block);
		this.game.physics.arcade.collide(player, box3);
		this.game.physics.arcade.collide(box4, block);
		this.game.physics.arcade.collide(player, box4);
		this.game.physics.arcade.collide(box5, block);
		this.game.physics.arcade.collide(player, box5);
		this.game.physics.arcade.collide(box6, block);
		this.game.physics.arcade.collide(player, box6);
		this.game.physics.arcade.collide(box7, block);
		this.game.physics.arcade.collide(player, box7);
		//This is all messed up but i have no time to fix it
		
		this.enemies.forEach(function(enemy)
		{
			this.game.physics.arcade.collide(enemy, block);
			this.game.physics.arcade.collide(enemy, box6);
			this.game.physics.arcade.collide(enemy, box7);
			
			if(enemy.body.velocity.x == 0)
			{
				enemy.body.velocity.x = 50;
			}
			if(this.game.physics.arcade.overlap(enemy, box1)) enemy.body.velocity.x = enemy.body.velocity.x * -1;
			if(this.game.physics.arcade.overlap(enemy, box3)) enemy.body.velocity.x = enemy.body.velocity.x * -1;
			if(this.game.physics.arcade.overlap(enemy, box5)) enemy.body.velocity.x = enemy.body.velocity.x * -1;
			if(this.game.physics.arcade.overlap(enemy, player))
			{
				this.score += 20;
				this.scoreText.text = this.scoreString + this.score;
				player.kill();
				this.state.start('MainMenu');
			}
			
			if(enemy.body.velocity.x > 0) enemy.animations.play('walkR');
			else if(enemy.body.velocity.x < 0) enemy.animations.play('walkL');
		},this);
		
		if (player.body.enable) {
			player.body.velocity.x = 0;
			
			if (this.cursors.left.isDown) {
				player.body.velocity.x = -90;
				player.animations.play('walkLeft');
				player.goesRight = false;

			} else if (this.cursors.right.isDown) {
				player.body.velocity.x = 90;
				player.animations.play('walkRight');
				player.goesRight = true;
			} else {
				player.animations.stop();
				if (player.goesRight) player.frame = 8;
				else player.frame = 0;
			}

			/*if (this.cursors.up.isDown && player.body.velocity.y==0) {
				player.body.velocity.y = -190;
				//player.animations.stop();
			} */
			if (this.cursors.up.isDown && player.body.velocity.y > 0 )
			{
				player.animations.play('flap');
				player.body.velocity.y = 30;
				if (this.cursors.left.isDown) 
				{
					player.body.velocity.x = -90;
					player.animations.play('flap');
					player.goesRight = false;
				}
				else if(this.cursors.right.isDown)
				{
					player.body.velocity.x = 90;
					player.frame = 8;
					player.goesRight = true;
				}
				
				if(this.cursors.down.isDown)
				{
					if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
					{	
						this.nextFire = this.game.time.now + this.fireRate;

						var bullet = this.bullets.getFirstDead();
						if(player.goesRight == true)
						{
							bullet.reset(player.x + 8, player.y + 20);
						}
						else
						{
							bullet.reset(player.x + 20, player.y + 20);
						}
						

						bullet.body.velocity.y = 190;
					}
				}
				if (player.goesRight) player.frame = 8;
				else player.frame = 0;
			}
			else if (this.cursors.up.isDown && player.body.velocity.y==0) {
				player.body.velocity.y = -190;
				player.animations.stop();
			} 
			
			if(this.cursors.down.isDown)
			{
				if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
				{	
					this.nextFire = this.game.time.now + this.fireRate;

					var bullet = this.bullets.getFirstDead();

					if(player.goesRight == true)
						{
							bullet.reset(player.x + 8, player.y + 20);
						}
						else
						{
							bullet.reset(player.x + 20, player.y + 20);
						}

					bullet.body.velocity.y = 190;
				}
			}

			/*if (player.body.velocity.y != 0) {
				if (player.goesRight)player.frame = 8;
				else player.frame = 0;
			}*/
		  }		
    },
	
	collisionHandler: function (bullet, enemy)
	{
		
		//enemy.kill();
		enemy.animations.play('die',4,false,true);
		var anim = this.game.add.sprite(enemy.x,enemy.y,'enemy');
		anim.animations.add('die', [22,23,24,25,26,27,28,29,30,31,32],4, false);
		enemy.kill();
		bullet.kill();
		anim.animations.play('die',4,false,true);
		
		this.score += 20;
		this.scoreText.text = this.scoreString + this.score;
		
		var enemy = this.enemies.create(230, 200, 'enemy')
		enemy.animations.add('walkL',[0,1,2,3,4],9,true);
		enemy.animations.add('walkR',[11,12,13,14,15],9, true);
		enemy.animations.add('die', [22,23,24,25,26,27,28,29,30,31,32],4, false);
		
		var enemy2 = this.enemies.create(430, 200, 'enemy')
		enemy2.animations.add('walkL',[0,1,2,3,4],9,true);
		enemy2.animations.add('walkR',[11,12,13,14,15],9, true);
		enemy2.animations.add('die', [22,23,24,25,26,27,28,29,30,31,32],4, false);
		
		this.enemies.setAll('body.gravity.y', 400);
		
		//enemiesRem = enemiesRem - 1;
		//level = level+1;

	},
	
    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
