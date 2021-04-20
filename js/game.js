var game = new Phaser.Game(1024, 640, Phaser.AUTO, 'canvas');

game.state.add('load', loadState);

game.state.add('test', testState);

game.state.start('load');