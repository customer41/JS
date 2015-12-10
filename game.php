<?php

if (isset($_GET['name']) && isset($_GET['score']) && isset($_GET['level']))
{
    $name = $_GET['name'];
    $score = $_GET['score'];
    $level = $_GET['level'];

    $sql = "INSERT INTO table_records (name, score, level) VALUES (:name, :score, :level)";

    $dbh = new PDO('mysql:dbname=js_test;host=localhost', 'root', '');
    $sth = $dbh->prepare($sql);
    $sth->execute([':name' => $name, ':score' => $score, ':level' => $level]);

    echo 'Игра завершена. Вы можете посмотреть таблицу рекордов';
}

if (isset($_GET['records']))
{
    $sql = "SELECT name, score, level FROM table_records ORDER BY score DESC";
    $dbh = new PDO('mysql:dbname=js_test;host=localhost', 'root', '');
    $sth = $dbh->prepare($sql);
    $sth->execute();
    $res = $sth->fetchAll();
    echo json_encode($res);
}