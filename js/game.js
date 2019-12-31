var config = {
    type: Phaser.AUTO,
    width: 240,
    height: 320,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ start, example ]
};

var game = new Phaser.Game(config);

