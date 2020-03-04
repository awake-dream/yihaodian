$(function () {
  // 1. 初始化购物车清单列表
  initCart();

  // 2. 初始化全选按钮
  initSelect();

  // 3.
  // 设置商品的数量
  var res = $(".cart-list");
  $(".res").text(res.length);

  // 清空购物车
  $(".all-del").click(function () {
    alert('是否需要全部删除');

    $(".cart-list").remove();

    localStorage.removeItem("list");
  });

  // 设置 商品总数量
  $(".goods_num").text(toolbarNum());

  // 设置 商品总价格
  $('.total').text("¥" + toolbarMoney() + ".00");


  function toolbarNum() {
    let num = 0;
    $(".num_act").children("input").each(function (index, item) {
      // console.log(.val())
      num += Number($(item).val());
    })
    return num;
  }

  function toolbarMoney() {
    let num = 0;
    $(".cart-amount").children("span").each(function (index, item) {
      num += Number($(item).text());
    })
    return num;
  }

})


function initSelect() {
  // 全选按钮勾选
  $(".header-list .all").click(function () {
    $(this).toggleClass("active");

    $(".cart-middle").children('.select').addClass("active");
    $(".cart-title").children('.select').addClass("active");

    $(".tools .all").toggleClass("active");

    // $(".cart-list").children(".select").toggleClass("active");
  });

  // 信息按钮勾选
  $(".cart-middle").children('.select').click(function () {
    $(this).toggleClass("active");

    if ($(this).hasClass("active")) {
      $(this).parents(".cart-list").children(".cart-title").children(".select").addClass("active")

      // num += Number($(this).parents(".cart-middle").children(".num_act").children("input").val());

      // total += Number($(this).parents(".cart-middle").next().children("span").text());

    } else {
      $(this).parents(".cart-list").children(".cart-title").children(".select").removeClass("active")
    }

    hasClass();

  })




  // 标题按钮勾选
  $(".cart-title").children('.select').click(function () {
    $(this).toggleClass("active");

    if ($(this).hasClass("active")) {
      $(this).parents(".cart-list").children(".cart-middle").children(".select").addClass("active")
    } else {
      $(this).parents(".cart-list").children(".cart-middle").children(".select").removeClass("active")
    }

    hasClass();
  })



  // 总价格按钮勾选
  $(".tools .all").click(function () {
    $(this).toggleClass("active");

    $(".cart-middle").children('.select').addClass("active");
    $(".cart-title").children('.select').addClass("active");

    $(".header-list .all").toggleClass("active");
  });

  // 将下面判断是否被勾选封装成一个函数 好二次调用
  function hasClass() {
    var flag = true;
    $(".cart-middle .select").each(function (index, item) {
      // 当 信息菜单里面的 都被勾选时 才改变 flag 的状态
      if ($(item).hasClass("active") === false) {
        flag = false;
      }
    })

    if (flag) {
      $(".tools .all").addClass("active");
      $(".header-list .all").addClass("active");
    } else {
      $(".tools .all").removeClass("active");
      $(".header-list .all").removeClass("active");
    }
  }


}


function initCart() {
  var listArr = JSON.parse(localStorage.getItem("list") || "[]");
  
  if(listArr.length === 0){
    $(".hide").show();
  }

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
    // 设置 已选商品的数量
    $(".goods_num").text(Number($(".goods_num").text()) + 1);

    var num = $(this).prev().val();

    num++;
    if (num > 1) {
      $(this).prevAll(".bth-down").css("color", "#666");
    }
    // 设置商品数量
    $(this).prev().val(num);
    // 设置商品的总价格
    toolbar();

    // $(".goods_num").text(Number($(".goods_num").text()) + (++res));
    // console.log(res)

    // 页面刷新  能够获取最新的数据
    setNum.call(this, num);

    // 设置 总价格
    $(".total").text("¥" + setTotal() + ".00");

  });

  // 减少购物车里面商品的数量
  $(".bth-down").click(function () {
    // 设置 已选商品的数量
    $(".goods_num").text(Number($(".goods_num").text()) - 1);

    var num = $(this).next().val();
    num--;
    num < 2 ? $(this).css("color", "#dfdfdf") : $(this).css("color", "#666");
    if (num < 1) {
      num = 1;
      return;
    }

    // 设置商品数量
    $(this).next().val(num);
    // 设置商品的总价格
    toolbar();


    // 页面刷新  能够获取最新的数据
    setNum.call(this, num);

     // 设置 总价格
    $(".total").text("¥" + setTotal() + ".00");

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

  // 设置最新的 num 值
  function setNum(res) {
    for (let i = 0; i < listArr.length; i++) {

      if (listArr[i].id == $(this).parents(".cart-list").attr("name")) {
        listArr[i].num = res - 1;
        break;
      }
    }

    localStorage.setItem("list", JSON.stringify(listArr));
  }


  function setTotal() {
    var res = 0;
    $(".cart-amount").children("span").each((index, item) => {
      res += Number($(item).text());
    });
    return res;
  }

}