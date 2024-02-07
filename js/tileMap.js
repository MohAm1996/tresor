import Hero from "./Hero.js";

export default class TileMap {
    constructor(tileSize) {

        this.tileSize = tileSize;
        //Images of the game
        this.hero = this.#image("hero.png");
        this.trap = this.#image("trap.png");
        this.tresor = this.#image("tresor.png");
        this.empty = this.#image("empty.png");
        this.map=[[]];
    }
    //loadImage
    #image(fileName) {
        const img = new Image();
        img.src = `../images/${fileName}`;
        return img;
    }
    // 0 : trap
    // 1 : tresor
    // 2 : Hero
    // 3 : empty

    //Map
    //initalization Map 10% tresor
    initalizationMap() {
        this.map=[
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        let validation = false;
        let randomRow;
        let randomcolumn;

        for (let i = 0; i < 38; i++) {

            while (!validation) {
                randomRow = Math.floor(Math.random() * (15));
                randomcolumn = Math.floor(Math.random() * (25));

                if (this.map[randomRow][randomcolumn] !== 1 && this.map[randomRow][randomcolumn] !== 2) {
                    this.map[randomRow][randomcolumn] = 1;
                    validation = true;
                }
            }

            validation = false;

        }
    }

    draw(ctx) {
        //draw map 
        //if map[row][column]==0 draw trap
        //if map[row][column]==1 draw tresor
        //if map[row][column]==3 draw empty
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[0].length; column++) {
                let tile = this.map[row][column];
                if (tile === 0) {
                    this.#drawTrap(ctx, column, row, this.tileSize);
                }
                if (tile === 1) {
                    this.#drawTresor(ctx, column, row, this.tileSize);
                }
                if (tile === 3) {
                    this.#drawEmpty(ctx, column, row, this.tileSize);
                }
            }
        }
    }
    //function for drawing trap
    #drawTrap(ctx, column, row, size) {
        ctx.drawImage(
            this.trap, column * this.tileSize, row * this.tileSize, size, size
        )
    }
    //function for drawing tresor
    #drawTresor(ctx, column, row, size) {
        ctx.drawImage(
            this.tresor, column * this.tileSize, row * this.tileSize, size, size
        )
    }
    //function for drawing empty tile
    #drawEmpty(ctx, column, row, size) {
        ctx.drawImage(
            this.empty, column * this.tileSize, row * this.tileSize, size, size
        )
    }
    //function for Creat hero
    getHero(velocity) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {

                let tile = this.map[row][column];
                if (tile === 2) {
                    this.map[row][column] = 3;
                    return new Hero(
                        column * this.tileSize,
                        row * this.tileSize,
                        this.tileSize,
                        velocity,
                        this
                    );
                }

            }
        }
    }
    //inialization the width and height of canvas
    setCanvasSize(canvas) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize
    }
}