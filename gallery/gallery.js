var arrLen = 0;

$(document).ready(function() {
    var index = 0;
    setImage(index);
    animate();

    $('#prev').click(function() {
        index == 0 ? index = arrLen - 1 : index--;
        setImage(index);
        animate();
    });

    $('#next').click(function() {
        index == arrLen - 1 ? index = 0 : index++;
        setImage(index);
        animate();
    });
});

function setImage(index) {
    $.getJSON('/gallery/gallery.php',
        {index: index},
        function (data) {
            arrLen = data.arrLen;
            $('#gallery img').attr('src', '/gallery/images/' + data.path);
        }
    )
}

function animate() {
    $('#gallery img').css('opacity', 0).animate({opacity: 1}, 1000);
}