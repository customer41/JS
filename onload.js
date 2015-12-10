//
// Точка входа.
//
$(document).ready(function()
{
	var matrix = new Matrix('matrix', 20, 20);

    var snake = new Snake(5, 8, 'right');
    matrix.setCell(snake.body[0].x, snake.body[0].y, 'snake', true);

    var food = new Food(7, 14);
    var cell_food;
    function setFood(food)
    {
        cell_food = matrix.getCellNode(food.body.x, food.body.y);
        cell_food.append("<img src='apple.png' id='apple'>");
        $('#apple').animate({opacity: 1}, 1000);
        matrix.setCell(food.body.x, food.body.y, 'food', true);
    }
    setFood(food);

    var name = '';

    function gameOver(coords)
    {
        if (coords.x > matrix.rows || coords.x <= 0 || coords.y > matrix.cols || coords.y <= 0) {
            return {status: true, msg: 'Выход за границу игрового поля.'};
        } else if (matrix.getCell(coords.x, coords.y, 'snake')) {
            return {status: true, msg: 'Вы укусили себя.'};
        }
        return {status: false, msg: ''};
    }

    var gameplay = function gameplay()
    {
        var coords = snake.getNextCoords();
        var gameover = gameOver(coords);
        if (gameover.status == true) {
            $.get('/game.php',
                {name: name, score: snake.body.length, level: $('input[name="level"]:checked').val()},
                function(data) {
                    alert(gameover.msg + '\n' + data);
                    clearInterval(interval);
                    location.reload();
                },
                'text'
            );
        } else if (matrix.getCell(coords.x, coords.y, 'food')) {
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
    $('#btn_start_game').click(function() {
        name = prompt('Введите Ваше имя', '');
        if (name == null || name == '') location.reload();
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
        //$('#start_game').attr('disabled', true);
    });

    $('#btn_records').click(function() {
        $('body').append('<div id="table_records"></div>');
        $.getJSON('/game.php',
            {records: 'records'},
            function (data) {
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html += data[i].name + ' | ' + data[i].score + ' | ' + data[i].level + '<br>'
                }
                $('#table_records').append(html);
            }
        );
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