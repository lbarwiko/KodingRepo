var TopDownGame = TopDownGame || {};

TopDownGame.GameOver = function(){};

TopDownGame.GameOver.prototype = {
      create: function()
      {
          
          this.game.stage.backgroundColor = "#2ECCFA";
          var text1 = this.game.add.text (this.game.centerX, 250, "GAME OVER", { font: "120px Arial", fill: "#FFFFFF", align: "center" });
          var text2 = this.game.add.text (this.game.centerX, 100, "Score: EVERYONE'S A WINNER!", { font: "35px Arial", fill: "#FFFFFF", align: "center" })
          var text = "Click to Play Again";
          var style = { font: "60px Arial", fill: "#FFFFFF", align: "center" };
          var t = this.game.add.text (this.game.centerX, 400, text, style);
          
      },
      
      update: function()
      {
         if (this.game.input.activePointer.justPressed())
         {
             this.game.state.start('Game');
         }
      }
};
