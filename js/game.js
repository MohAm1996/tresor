//for inializing energy = 40 , score=0
let scoreCount = 0;
let energieCount = 40;
//DOM
const progress = document.getElementById("progress-bar");
const enegryCountId = document.getElementById("enegryCountId");
const scoreEliment = document.getElementById("scoreUpdate");

var box = document.getElementById("GameOverAlert");
var exitbox = document.getElementById("exit");
var finalScore = document.getElementById("finalScore");
var finalScoreExit = document.getElementById("finalScoreExit");
var span = document.getElementsByClassName("close")[0];
var isExite = false;
//class Hero
export default class Hero {
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity
        this.tileMap = tileMap;
        this.gameoverVar = false;
        //for moving when user click on arrows or exit when click on E
        document.addEventListener("keydown", this.#keydown);
        //load Hero Image
        this.#loadHeroImages();
        this.inializationProgress();
    }
    //draw hero
    draw(ctx) {
        ctx.drawImage(this.heroImage, this.x, this.y, this.tileSize, this.tileSize)
    }
    //load Hero Image
    #loadHeroImages() {
         this.heroImage = new Image();
        this.heroImage.src = "../images/hero.png";
    }
    //key event
    #keydown = (event) => {
        if (energieCount > 0 && !isExite)
            switch (event.keyCode) {
                case 37:
                    //left
                    if (this.getIndex(this.x) > 0) {
                        this.x -= this.tileSize;
                        this.UpdateScoreAndEnergy(this.tileMap.map[this.getIndex(this.y)][this.getIndex(this.x)]);
                        this.tileMap.map[this.getIndex(this.y)][this.getIndex(this.x)] = 3;
                    }

                    break;
                case 38:
                    //up
                    if (this.getIndex(this.y) > 0) {
                        this.y -= this.tileSize;
                        this.UpdateScoreAndEnergy(this.tileMap.map[this.getIndex(this.y)][this.getIndex(this.x)]);
                        this.tileMap.map[this.getIndex(this.y)][this.getIndex(this.x)] = 3;
                    }



                    break;
                case 39:
                    //right
                    if (this.getIndex(this.x) < 24) {
                        this.x += this.tileSize;
                        this.UpdateScoreAndEnergy(this.tileMap.map[this.getIndex(this.y)][this.getIndex(this.x)]);
                        this.tileMap.map[this.getIndex(this.y)][this.getIndex(this.x)] = 3;
                    }

                    break;
                case 40:
                    //down
                    if (this.getIndex(this.y) < 14) {
                        this.y += this.tileSize;
                        this.UpdateScoreAndEnergy(this.tileMap.map[this.getIndex(this.y)][this.getIndex(this.x)]);
                        this.tileMap.map[this.getIndex(this.y)][this.getIndex(this.x)] = 3;
                    }
                    break;
                    //E
                case 69: 
                    isExite = true;
                    exitbox.style.display = "block";
                    finalScoreExit.innerHTML = scoreCount;
                    document.getElementById("retryExit").addEventListener("click", this.ReinitalizationProgress);
                    break;
            }
    }
    //getIndex on the Map
    getIndex(size) {
        return Math.round(size / this.tileSize)
    }
    //inialization Progress bar energy
    inializationProgress() {
        progress.style.width = "100%";
        progress.style.backgroundColor = "green";
        energieCount = 40;
    }
    //updating score
    UpdateScoreAndEnergy(tileCase) {
        switch (tileCase) {
            case 0:
                scoreCount -= 50;
                energieCount -= 1;
                this.PrograssUpdate();
                break;
            case 1:
                scoreCount += 1000;
                break;
            case 3:
                scoreCount -= 10;
                break;
        }
        scoreEliment.innerHTML = scoreCount;
    }
    //progress updating green when is > 20 , orange between 5 and 20 , red less then 5
    PrograssUpdate() {
        if (energieCount > 0) {
            enegryCountId.innerHTML = energieCount;
            progress.style.width = (energieCount / 40) * 100 + "%";
        } else {
            this.GameOver();
        }
        console.log("engrg", energieCount);
        if (energieCount <= 40 && energieCount > 20) {
            progress.style.backgroundColor = "green";
        }
        else if (energieCount <= 20 && energieCount > 5) {
            progress.style.backgroundColor = "orange";
        }
        else if (energieCount <= 5 && energieCount > 1) {
            progress.style.backgroundColor = "red";
        }
    }
    //popup of game over
    GameOver() {

        if (energieCount == 0) {
            box.style.display = "block";
            finalScore.innerHTML = scoreCount;
            document.getElementById("retry").addEventListener("click", this.ReinitalizationProgress);

        }
    }

    ReinitalizationProgress() {
       box.style.display = "none";
        progress.style.width = "100%";
        progress.style.backgroundColor = "green";
        energieCount = 40;
        scoreCount = 0;
        scoreEliment.innerHTML = 0;
        enegryCountId.innerHTML = energieCount;
        location.reload();
    }




}
