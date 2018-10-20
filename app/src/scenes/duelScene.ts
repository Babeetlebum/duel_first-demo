import {
    Scene,
} from "phaser";

import {
    Player,
} from "../sprites/index";

import ForestTrees from "../../assets/forest_map_trees.png";
import ForestTiles from "../../assets/forest_map_tileset.png";
import DuelMap from "../../assets/duel_map.json";

export class DuelScene extends Scene {
    public cursors: Phaser.Input.Keyboard.CursorKeys;
    public player: Phaser.Physics.Arcade.Sprite;
    public map: Phaser.Tilemaps.Tilemap;

    public preload() {
        Player.load(this);
        this.load.image("forest_map_trees", ForestTrees);
        this.load.image("forest_map_tileset", ForestTiles);
        this.load.tilemapTiledJSON("duelMap", DuelMap);
    }

    public create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 200, 200, this.cursors);

        this.map = this.make.tilemap({ key: "duelMap" });
        const mapTileset = this.map.addTilesetImage("forest_terrain", "forest_map_tileset");
        const treesTileset = this.map.addTilesetImage("forest_trees", "forest_map_trees");

        const groundLayer = this.map.createStaticLayer("Left/Left", mapTileset, 0, 0)
            .setCollisionByExclusion([-1]);
        const platformLayer = this.map.createStaticLayer("Right/Right", mapTileset, 0, 0)
            .setCollisionByExclusion([-1]);
        const bridgeLayer = this.map.createStaticLayer("Bridge", mapTileset, 0, 0)
            .setCollisionByExclusion([-1]);

        this.physics.world
            .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
            .setBoundsCollision(true);

        this.cameras.main
            .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
            .startFollow(this.player)
            .setBackgroundColor("#ccccff");

        this.physics.add.collider(groundLayer, this.player);
        this.physics.add.collider(platformLayer, this.player);
        this.physics.add.collider(bridgeLayer, this.player);
    }

}
