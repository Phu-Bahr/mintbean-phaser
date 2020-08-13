import Phaser from "phaser";
import mp3 from "../assets/Orbital Colossus.mp3";
import sky from "../assets/sky.png";
import tofu from "../assets/tofu.png";
import apple from "../assets/apple.png";
import ground from "../assets/ground.png";
import star from "../assets/star.png";
import { accelerate, decelerate } from "../utils";

let platforms;
let player;
let cursors;
let background;
let apples;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, { key: "game" });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image("sky", sky);
    this.load.image("ground", ground);
    this.load.image("apple", apple);
    this.load.image("tofu", tofu);
  },

  create: function create() {
    background = this.add.image(400, 300, "sky");
    background.setScale(5);

    apples = this.physics.add.sprite(150, 200, "apple").setScale(0.1);

    platforms = this.physics.add.staticGroup();

    platforms
      .create(400, 568, "ground")
      .setScale(0.9)
      .refreshBody();

    platforms
      .create(600, 400, "ground")
      .setScale(0.3)
      .refreshBody();
    platforms
      .create(150, 240, "ground")
      .setScale(0.05)
      .refreshBody();
    platforms
      .create(750, 220, "ground")
      .setScale(0.3)
      .refreshBody();

    player = this.physics.add.sprite(100, 450, "tofu").setScale(0.1);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
  },
  update: function update() {
    function collectApple(player, apples) {
      apples.disableBody(true, true);
      this.scene.start("winscreen");
    }

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(apples, platforms);
    this.physics.add.overlap(player, apples, collectApple, null, this);
    cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
});
