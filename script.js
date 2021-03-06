
	//Create the canvas with JS

		var counter = 0;

		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = 512;
		canvas.height = 480;

		document.body.appendChild(canvas);

		//make a background image!
		var bgImage = new Image();
		var bgReady = false;
		bgImage.onload = function(){
			bgReady = true;
		}

		bgImage.src = "background.png";

		//Make the hero
		var hero = new Image();
		hero.src = "hero.png";
		var heroObj = {
			speed: 200, //movement in pixels per second
			x: 240,
			y: 224
		};

		var goblin = new Image();
		goblin.src = "goblin.png";
		var goblinObj = {
			x: 100,
			y: 100
		}

		var trees = {
			left: 30,
			right: 30,
			top: 28,
			bottom: 32
		}

		// Handler for keyboard Actions
		var keysDown = {};

		addEventListener('keydown', function(e){
			keysDown[e.keyCode] = true;
		});

		addEventListener('keyup', function(e){
			delete keysDown[e.keyCode];
		});
		console.log(hero)

		//Function that checks to make sure the hero is within the border of the trees
		var checkBoundaries = function(){
			if(heroObj.x < 0 + trees.left){
				heroObj.x = trees.left;
			}else if(heroObj.x > canvas.width - trees.right - hero.width){
				heroObj.x = canvas.width - hero.width - trees.right;
			}
			if(heroObj.y < 0 + trees.top){
				heroObj.y = trees.top;
			}else if(heroObj.y > canvas.height - trees.bottom - hero.height){
				heroObj.y = canvas.height - hero.height - trees.bottom;
			}
		}


		var moveHero = function(modifier){
			if(38 in keysDown){
				//User pressed up
				heroObj.y -= heroObj.speed * modifier;
			}
			if(40 in keysDown){
				heroObj.y += heroObj.speed * modifier;
			}
			if(37 in keysDown){
				heroObj.x -= heroObj.speed * modifier;
			}
			if(39 in keysDown){
				heroObj.x += heroObj.speed * modifier;
			}
		}

		var resetPositions = function(){
			heroObj.x = (canvas.width/2) - (hero.width/2);
			heroObj.y = (canvas.height/2) - (hero.height/2);
			goblinObj.x = (Math.random() * (canvas.width - goblin.width - trees.left - trees.right)) + trees.left;
			goblinObj.y = (Math.random() * (canvas.height - goblin.height - trees.top - trees.bottom)) + trees.top;
		}

		var checkCollision = function(){
			if( heroObj.x <= (goblinObj.x + hero.width) &&
				goblinObj.x <= (heroObj.x + goblin.width) &&
				heroObj.y <= (goblinObj.y + hero.height) &&
				goblinObj.y <= (heroObj.y + goblin.height)) {
				//Hero has made collision with goblin
				counter++;
				resetPositions();
			}
		}


		// Update Function
		// This will update the canvas images that are moving
		// It will change the hero's location and eventually , check to see if he touched monster
		var update = function(modifier){
			moveHero(modifier);
			checkBoundaries();
			checkCollision();
		}
		//Draw our stuff
		var render = function(){
			if(bgReady){
				ctx.drawImage(bgImage, 0, 0);
			}
			ctx.drawImage(goblin, goblinObj.x, goblinObj.y);
			ctx.drawImage(hero, heroObj.x, heroObj.y)
		}

		

		var main = function(){

			var now = Date.now();
			var delta = now - then;
			update(delta / 1000);
			render();
			then = now;
			requestAnimationFrame(main)
		}
		var then = Date.now();
		main();
