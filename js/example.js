class example extends Phaser.Scene {
    constructor() {
        super({ key: "example" });
        this.speed;
        this.lastFired = 0;
        this.enimy = [];
        this.enimy2 = [];
        this.i = 0;
        this.timer = 0;
        this.score = 0;
    }

    preload() {
        this.load.image('GFS', 'assets/derelict_spce.png');

        this.load.image('player', 'assets/player.png');
        this.load.image('bullet', 'assets/bulate.png');
        this.load.image('enimy', 'assets/enimy.png');
        this.load.image('enimy2', 'assets/Ship5.png');

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

        this.load.image('flight1', 'assets/Turbo_flight/Ship5_turbo_flight_001.png');
        this.load.image('flight2', 'assets/Turbo_flight/Ship5_turbo_flight_003.png');
        this.load.image('flight3', 'assets/Turbo_flight/Ship5_turbo_flight_005.png');
        this.load.image('flight4', 'assets/Turbo_flight/Ship5_turbo_flight_007.png');

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

        this.anims.create({
            key: 'flight',
            frames: [
                { key: 'flight1' },
                { key: 'flight2' },
                { key: 'flight3' },
                { key: 'flight4' }
            ],
            frameRate: 5,
            repeat: 100,
            //hideOnComplete: true
        });

        //background
        this.background = this.add.tileSprite(0, 0, 240, 360, 'GFS');
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);

        //player
        this.player = this.physics.add.sprite(120, 260, 'player');
        this.player.displayWidth = 45;
        this.player.displayHeight = 45;
        this.flight1 = this.add.sprite(110, 285, 'flight1').play('flight');
        this.flight2 = this.add.sprite(130, 285, 'flight1').play('flight');



        //key handle
        this.keys_handle = this.input.keyboard.createCursorKeys();
        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.key_ONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

        //bullet
        var Bullet = new Phaser.Class({

            Extends: Phaser.GameObjects.Sprite,

            initialize:

                function Bullet(scene) {
                    Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'bullet');
                    this.speed = Phaser.Math.GetSpeed(300, 1);
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
        this.enimy[this.i] = this.physics.add.sprite(150, 30, 'enimy');
        this.enimy[this.i].displayWidth = 45;
        this.enimy[this.i].displayHeight = 45;

        //enimy
        this.enimy2[this.i] = this.physics.add.sprite(90, 30, 'enimy2');
        this.enimy2[this.i].displayWidth = 45;
        this.enimy2[this.i].displayHeight = 45;

        //score
        this.scoreText = this.add.text(16, 20, "Score: 0", { font: "15px Impact", color: "white" });
    }

    randy(x, y) {
        return Phaser.Math.Between(x, y);
    }

    collision1(bullets, enimy) {
        bullets.destroy();
        enimy.destroy();
        this.add.sprite(bullets.x, bullets.y, 'explosion5').play('explosion');
        this.score++;
    }

    collision3(bullets, enimy2) {
        bullets.destroy();
        enimy2.destroy();
        this.add.sprite(bullets.x, bullets.y, 'explosion5').play('explosion');
        this.score++;
    }

    collision2(player, enimy) {
        player.destroy();
        this.add.sprite(player.x, player.y, 'explosion5').play('explosion');
        return true;
    }

    collision4(player, enimy) {
        player.destroy();
        this.add.sprite(player.x, player.y, 'explosion5').play('explosion');
        return true;
    }

    update(time, delta) {

        this.timer++;

        // this.physics.arcade.overlap(this.bullets,this.enimy,collision1,null,this);
        this.a = this.physics.overlap(this.bullets, this.enimy, this.collision1, null, this);
        this.b = this.physics.overlap(this.player, this.enimy, this.collision2, null, this);
        this.c = this.physics.overlap(this.bullets, this.enimy2, this.collision3, null, this);
        this.d = this.physics.overlap(this.player, this.enimy2, this.collision4, null, this);

        if (this.b == true || this.d == true) {
            setTimeout(() => {
                this.scoreText = this.add.text(60, 170, "GAME OVER", { font: "25px Impact", color: "white" });
                this.scene.pause();
            }, 1000)

        }

        //scroll background
        this.background.tilePositionY -= 2;

        //key handle
        if (this.keys_handle.left.isDown) {
            this.player.x--;
            this.flight1.x--;
            this.flight2.x--;
        }

        if (this.keys_handle.right.isDown) {
            this.player.x++;
            this.flight1.x++;
            this.flight2.x++;
        }

        if (this.keys_handle.up.isDown) {
            this.player.y--;
            this.flight1.y--;
            this.flight2.y--;
        }

        if (this.keys_handle.down.isDown) {
            this.player.y++;
            this.flight1.y++;
            this.flight2.y++;
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

        this.enimy[this.i].y += 0.9;


        this.enimy2[this.i].y += 0.5;

        //console.log(this.timer)
        if (this.timer / 400 % 1 == 0 && this.timer != 0) {
            this.enimy[this.i] = this.physics.add.sprite(this.randy(10, 230), 0, 'enimy');
            this.enimy[this.i].displayWidth = 45;
            this.enimy[this.i].displayHeight = 45;  
        }

        //console.log(this.timer)
        if (this.timer / 300 % 1 == 0 && this.timer != 0) {
            this.enimy2[this.i] = this.physics.add.sprite(this.randy(10, 230), 0, 'enimy2');
            this.enimy2[this.i].displayWidth = 45;
            this.enimy2[this.i].displayHeight = 45;
        }

        this.scoreText.setText("Score: " + this.score);
    }

}