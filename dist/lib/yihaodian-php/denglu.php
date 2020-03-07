<?php

    $name = $_GET['username'];
    $pwd = $_GET['password'];

    $link = mysqli_connect("127.0.0.1", "root", "root", "test1908");

    $sql = "SELECT * FROM `yihaodian` WHERE `username` = '$name' AND `userpowd` = $pwd";

    $res = mysqli_query($link, $sql);

    $data = mysqli_fetch_assoc($res);

    $json = json_encode($data);

    print_r($json);

    

?>