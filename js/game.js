var config = {
    type: Phaser.AUTO,
    width: 240,
    height: 320,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ start, example ]
};

var game = new Phaser.Game(config);

