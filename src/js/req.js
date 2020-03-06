$(function () {
    $(".submit").click(function () {
        var name = $(".zh").val();
        var pwd = $(".mm").val();

        $.get("/dd", {
            username: name,
            password: pwd
        }, function (res) {
            if(res){
                localStorage.setItem("initInfo", JSON.stringify(res));
                window.location.href = "../pages/index.html";

            }else{
                alert('账号或密码错误');
            }
        }, "json")

    });


});