$(function () {
  // 1. 初始化购物车清单列表
  initCart();

  // 2. 初始化全选按钮
  initSelect();

  // 3.
  


})

function initSelect() {

  $(".all").click(function () {
    $(this).toggleClass("active");

    if($(this).hasClass("active")){

      $(".select").css("backgroundColor", "#ff5e5e");
    }else{

      $(".select").css("backgroundColor", "#fff");
    }
  });

}


function initCart() {
  var listArr = JSON.parse(localStorage.getItem("list") || "[]");

  var html = "";
  listArr.forEach(function (ele) {
    html += `      
        <div class="cart-list" name="${ele.id}">

        <div class="cart-title">
          <a href="javascript:;" class="select">
            <i class="iconfont icon-gouxuan"></i>
          </a>
          谷高数码手机专营店
        </div>

        <div class="cart-middle clearfix">
          <a href="javascript:;" class="select">
            <i class="iconfont icon-gouxuan"></i>
          </a>
          <img src="${ele.img}" alt="">
          <div class="info">
            <a href="javascript:;">
              ${ele.info}
            </a>
            <p>
              <span> 7 </span>
              <a href="javascript:;">
                紫玉幻境 4G版 全网通8G+256G
              </a>
            </p>
          </div>

          <p class="item_price fl">
            ${ele.money}
          </p>

          <div class="num_act fl">
            <span class="bth-down"> - </span>
            <input type="text" value="${ele.num + 1}">
            <span class="bth-up"> + </span>
          </div>

          <div class="amount fl">
            <div class="money">

            </div>
            <div class="weight">
              1.00kg
            </div>
          </div>

          <div class="item_act fl">
            <i class="iconfont icon-02"></i>
            <i class="iconfont icon-lajitong del"></i>
          </div>


        </div>

        <div class="cart-amount">
          商品总价格 : 
          <span></span>
        </div>

        </div>`;

  });

  // 从本地存储空间拿到数据渲染页面
  $(".cart-in").html(html);

  toolbar();
  // 设置总价格
  function toolbar() {
    $(".money").each(function () {
      var price = parseFloat($(this).parents(".cart-middle").children(".item_price").text());
      var res = parseFloat($(this).parents(".cart-middle").children(".num_act").children("input").val());

      $(this).text(price * res + ".00");
      $(this).parents(".cart-list").children(".cart-amount").children("span").text(price * res + ".00");

    })
  }

  // 增加购物车里面商品的数量
  $(".bth-up").click(function () {
    var num = $(this).prev().val();

    num++;
    if (num > 1) {
      $(this).prevAll(".bth-down").css("color", "#666");
    }
    $(this).prev().val(num);
    toolbar();
  });

  // 减少购物车里面商品的数量
  $(".bth-down").click(function () {
    var num = $(this).next().val();
    num--;
    num < 2 ? $(this).css("color", "#dfdfdf") : $(this).css("color", "#666");
    if (num < 1) {
      num = 1;
      return;
    }

    $(this).next().val(num);
    toolbar();
  });

  // 删除购物车商品
  $(".del").click(function () {
    $(this).parents(".cart-list").remove();

    var listAll = JSON.parse(localStorage.getItem("list") || "[]");

    var newList = listAll.filter((ele) => {
      return !($(this).parents(".cart-list").attr("name") == ele.id)
    });

    localStorage.setItem("list", JSON.stringify(newList));
  });
}