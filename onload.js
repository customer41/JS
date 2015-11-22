//
// Точка входа.
//
$(document).ready(function()
{
	var matrix = new Matrix('matrix', 20, 20);

    var snake = new Snake(5, 7, 'right');
    matrix.setCell(snake.body[0].x, snake.body[0].y, 'snake', true);

    var food = new Food(8, 14);
    var cell_food;
    function setFood(food)
    {
        cell_food = matrix.getCellNode(food.body.x, food.body.y);
        cell_food.append("<img src='apple.png' id='apple'>");
        $('#apple').animate({opacity: 1}, 1000);
        matrix.setCell(food.body.x, food.body.y, 'food', true);
    }
    setFood(food);

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
            cell_food.empty();
            matrix.setCell(coords.x, coords.y, 'food', false);
            matrix.setCell(snake.body[0].x, snake.body[0].y, 'snake', true);
            do {
                var x = getRandomNumber(2, 19);
                var y = getRandomNumber(2, 19);
            } while (matrix.getCell(x, y, 'snake'));
            food.body.x = x;
            food.body.y = y;
            setFood(food);
        }

        var tail = snake.body.length - 1;
        matrix.setCell(snake.body[tail].x, snake.body[tail].y, 'snake', false);
        snake.move();
        matrix.setCell(snake.body[0].x, snake.body[0].y, 'snake', true);
    };

    var interval;
    $('#start_game').click(function() {
        var speed = 0;
        var level = $('input[name="level"]:checked').val();
        switch(level)
        {
            case 'easy':
                speed = 300;
                break;
            case 'medium':
                speed = 200;
                break;
            case 'hard':
                speed = 100;
        }
        interval = setInterval(gameplay, speed);
        //$('#start_game').attr('disabled',true);
    });

    $(document).keydown(function(event)
    {
        switch (event.keyCode)
        {
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
    });
});