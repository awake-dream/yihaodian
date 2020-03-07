$(function () {
    let res = mkLinks(4);

    $(".rand").text(res);

    $(".submit").click(function () {
        let num = $(".yzm input").val();

        if(num !== res || $(".pwd1").val() !== $(".pwd2").val() || $(".pwd1").val().trim() == "" ) {
            return;
        } 

        $.post('/cc', {
            username: $(".name").val(), 
            userphone: $(".phone").val(),
            userpowd: $(".pwd1").val()
        }, function (res) {
            alert("注册成功");

            history.go(0);
        });
    });

    
    $(".goods_denglu").click(function () {
        window.location.href = "../pages/req.html";
    });



    function mkLinks(num) {
        var str = "23QWERTYUIOPASDFGHJKLZXCVBNM1456789zxcvbnmasdfghjklqwertyuiop";
        var res = '';
        for (var i = 0; i < num; i++) {
            res += str[Math.floor(Math.random() * str.length)];
        }
        return res;
    }


});