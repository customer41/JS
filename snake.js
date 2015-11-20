function Snake(row, col, course)
{
    this.body = [{x: row, y: col}];
    this.course = course;

    this.getNextCoords = function()
    {
        var coords = {};
        switch (this.course)
        {
            case 'left':
                coords = {x: this.body[0].x, y: this.body[0].y - 1};
                break;
            case 'up':
                coords = {x: this.body[0].x - 1, y: this.body[0].y};
                break;
            case 'right':
                coords = {x: this.body[0].x, y: this.body[0].y + 1};
                break;
            case 'down':
                coords = {x: this.body[0].x + 1, y: this.body[0].y};
        }
        return coords;
    };

    this.grow = function()
    {
        this.body.unshift(this.getNextCoords());
    };

    this.move = function()
    {
        this.grow();
        this.body.pop();
    };
}


