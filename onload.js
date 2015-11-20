//
// Точка входа.
//
window.onload = function()
{
	var matrix = new Matrix('matrix', 20, 20);

    var snake = new Snake(5, 7, 'right');
    matrix.setCell(snake.body[0].x, snake.body[0].y, 'snake', true);

    var obstacle = new Obstacle(8, 14, 'food');
    matrix.setCell(obstacle.body.x, obstacle.body.y, 'food', true);

    var gameplay = function gameplay()
    {
        if (matrix.isBorder(snake.body[0].x, snake.body[0].y))
        {
            if ((snake.body[0].y == matrix.cols && snake.course == 'right') ||
                (snake.body[0].y == 1 && snake.course == 'left') ||
                (snake.body[0].x == matrix.rows && snake.course == 'down') ||
                (snake.body[0].x == 1 && snake.course == 'up'))
            {
                clearInterval(interval);
                alert('Выход за границу игрового поля.');
                location.reload();
            }
        }

        var coords = snake.getNextCoords();

        if (matrix.getCell(coords.x, coords.y, 'snake'))
        {
            clearInterval(interval);
            alert('Вы укусили себя. Игра завершена.');
            location.reload();
        }

        if (matrix.getCell(coords.x, coords.y, 'food'))
        {
            snake.grow();
            matrix.setCell(coords.x, coords.y, 'food', false);
            matrix.setCell(snake.body[0].x, snake.body[0].y, 'snake', true);
            do {
                var x = getRandomNumber(1, 20);
                var y = getRandomNumber(1, 20);
            } while (matrix.getCell(x, y, 'snake'));
            matrix.setCell(x, y, 'food', true);
        }

        var tail = snake.body.length - 1;
        matrix.setCell(snake.body[tail].x, snake.body[tail].y, 'snake', false);
        snake.move();
        matrix.setCell(snake.body[0].x, snake.body[0].y, 'snake', true);
    };

    var interval = setInterval(gameplay, 300);

    document.onkeydown = function(event)
    {
        if (!event) event = window.event;
        var keyCode = event.keyCode || event.which;

        switch (keyCode) {
            case 37: //left
                snake.course = 'left';
                break;
            case 38: //up
                snake.course = 'up';
                break;
            case 39: //right
                snake.course = 'right';
                break;
            case 40: //down
                snake.course = 'down';
                break;
        }
    };
};