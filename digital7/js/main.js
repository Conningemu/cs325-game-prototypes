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
    
    var game = new Phaser.Game( 800, 800, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    //800,600
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'win', 'assets/winner.png' );
		game.load.image( 'nine', 'assets/nine.png');
		game.load.image( 'one', 'assets/one.png');
		game.load.image( 'two', 'assets/two.png');
		game.load.image( 'three', 'assets/three.png');
		game.load.image( 'four', 'assets/four.png');
		game.load.image( 'five', 'assets/five.png');
		game.load.image( 'six', 'assets/six.png');
		game.load.image( 'seven', 'assets/seven.png');
		game.load.image( 'eight', 'assets/eight.png');
		game.load.image( 'outside', 'assets/outside.png');
    }
    
    var one;
	var two;
	var three;
	var four;
	var five; 
	var six;
	var seven;
	var eight;
	var nine;
	
	var clicked = false;
	
    
    function create() {
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0,0,'outside');
		
		one  = game.add.sprite(200, 200, 'one');
		two  = game.add.sprite(400, 200, 'two');
		three  = game.add.sprite(600, 200, 'three');
		four  = game.add.sprite(200, 400, 'four');
		five  = game.add.sprite(400, 400, 'five');
		six  = game.add.sprite(600, 400, 'six');
		seven  = game.add.sprite(200, 600, 'seven');
		eight  = game.add.sprite(400, 600, 'eight');
		nine  = game.add.sprite(600, 600, 'nine');
		one.anchor.set(0.5);
		two.anchor.set(0.5);
		three.anchor.set(0.5);
		four.anchor.set(0.5);
		five.anchor.set(0.5);
		six.anchor.set(0.5);
		seven.anchor.set(0.5);
		eight.anchor.set(0.5);
		nine.anchor.set(0.5);
		one.count = 2;
		two.count = 2;
		three.count = 2;
		four.count = 2;
		five.count = 2;
		six.count = 2;
		seven.count = 2;
		eight.count = 2;
		nine.count = 2;
		
		rotate(one);
		rotate(two);
		rotate(three);
		rotate(four);
		rotate(five);
		rotate(six);
		rotate(seven);
		rotate(eight);
		rotate(nine);
		
		
				
		
    }
	function rotate(object) {
		object.angle += 90;
		if(object.angle >= 360)
		{
			object.angle = 0;
			
		}

	}
	function processClick()
	{
		if(game.input.mousePointer.isDown && clicked == false)
		{
			if(game.input.mousePointer.x>100 && game.input.mousePointer.x<300)
			{
				if(game.input.mousePointer.y>100 && game.input.mousePointer.y<300)
				{
					rotate(one);
					one.count++;
					if(one.count > 4) one.count = 1;
				}
				if(game.input.mousePointer.y>300 && game.input.mousePointer.y<500)
				{
					rotate(four);
					four.count++;
					if(four.count > 4) four.count = 1;
				}
				if(game.input.mousePointer.y>500 && game.input.mousePointer.y<700)
				{
					rotate(seven);
					seven.count++;
					if(seven.count > 4) seven.count = 1;
				}
			}
			if(game.input.mousePointer.x>300 && game.input.mousePointer.x<500)
			{
				if(game.input.mousePointer.y>100 && game.input.mousePointer.y<300)
				{
					rotate(two);
					two.count++;
					if(two.count > 4) two.count = 1;
				}
				if(game.input.mousePointer.y>300 && game.input.mousePointer.y<500)
				{
					rotate(five);
					five.count++;
					if(five.count > 4) five.count = 1;
				}
				if(game.input.mousePointer.y>500 && game.input.mousePointer.y<700)
				{
					rotate(eight);
					eight.count++;
					if(eight.count > 4) eight.count = 1;
				}
			}
			if(game.input.mousePointer.x>500 && game.input.mousePointer.x<700)
			{
				if(game.input.mousePointer.y>100 && game.input.mousePointer.y<300)
				{
					rotate(three);
					three.count++;
					if(three.count > 4) three.count = 1;
				}
				if(game.input.mousePointer.y>300 && game.input.mousePointer.y<500)
				{
					rotate(six);
					six.count++;
					if(six.count > 4) six.count = 1;
				}
				if(game.input.mousePointer.y>500 && game.input.mousePointer.y<700)
				{
					rotate(nine);
					nine.count++;
					if(nine.count > 4) nine.count = 1;
				}
			}
			clicked = true;
		}
		if(game.input.mousePointer.isUp)
		{
			clicked = false;
		}
	}
	
    
    function update() {
		processClick();
		//rotate(one);
		if(four.count == 1 || four.count == 4)
		{
			if(five.count == 1 || five.count == 3 || five.count == 4)
			{
				if(one.count == 1 && two.count == 1 && three.count == 1 && six.count == 1 && seven.count == 1 && eight.count == 1)
				{
					game.add.sprite(100, 300, 'win');
				}
			}
		}
    }


};
