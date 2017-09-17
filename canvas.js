window.addEventListener('load', function () {

    var canvas = document.getElementById('myCan');
    var ctx = canvas.getContext('2d');
    var gameStart = Date.now();
    var frameCount = 0;
    var score = 0;

    var enemyList = {};
    var upgradeList = {};
    var bulletList = {};

    var player = {

        x: 0,
        y: 0,
        width: 25,
        height: 15,
        speedX: 1,
        speedY: 1,
        hp: 10,
        color: 'aqua',
        attackSpd: 1,
        attackCounter: 0,
        pressingDown: false,
        pressingUp: false,
        pressingRight: false,
        pressingLeft: false,

    }

    var Enemy = function (x, y, width, height, speedX, speedY, color, id) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.id = id;
    }

    var Upgrade = function (x, y, width, height, speedX, speedY, color, id, category) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.id = id;
        this.category = category;

    }

    var playerBullets = function (x, y, width, height, speedX, speedY, color, id, timer) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.id = id;
        this.timer = timer;
    }



    var autoCreateEnemy = function () {

        var color = ['yellow', 'red', 'green', 'orange', 'purple'];
        var x = Math.random() * 3 + 5;
        var y = Math.random() * 3 + 5;
        var width = Math.random() * 25 + 10;
        var height = Math.random() * 25 + 10;
        var speedX = Math.random() * 2 + 2;
        var speedY = Math.random() * 2 + 2;
        var chooseColor = color[Math.floor((Math.random() * 5) + 1)];
        var id = Math.random();


        var enemy1 = new Enemy(x, y, width, height, speedX, speedY, chooseColor, id);
        enemyList[id] = enemy1;
    }

    var upgradePlayer = function () {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var width = 10;
        var height = 10;
        var speedX = 0;
        var speedY = 0;
        var id = Math.random();

        if (Math.random() < 0.5) {
            var category = 'low';
            var color = 'grey';

        } else {
            var category = 'high';
            var color = 'pink';

        }


        var upgradeObj = new Upgrade(x, y, width, height, speedX, speedY, color, id, category);
        upgradeList[id] = upgradeObj;
    }

    var bullets = function () {
        var x = player.x;
        var y = player.y;
        var width = 10;
        var height = 10;
        var angle = Math.random() * 360;
        var speedX = Math.cos(angle / 180 * Math.PI) * 5;
        var speedY = Math.sin(angle / 180 * Math.PI) * 5;
        var color = 'white';
        var id = Math.random();
        var timer = 0;


        var bulletsObj = new playerBullets(x, y, width, height, speedX, speedY, color, id, timer);
        bulletList[id] = bulletsObj;
    }

    startNewGame();


    var drawEntity = function (entity) {

        ctx.beginPath();
        ctx.fillStyle = entity.color;
        ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.font = "30px Georgia";
        ctx.fillText('Hp' + player.hp, 20, 20);
        ctx.fillStyle = 'orange';
        ctx.fillText('Score' + ' ' + score, 150, 20);
        ctx.closePath();
    }

    var updateMove = function (entity) {

        entity.x += entity.speedX;
        entity.y += entity.speedY;
        limitX = canvas.width - entity.width;
        limitY = canvas.height - entity.height;

        if (entity.x > limitX || entity.x < 0) {
            entity.speedX = -entity.speedX;
        } else if (entity.y > limitY || entity.y < 0) {
            entity.speedY = -entity.speedY;
        }
    }

    var updateEntitys = function (entity) {

        drawEntity(entity);
        updateMove(entity);
    }

//    canvas.addEventListener('mousemove', function (e) {
//        var mouseX = e.clientX - canvas.getBoundingClientRect().left;
//        var mouseY = e.clientY - canvas.getBoundingClientRect().top;
//
//        if (mouseX < player.widht / 2) {
//            mouseX = 0;
//        }
//        if (mouseX > canvas.width - player.width / 2) {
//            mouseX = canvas.width - player.width;
//        }
//        if (mouseY > canvas.height - player.height / 2) {
//            mouseY = canvas.height - player.height;
//        }
//
//        player.x = mouseX;
//        player.y = mouseY;
//    })

    var entitysColide = function (player, entity) {
        if (player.x < entity.x + entity.width &&
            player.x + player.width > entity.x &&
            player.y < entity.y + entity.height &&
            player.height + player.y > entity.y) {

            return true;
        }
    }

    function startNewGame() {
        player.hp = 10;
        gameStart = Date.now();
        frameCount = 0;
        enemyList = {};
        upgradeList = {};
        bulletList = {};

        score = 0;
        autoCreateEnemy();
        autoCreateEnemy();
        autoCreateEnemy();
    }

    var counter = 0;

    document.addEventListener('click', function () {
        if (player.attackCounter > 60) {
            bullets();
            player.attackCounter = 0;
        }
    })

    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 38) {
            player.pressingUp = true;
        } else if (e.keyCode === 40) {
            player.pressingDown = true;
        } else if (e.keyCode === 37) {
            player.pressingLeft = true;
        } else if (e.keyCode === 39) {
            player.pressingRight = true;
        }

    })
    document.addEventListener('keyup', function (e) {
        if (e.keyCode === 38) {
            player.pressingUp = false;
        } else if (e.keyCode === 40) {
            player.pressingDown = false;
        } else if (e.keyCode === 37) {
            player.pressingLeft = false;
        } else if (e.keyCode === 39) {
            player.pressingRight = false;
        }

    })

    var updatePlayerPos = function () {
        if (player.pressingUp) {
            player.y -= 10;
        } else if (player.pressingDown) {
            player.y += 10;
        } else if (player.pressingLeft) {
            player.x -= 10;
        } else if (player.pressingRight) {
            player.x += 10;
        }
        
        if (player.x < player.width/6 ) {
            player.x = player.width/6;
        }
        if (player.x > canvas.width - player.width) {
            player.x = canvas.width - player.width;
        }
        if (player.y > canvas.height - player.height) {
            player.y = canvas.height - player.height;
        }
        if (player.y < player.height / 10) {
            player.y = player.height / 10 ;
        }

    }

    var update = function () {
        frameCount++;
        score++;

        if (frameCount % 240 === 0) {
            autoCreateEnemy();
        }

        if (frameCount % 300 === 0) {
            upgradePlayer();
        }

        player.attackCounter += player.attackSpd;




        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var prop in bulletList) {

            updateEntitys(bulletList[prop]);

            bulletList[prop].timer++;

            if (bulletList[prop].timer > 120) {
                delete bulletList[prop];
                continue;
            }

            for (var key in enemyList) {
                var isCollide = entitysColide(enemyList[key], bulletList[prop]);
                if (isCollide) {
                    delete bulletList[prop];
                    delete enemyList[key];
                    break;
                }
            }
        }

        for (var prop in upgradeList) {

            updateEntitys(upgradeList[prop]);

            var isCollide = entitysColide(player, upgradeList[prop]);

            if (isCollide) {

                if (upgradeList[prop].category === 'low') {
                    score += 1000;
                    console.log('iam low + 1k');
                }
                if (upgradeList[prop].category === 'high') {
                    player.attackSpd += 2;
                    console.log('iam high ');
                }
                delete upgradeList[prop];
            }
        }

        for (var prop in enemyList) {

            var isCollide = entitysColide(player, enemyList[prop]);
            updateEntitys(enemyList[prop]);
            entitysColide(player, enemyList[prop]);

            if (isCollide) {
                player.hp -= 1;

            }
        }
        if (player.hp <= 0) {
            var gameSurvived = (Date.now() - gameStart) / 1000;

            gameStart = Date.now();
            player.hp = 10;
            startNewGame();
        }

        drawEntity(player);
        updatePlayerPos();

        window.requestAnimationFrame(update);
    }

    window.requestAnimationFrame(update);

})
