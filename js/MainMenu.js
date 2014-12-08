var TopDownGame = TopDownGame || {};

TopDownGame.MainMenu = function(){};

TopDownGame.MainMenu.prototype = {
      create: function()
      {
          
          this.ba = this.game.add.sprite(0, 0, 'AntSim');
          
          var text = "";
          var style = { font: "30px Arial", fill: "#fff", align: "center" };
          var t = this.game.add.text (this.game.centerX, this.game.center, text, style);
          
      },
      
      update: function()
      {
         if (this.game.input.activePointer.justPressed())
         {
             this.game.state.start('Game');
         }
      }
};