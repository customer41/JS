<?php
    $path_images = [
        'car.jpg',
        'money.jpg',
        'sea.jpg',
        'train.jpg',
        'winter.jpg'
    ];

    if (isset($_GET['index'])) {
        $index = $_GET['index'];
        $array = ['arrLen' => count($path_images), 'path' => $path_images[$index]];
        echo json_encode($array);
    }