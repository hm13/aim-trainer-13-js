x = 0
y = 0
r = 8
pos = { x: 0, y: 0 }
PLAY_AREA_WIDTH = window.innerWidth;
PLAY_AREA_HEIGHT = window.innerHeight;

function rand(x1 = 0, x2 = 100) {
    return Math.floor(Math.random() * (x2 - x1 + 1)) + x1
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function inRange(x1, y1, r, x2, y2) {
    return dist(x1, y1, x2, y2) < r;
}

function drawTarget(ctx) {
    ctx.globalAlpha = 0.4;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.closePath();

    ctx.fillStyle = "red";
    ctx.fill();

    ctx.globalAlpha = 1;
}


function updateTargetPosition(ctx) {
    x = rand(0 + 20, PLAY_AREA_WIDTH - 20);
    y = rand(0 + 20, PLAY_AREA_HEIGHT - 20);
}

function drawReticle(ctx, cursor) {
    ctx.drawImage(cursor, pos.x - 5, pos.y - 5);
}

var Main = new function () {
    canvas = document.getElementById('world');
    canvas.width = PLAY_AREA_WIDTH;
    canvas.height = PLAY_AREA_HEIGHT;
    canvas.style.border = "0px none #000000";
    ctx = canvas.getContext("2d");

    reticle = new Image();
    reticle.src = "image/dot.svg";

    canvas.addEventListener('click', function (event) {
        if (inRange(x, y, r, pos.x, pos.y)) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            updateTargetPosition();
            drawTarget(ctx);
        }
    }, false);

    canvas.addEventListener('mousemove', function (event) {
        pos = getMousePos(canvas, event);
    }, false);

    updateTargetPosition();
    drawTarget(ctx);

    function runloop(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawTarget(ctx);
        drawReticle(ctx, reticle);

        window.requestAnimationFrame(runloop);
    }

    window.requestAnimationFrame(runloop);
}

