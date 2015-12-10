//
//  класс матрицы.
//
function Matrix(containerId, rows, cols)
{
	// id контейнера
	this.containerId = containerId;
	
	// число строк
	this.rows = rows;
	
	// число столбцов
	this.cols = cols;
	
	// создание сетки
    var matrix = $('#' + this.containerId);
    matrix.html('');

    var n = this.rows * this.cols;
		
	for (var i = 0; i < n; i++)
	{
		matrix.append("<div class='cell'></div>")
	}

    this.getCellNode = function(row, col)
    {
        return matrix.children().eq((row - 1) * this.cols + (col - 1));
    };

	// получить значение ячейки
	this.getCell = function(row, col, name)
	{
        var cell = this.getCellNode(row, col);
        return cell.hasClass(name);
	};
	
	// установить значение ячейки
	this.setCell = function(row, col, name, val)
	{
        var cell = this.getCellNode(row, col);
        val ? cell.addClass(name) : cell.removeClass(name);
	};
}
		
