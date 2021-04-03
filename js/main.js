var canvas = document.getElementById("world");
var ctx = canvas.getContext("2d");

var targets = [];
var targetNumber = 3;
let generateTarget = function () {
    return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        r: 8,
        color: "#FF0000",
        alpha: 0.4
    };
};
for (var n = 0; n < targetNumber; n++) {
    targets.push(generateTarget());
}

var reticle = {
    x: 0,
    y: 0,
    r: 5,
    color: "#00FF00",
    alpha: 1
};

function rand(x1 = 0, x2 = 100) {
    return Math.floor(Math.random() * (x2 - x1 + 1)) + x1
}

function inRange(x1, y1, r, x2, y2) {
    function dist(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }
    return r >= dist(x1, y1, x2, y2);
}

function drawCircle(circle) {
    ctx.globalAlpha = circle.alpha;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.globalAlpha = 1;
}

function drawTarget() {
    for (const target of targets) {
        drawCircle(target);
    }
}

function drawReticle() {
    drawCircle(reticle);
}

function updateReticlePosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var pos = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
    reticle.x = pos.x;
    reticle.y = pos.y;
}

function updateTargetPosition(target) {
    target.x = rand(0 + 20, window.innerWidth - 20);
    target.y = rand(0 + 20, window.innerHeight - 20);
}

function checkTargetClick() {
    for (const target of targets) {
        if (inRange(target.x, target.y, target.r, reticle.x, reticle.y)) {
            updateTargetPosition(target);
        }
    }
}

function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.border = "0px none #000000";

    canvas.addEventListener('click', function (event) {
        checkTargetClick();
    }, false);

    canvas.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        checkTargetClick();
    }, false);

    canvas.addEventListener('mousemove', function (event) {
        updateReticlePosition(canvas, event);
    }, false);
}


{
    initializeCanvas();

    function runloop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawTarget();
        drawReticle();

        window.requestAnimationFrame(runloop);
    }

    window.requestAnimationFrame(runloop);
}