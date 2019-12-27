class example extends Phaser.Scene {
    constructor() {
        super({ key: "example", active: true });
        this.speed;
        this.lastFired = 0;
        this.enimy = [];
        this.i = 0;
        this.timer = 0;
    }

    preload() {
        this.load.image('GFS', 'assets/derelict_spce.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('bullet', 'assets/bulate.png');
        this.load.image('enimy', 'assets/enimy.png');

        this.load.image('explosion1', 'assets/Explosion2/Explosion2_1.png');
        this.load.image('explosion2', 'assets/Explosion2/Explosion2_2.png');
        this.load.image('explosion3', 'assets/Explosion2/Explosion2_3.png');
        this.load.image('explosion4', 'assets/Explosion2/Explosion2_4.png');
        this.load.image('explosion5', 'assets/Explosion2/Explosion2_5.png');
        this.load.image('explosion6', 'assets/Explosion2/Explosion2_6.png');
        this.load.image('explosion7', 'assets/Explosion2/Explosion2_7.png');
        this.load.image('explosion8', 'assets/Explosion2/Explosion2_8.png');
        this.load.image('explosion9', 'assets/Explosion2/Explosion2_9.png');
        this.load.image('explosion10', 'assets/Explosion2/Explosion2_10.png');
        this.load.image('explosion11', 'assets/Explosion2/Explosion2_11.png');

        this.load.audio('fire', 'assets/audio/fire.mp3');
    }

    create() {

        //exposion
        this.animation = this.anims.create({
            key: 'explosion',
            frames: [
                { key: 'explosion1' },
                { key: 'explosion2' },
                { key: 'explosion3' },
                { key: 'explosion4' },
                { key: 'explosion5' },
                { key: 'explosion6' },
                { key: 'explosion7' },
                { key: 'explosion8' },
                { key: 'explosion9' },
                { key: 'explosion10' },
                { key: 'explosion11' }
            ],
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        });

        //background
        this.background = this.add.tileSprite(0, 0, 240, 360, 'GFS');
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);

        //player
        this.player = this.physics.add.sprite(120, 260, 'player');
        this.player.displayWidth = 45;
        this.player.displayHeight = 45;
        this.player.setScale(0.2, 0.2);

        //key handle
        this.keys_handle = this.input.keyboard.createCursorKeys();
        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //bullet
        var Bullet = new Phaser.Class({

            Extends: Phaser.GameObjects.Sprite,

            initialize:

                function Bullet(scene) {
                    Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'bullet');

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

        this.bullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true
        });

        this.speed = Phaser.Math.GetSpeed(300, 1);

        //enimy
        this.enimy[this.i] = this.physics.add.sprite(120, 30, 'enimy');
        this.enimy[this.i].displayWidth = 45;
        this.enimy[this.i].displayHeight = 45;
    }

    randy(x, y) {
        return Phaser.Math.Between(x, y);
    }

    collision1(bullets, enimy) {
        bullets.destroy();
        enimy.destroy();
        this.add.sprite(bullets.x, bullets.y, 'explosion5').play('explosion');
    }

    collision2(player, enimy) {
        player.destroy();
        this.add.sprite(player.x, player.y, 'explosion5').play('explosion');
    }

    update(time, delta) {

        this.timer++;

        // this.physics.arcade.overlap(this.bullets,this.enimy,collision1,null,this);
        this.a = this.physics.overlap(this.bullets, this.enimy, this.collision1, null, this);
        this.b = this.physics.overlap(this.player, this.enimy, this.collision2, null, this);

        //scroll background
        this.background.tilePositionY -= 2;

        //key handle
        if (this.keys_handle.left.isDown) {
            this.player.x--;
            // this.player.angle -= 1;
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
                bullet.fire(this.player.x, this.player.y);
                this.lastFired = time + 50;
            }

            var fire = this.sound.add('fire');
            fire.play();
        }
        for (var i = 0; i <= 10; i++) {
            // this.enimy[this.i].x -= 0.08;
            this.enimy[this.i].y += 0.08;
        }

        //console.log(this.timer)
        if (this.timer / 400 % 1 == 0 && this.timer != 0) {
            this.enimy[this.i] = this.physics.add.sprite(this.randy(10, 230), 0, 'enimy');
            this.enimy[this.i].displayWidth = 45;
            this.enimy[this.i].displayHeight = 45;
        }
    }

}