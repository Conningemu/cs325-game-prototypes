window.onload = function() {
    
    "use strict";
    
    var game = new Phaser.Game( 800, 840, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'board', 'assets/board.png' );
		game.load.image('baseS', 'assets/cards/BaseTestSword.png');
		game.load.image('baseB', 'assets/cards/BaseTestBow.png');
		game.load.image('baseC', 'assets/cards/BaseTestCat.png');
    }
	
	var deck = [];
	var deckPool;
	var deck1 = [];
	var deckPool1;
	//Your stuff
	var hand = [];
	var sword = []; //ID 1
	var bow = [];	//ID 2
	var cat = [];	//ID 3
	//Enemy player's stuff
	var hand1 = [];
	var sword1 = [];
	var bow1 = [];
	var cat1 = [];
	
	var hold = 0;
	var hold1 = 0;
	
	//Actions performed
	var turnsPlayed = 0;
	var actionPlayed = false;
	
	function playCard()
	{
		if(actionPlayed == true)
		{
			return;
		}
		deckPool.forEach(function(card)
		{
			if(card.input.pointerOver())
			{
				//console.log("HERE "+ card.id);
				if(card.id == 1 && card.inHand == true)
				{
					card.position.x = 60 + (sword.length * 85);
					card.position.y = 422;
					//console.log(card.id);
					card.inHand = false;
					//console.log(card.inHand);
					sword.push(card);
				}
				if(card.id == 2 && card.inHand == true)
				{
					card.position.x = 60 + (bow.length * 85);
					card.position.y = 522;
					//console.log(card.id);
					card.inHand = false;
					//console.log(card.inHand);
					bow.push(card);
				}
				if(card.id == 3 && card.inHand == true)
				{
					card.position.x = 60 + (cat.length * 85);
					card.position.y = 622;
					//console.log(card.id);
					card.inHand = false;
					//console.log(card.inHand);
					cat.push(card);
				}
				actionPlayed = true;
			}
		},this);
	}
    
    function create() {
		//board
        game.add.sprite( 0, 0, 'board' );
		/*
		deck = game.add.group();
		deck1 = game.add.group();
       */
	   deckPool = game.add.group();
	   deckPool1 = game.add.group();
        for(var i = 0; i < 16; i++)
		{
			var rand = Math.floor((Math.random() * 3) + 1);
			if( rand == 1)
			{
				var card = deckPool.create(60 + (i * 85),422,'baseS');  //Use this for playing in melee
				var card1 = deckPool1.create(60 + (i * 85),422,'baseS');
				//deckPool.add(card);
				card.id = 1;
				card1.id = 1;
				card.str = 4;
				card1.str = 4;
			}
			else if (rand == 2)
			{
				var card = deckPool.create(60 + (i * 85),422,'baseB');  //Use this for playing in melee
				var card1 = deckPool1.create(60 + (i * 85),422,'baseB');
				//deckPool.add(card);
				card.id = 2;
				card1.id = 2;
				card.str = 4;
				card1.str = 4;
			}
			else if (rand == 3)
			{
				var card = deckPool.create(60 + (i * 85),422,'baseC');  //Use this for playing in melee
				var card1 = deckPool1.create(60 + (i * 85),422,'baseC');
				//deckPool.add(card);
				card.id = 3;
				card1.id = 3;
				card.str = 4;
				card1.str = 4;
			}
			
			card.inHand = true;
			card.inputEnabled = true;
			card.input.useHandCursor;
			card.events.onInputDown.add(playCard, this);
			card.kill();
			card1.kill();
			
			deck.push(card);
			deck1.push(card1);
		}
		for(var i = 0; i < 8; i++)
		{
			hand.push(deck.pop());
			hand1.push(deck1.pop());
			
			hand[i].revive();
			hand[i].position.x = 20 + (i * 85);
			hand[i].position.y = 732;
			console.log(hand[i].id);
		}
    }
    
    function update() {
		//enemy turn 
		if (actionPlayed == true)
		{
			//console.log(hand1.length);
			var card1 = hand1.pop();
			card1.revive()
			
			if(card1.id == 1)
			{
				card1.position.x = 60 + (sword1.length * 85);
				card1.position.y = 318;
				card1.inHand = false;
				sword1.push(card1);
			}
			if(card1.id == 2)
			{
				card1.position.x = 60 + (bow1.length * 85);
				card1.position.y = 218;
				card1.inHand = false;
				bow1.push(card1);
			}
			if(card1.id == 3)
			{
				card1.position.x = 60 + (cat1.length * 85);
				card1.position.y = 118;
				card1.inHand = false;
				cat1.push(card1);
				//cat1.pop().kill();
			}
			actionPlayed = false;
			
			//Combat
			
			for(var i = 0; i < sword.length; i++)
			{
				for(var j = 0; j < sword1.length; j++)
				{	
					if(sword[i].str > 0 && sword1[j].str > 0) 
					{
						hold = sword[i].str;
						//console.log(sword[i].str);
						hold1 = sword1[j].str;
						sword[i].str = sword[i].str - hold1;
						//console.log(sword[i].str);
						sword1[j].str = sword1[j].str - hold;
					}
					if(sword[i].str < 0) sword[i].str = 0;
					if(sword1[j].str < 0) sword1[j].str = 0;
				}
				for(var j = 0; j < bow1.length; j++)
				{
					if(sword[i].str > 0 && bow1[j].str > 0) 
					{
						hold = sword[i].str/2;
						hold1 = bow1[j].str * 2;
						sword[i].str = sword[i].str - hold1;
						console.log(sword[i].str + " Bow str: " + bow1[j].str);
						bow1[j].str = bow1[j].str - hold;
					}
						if(sword[i].str < 0) sword[i].str = 0;
						if(bow1[j].str < 0) bow1[j].str = 0;
				}
				for(var j = 0; j < cat1.length; j++)
				{
					if(sword[i].str > 0 && cat1[j].str > 0) 
					{
						hold = sword[i].str * 2;
						hold1 = cat1[j].str/2;
						sword[i].str = sword[i].str - hold1;
						cat1[j].str = cat1[j].str - hold;
					}
						if(sword[i].str < 0) sword[i].str = 0;
						if(cat1[j].str < 0) cat1[j].str = 0;
				}
			}
			for(var i = 0; i < bow.length; i++)
			{
				for(var j = 0; j < sword1.length; j++)
				{
					if(bow[i].str > 0 && sword1[j].str > 0) 
					{
						hold = bow[i].str * 2;
						hold1 = sword1[j].str/2;
						bow[i].str = bow[i].str - hold1;
						sword1[j].str = sword1[j].str - hold;
					}
					if(bow[i].str < 0) bow[i].str = 0;
					if(sword1[j].str < 0) sword1[j].str = 0;
				}
				for(var j = 0; j < bow1.length; j++)
				{
					if(bow[i].str > 0 && bow1[j].str > 0) 
					{
						hold = bow[i].str;
						hold1 = bow1[j].str;
						bow[i].str = bow[i].str - hold1;
						bow1[j].str = bow1[j].str - hold;
					}
					if(bow[i].str < 0) bow[i].str = 0;
					if(bow1[j].str < 0) bow1[j].str = 0;
				}
				for(var j = 0; j < cat1.length; j++)
				{
					if(bow[i].str > 0 && cat1[j].str > 0) 
					{
						hold = bow[i].str/2;
						hold1 = cat1[j].str * 2;
						bow[i].str = bow[i].str - hold1;
						cat1[j].str = cat1[j].str - hold;
					}
					if(bow[i].str < 0) bow[i].str = 0;
					if(cat1[j].str < 0) cat1[j].str = 0;
				}
			}
			for(var i = 0; i < cat.length; i++)
			{
				for(var j = 0; j < sword1.length; j++)
				{
					if(cat[i].str > 0 && sword1[j].str > 0) 
					{
						hold = cat[i].str / 2;
						hold1 = sword1[j].str * 2;
						cat[i].str = cat[i].str - hold1;
						sword1[j].str = sword1[j].str - hold;
					}
					if(cat[i].str < 0) cat[i].str = 0;
					if(sword1[j].str < 0) sword1[j].str = 0;
				}
				for(var j = 0; j < bow1.length; j++)
				{
					if(cat[i].str > 0 && bow1[j].str > 0) 
					{
						hold = cat[i].str * 2;
						hold1 = bow1[j].str/2;
						cat[i].str = cat[i].str - hold1;
						bow1[j].str = bow1[j].str - hold;
					}
					if(cat[i].str < 0) cat[i].str = 0;
					if(bow1[j].str < 0) bow1[j].str = 0;
				}
				for(var j = 0; j < cat1.length; j++)
				{
					if(cat[i].str > 0 && cat1[j].str > 0) 
					{
						hold = cat[i].str * 2;
						hold1 = cat1[j].str/2;
						cat[i].str = cat[i].str - hold1;
						cat1[j].str = cat1[j].str - hold;
					}
					if(cat[i].str < 0) cat[i].str = 0;
					if(cat1[j].str < 0) cat1[j].str = 0;
				}
			}
			//kills dead cards
			
			for(var i = 0; i < sword.length; i++)
			{
				if(sword[i].str == 0)
				{	
					sword[i].kill();3-
					sword.splice(i,1);
					i--;
				}
			}
			for(var i = 0; i < bow.length; i++)
			{
				if(bow[i].str == 0)
				{	
					bow[i].kill();
					bow.splice(i,1);
					i--;
				}
			}
			for(var i = 0; i < sword1.length; i++)
			{
				if(sword1[i].str == 0)
				{	
					sword1[i].kill();
					sword1.splice(i,1);
					i--;
				}
			}
			for(var i = 0; i < bow1.length; i++)
			{
				if(bow1[i].str == 0)
				{	
					bow1[i].kill();
					bow1.splice(i,1);
					i--;
				}
			}
			for(var i = 0; i < cat.length; i++)
			{
				if(cat[i].str == 0)
				{	
					console.log("Does it go here?");
					cat[i].kill();
					cat.splice(i,1);
					i--;
				}
			}
			for(var i = 0; i < cat1.length; i++)
			{
				if(cat1[i].str == 0)
				{	
					console.log("Go here?");
					cat1[i].kill();
					cat1.splice(i,1);
					i--;
				}
			}
		}
		//if(deckPool.forEach.input.pointerOver())
    }
};
