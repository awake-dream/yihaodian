<?php
    header('content-type: text/html;charset=utf-8;');

    $userName = $_POST['username'];
    $userPhone = $_POST['userphone'];
    $userPowd = $_POST['userpowd'];

    $link = mysqli_connect("localhost", "root", "root", "test1908");

    $res = mysqli_query($link, "INSERT INTO `yihaodian` VALUES(null, '$userName', '$userPhone', '$userPowd')");

    $row = mysqli_fetch_assoc($res);

    mysqli_close($link);

?>