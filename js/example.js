class example extends Phaser.Scene {
    constructor() {
        super({ key: "example", active: true });
        this.speed;
        this.lastFired = 0;
    }

    preload() {
        this.load.image('GFS', 'assets/derelict_spce.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('bullet', 'assets/bulate.png');
        this.load.image('enimy', 'assets/enimy.png');
    }

    create() {
        //background
        this.background = this.add.tileSprite(0, 0, 240, 360, 'GFS');
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);

        //player
        this.player = this.add.sprite(120, 260, 'player');
        this.player.displayWidth = 45;
        this.player.displayHeight = 45;

        //key handle
        this.keys_handle = this.input.keyboard.createCursorKeys();
        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //bullet
        var Bullet = new Phaser.Class({

            Extends: Phaser.GameObjects.Image,

            initialize:

                function Bullet(scene) {
                    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

                    this.speed = Phaser.Math.GetSpeed(400, 1);
                },

            fire: function (x, y) {
                this.setPosition(x, y - 50);

                this.setActive(true);
                this.setVisible(true);
            },

            update: function (time, delta) {
                this.y -= this.speed * delta;

                if (this.y < -50) {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }
        });

        this.bullets = this.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true
        });

        this.speed = Phaser.Math.GetSpeed(300, 1);

        //enimy
        this.enimies = this.add.group();
        this.enimies = true;
        //  this.enimies.physicsBodyType = phaser.Physics.ARCADE;


    }

    update(time, delta) {
        //scroll background
        this.background.tilePositionY -= 2;

        //key handle
        if (this.keys_handle.left.isDown) {
            this.player.x--;
        }

        if (this.keys_handle.right.isDown) {
            this.player.x++;
        }

        if (this.keys_handle.up.isDown) {
            this.player.y--;
        }

        if (this.keys_handle.down.isDown) {
            this.player.y++;
        }

        if (this.key_ENTER.isDown && time > this.lastFired) {
            var bullet = this.bullets.get();

            if (bullet) {
                console.log(this.player.x)
                bullet.fire(this.player.x, this.player.y);

                this.lastFired = time + 50;
            }
        }

        console.log()

    }

}