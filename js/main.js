x = 0
y = 0
r = 8
PLAY_AREA_WIDTH = 1280
PLAY_AREA_HEIGHT = 720

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

function drawCircle(ctx) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}

function updateCirclePosition(ctx) {
    x = rand(0 + 20, PLAY_AREA_WIDTH - 20);
    y = rand(0 + 20, PLAY_AREA_HEIGHT - 20);
}

var Main = new function() {
    canvas = document.getElementById('world');
    canvas.width = PLAY_AREA_WIDTH;
    canvas.height = PLAY_AREA_HEIGHT;
    canvas.style.border = "thin solid #000000";
    ctx = canvas.getContext("2d");
    updateCirclePosition();
    drawCircle(ctx);

    canvas.addEventListener('click', function(event) {
        pos = getMousePos(canvas, event);
        if ( inRange(x, y, r, pos.x, pos.y) ) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            updateCirclePosition();
            drawCircle(ctx);
        }
    }, false);

    cursor = new Image();
    cursor.src = "image/dot.svg";

    canvas.addEventListener('mousemove', function(event) {
        pos = getMousePos(canvas, event);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(cursor, pos.x - 10, pos.y - 10);
        drawCircle(ctx);
    }, false)
}

