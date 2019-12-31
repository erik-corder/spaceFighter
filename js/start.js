class start extends Phaser.Scene {
    constructor() {
        super({ key: "start", active: true });
    }

    preload() {
        this.load.image('GFS1', 'assets/derelict_spce.png');

        this.load.image('player1', 'assets/player.png');

        this.load.image('flight11', 'assets/Turbo_flight/Ship5_turbo_flight_001.png');
        this.load.image('flight22', 'assets/Turbo_flight/Ship5_turbo_flight_003.png');
        this.load.image('flight33', 'assets/Turbo_flight/Ship5_turbo_flight_005.png');
        this.load.image('flight44', 'assets/Turbo_flight/Ship5_turbo_flight_007.png');
    }

    create() {

        this.anims.create({
            key: 'flight',
            frames: [
                { key: 'flight11' },
                { key: 'flight22' },
                { key: 'flight33' },
                { key: 'flight44' }
            ],
            frameRate: 5,
            repeat: 1000    ,
            //hideOnComplete: true
        });

        //background
        this.background = this.add.tileSprite(0, 0, 240, 360, 'GFS1');
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);

        //player
        this.player = this.physics.add.sprite(120, 260, 'player1');
        this.player.displayWidth = 45;
        this.player.displayHeight = 45;
        this.flight1 = this.add.sprite(110, 285, 'flight11').play('flight');
        this.flight2 = this.add.sprite(130, 285, 'flight11').play('flight');

        //key handle
        this.keys_handle = this.input.keyboard.createCursorKeys();
        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.key_ONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

        //game title
        this.title = this.add.text(45, 120, "SPACE FIGHTER", { font: "25px Impact", color: "white" });
        this.scoreText = this.add.text(80, 160, "[ press 5 ]", { font: "15px Impact", color: "white" });
    
        this.input.keyboard.on('keyup',function(e){
            if(e.key == "5"){
                this.scene.start("example");
            }
        },this);
    }


   
    update(time, delta) {

        //scroll background
        this.background.tilePositionY -= 2;
    }

}