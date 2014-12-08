var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){};

TopDownGame.Game.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('Forest File', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('Tile Layer 1');
    this.middleLayer = this.map.createLayer('Tile Layer 2')
    this.blockedLayer = this.map.createLayer('Tile Layer 3');

    this.backgroundlayer.wrap = true;
    this.middleLayer.wrap = true;
    this.blockedLayer.wrap = true;
    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'Tile Layer 3');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();


    this.Enemy = function (index, game, player, bullets) {

        var x = this.game.world.randomX;
        var y = this.game.world.randomY;

        this.game = game;
        this.health = 3;
        this.player = player;
        this.bullets = bullets;
        this.fireRate = 1000;
        this.nextFire = 0;
        this.alive = true;
    
        //this.shadow = game.add.sprite(x, y, 'enemy', 'shadow');
        this.tank = this.game.add.sprite(x, y, 'spider');
        this.tank.animations.add('spiderwalk', [5,6,7,8,9], 10, true);
        this.tank.animations.add('spiderattack', [0,1,2,3,4], 10, true);
    
        //this.shadow.anchor.set(0.5);
        this.tank.anchor.set(0.5);
    
    
        this.tank.name = index.toString();
        this.game.physics.enable(this.tank, Phaser.Physics.ARCADE);
        this.tank.body.immovable = false;
        this.tank.body.collideWorldBounds = true;
    
        this.tank.body.linearDamping = 1;
        this.tank.angle = this.game.rnd.angle();
        /*player.animations.add('left', [3,4,5], 10, true);
        player.animations.add('right', [3,6,7], 10, true);
        player.animations.add('walk', [3,4,5,6,7], 10, true);
        player.animations.add('sprint', [3,4,5,6,7], 5, true);*/


    };
    
    this.Enemy.prototype.update = function() {

        if (this.game.physics.arcade.distanceBetween(this.tank, this.player) < 100)
        {
            this.tank.rotation = this.game.physics.arcade.moveToObject(this.tank, this.player, 100);
        }
        else
        {
            
            //this.tank.rotation = this.game.physics.arcade.moveToObect(this.tank,food,90);
        }
    };
    //global variables
    this.land;

    //this.shadow;
    this.player;
    
    this.enemies;
    this.enemyBullets;
    this.enemiesTotal = 0;
    this.enemiesAlive = 0;
    
    this.logo;
    
    this.currentSpeed = 0.0;
    this.cursors;
    
    
    
    this.food;
    this.collectedFood = 0.0;
    this.storedFood = 0.0;
    this.collectedFoodText;
    this.storedFoodText;
    this.healthText
    this.dropOff;
    this.pickUp;
    this.dropFood;
    this.sprint;
    this.waitDrop = 60;
    this.playerHealth = 100;
    this.waitDrop = 0;
    this.sprintCoolDown = 0;
    this.sprintDurration = 0;
    this.timeText = 0;
    this.timeLeft = 100;
    this.timeLeft_10 = 9;
    this.currentSpeed = 0;
    this.timeLeft = 3600;
    
    

    //create player

    this.player = this.game.add.sprite(300,300, 'ant',3);
    this.game.physics.arcade.enable(this.player);
    this.player.anchor.setTo(0.5,0.5);
    
    this.player.body.drag.set(0.2);
    this.player.body.maxVelocity.setTo(400, 400);
    this.player.body.collideWorldBounds = true;
    this.player.animations.add('left', [3,4,5], 10, true);
    this.player.animations.add('right', [3,6,7], 10, true);
    this.player.animations.add('walk', [3,4,5,6,7], 10, true);
    
    //the camera will follow the player in the world
    this.camera.follow(this.player);
    
    this.sustenance = this.game.add.group();

    //  We will enable physics for any star that is created in this group
    this.sustenance.enableBody = true;
    
    //this.newEnemy = this.Enemy(1,this.game,this.player,this.enemyBullets);
    //this.newEnemy2 = this.Enemy(2,this.game,this.player,this.enemyBullets);

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 50; i++)
    {

        var randX = this.game.world.randomX;
        var randY = this.game.world.randomY;
        this.food = this.sustenance.create( randX, randY, 'star');
        // var numFood = Math.floor(Math.random() * (3) + 1);

    }
    
    this.colony = this.game.add.group();
    this.colony.enableBody = true;
    this.home = this.colony.create(170, 305, 'anthill');
    
    this.player.bringToTop();
    
    this.game.camera.follow(this.player);
    this.game.camera.deadzone = new Phaser.Rectangle(200,200,400,250);
    this.game.camera.focusOnXY(0,0);
    
    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
    

  },


  update: function() {
    //collision
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    
    this.waitDrop -= 1;
    this.sprintCoolDown -= 1;
    this.timeLeft -=1;
    // sprintDurration -= 1;
    var pickUp = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    var dropOff = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    var dropFood = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
    var sprint = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
 
    
    if(pickUp.isDown){
        //BROKE
        this.game.physics.arcade.overlap(this.player, this.sustenance, this.collectFood, null, this);
    }
    if(dropOff.isDown){
        //BROKEN
        if(this.collectedFood > 0)
        {
            this.game.physics.arcade.overlap(this.player, this.colony, this.storeFood, null, this);
        }
            
    }
    if(dropFood.isDown)
    {
        if((this.collectedFood > 0) && (this.waitDrop < 0))
        {
            this.food = this.sustenance.create( this.player.x, this.player.y, 'star');
            this.collectedFood--;
            this.waitDrop = 60;
            //collectedFoodText.text = 'Collected Food: ' + collectedFood;
        }
    }
    if(sprint.isDown)
    {
           if(this.sprintCoolDown <= 0)
           {
               this.currentSpeed = 650 - 50 * this.collectedFood;
               this.sprintCoolDown = 600;
               this.player.animations.play('walk');
           }
    }
    if (this.cursors.left.isDown)
    {
        this.player.angle -= 4;
        //player.animations.play('left');
    }
    else if (this.cursors.right.isDown)
    {
        this.player.angle += 4;
        //player.animations.play('right');
    }

    if (this.cursors.up.isDown)
    {
        //  The speed we'll travel at
        //if (sprintDuration > 0 )
        //{
         //   currentSpeed = 1000 - 5 * collectedFood;
        //}
        //else
       // {
       
         if (this.currentSpeed <= 100)
         {
            this.currentSpeed = 100 - 7 * this.collectedFood;
            this.player.animations.play('walk');
         }
         else if(this.currentSpeed > 100)
         {
             this.currentSpeed -= 10;
             this.player.animations.play('walk');
         }
      
         //this.currentSpeed = 100;
         //this.player.animations.play('walk');
       // }

    }
    else
    {
        if (this.currentSpeed >= 10)
        {
            this.currentSpeed -= 10;
        }
        if (this.currentSpeed < 10)
        {
            this.currentSpeed = 0.0000000000000000001;
        }
        this.player.animations.stop();

        this.player.frame = 3;
    }
    if (this.currentSpeed > 0)
    {
        this.game.physics.arcade.velocityFromRotation(this.player.rotation, this.currentSpeed, this.player.body.velocity);
    }
    if(this.timeLeft <0)
    {
        this.state.start('GameOver');
    }
    
  },
  
  collectFood: function(myAnt, myFood){
      myFood.kill();
      this.collectedFood += 1;
  },
  
  hitPlayer: function()
  {
      
  },
  
  storeFood : function(myAnt, myCol)
  {
      this.storedFood += this.collectedFood;
      this.collectedFood = 0;
  },

  render: function()
    {
    //this.game.debug.text('Enemies: ' + enemiesAlive + ' / ' + enemiesTotal, 32, 32);
    this.game.debug.text('Food Grabbed: ' + this.collectedFood, 32, 48);
    this.game.debug.text('Stored Food: ' + this.storedFood, 32, 64);
    if(this.timeLeft > 10)
    {
        this.game.debug.text('TIME LEFT: '  + (this.timeLeft/60).toString().substring(0,3), 380, 48);
    }
    if(this.sprintCoolDown > 0)
    {
        this.game.debug.text('Sprint Cooldown: ' + (this.sprintCoolDown / 60).toString().substring(0,3), 32, 80);
    }
    else
    {
        this.game.debug.text('Sprint Ready!', 32, 80);
    }
    this.game.debug.text('Q: Grab food, W: Dropoff food, R: Drop food, Space: Sprint', 32, 580);
    }
};