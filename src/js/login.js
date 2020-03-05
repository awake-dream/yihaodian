$(function () {
    function mkLinks(num) {
        var str = "23QWERTYUIOPASDFGHJKLZXCVBNM1456789zxcvbnmasdfghjklqwertyuiop";
        var res = '';
        for (var i = 0; i < num; i++) {
            res += str[Math.floor(Math.random() * str.length)];
        }
        return res;
    }

    let res = mkLinks(4);

    $(".rand").text(res);


    $(".model").submit(function (event) {
        let num = $(".yzm input").val();

        if(num !== res || $(".pwd1").val() !== $(".pwd2").val()) {
            
            event.preventDefault();
        } 



    });



});