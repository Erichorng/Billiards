var loadState = {
    preload: function () {
    game.load.image('whiteball', 'assets/whiteball.png');
    game.load.image('ball8', 'assets/ball8.png');
    game.load.image('table', 'assets/table.png');
    game.load.image('ball2', 'assets/ball2.png');
  
    game.load.image('ball3', 'assets/ball3.png');
    game.load.image('ball1', 'assets/ball1.png');
  
    },
    create: function() {
     //Go to the menu state
    game.state.start('test');
    }
}; 