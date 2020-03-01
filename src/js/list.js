$(function () {
  // 1.初始化顶部导航区域
  initNavTop();

  // 2.初始化头部菜单区域
  initHeaderInfo();

  // 3.初始化列表区域
  initMain()




});

function initMain() {
  $.ajax({
    url: "../data/Llist.json",
    type: "GET",
    success: function (res) {
      // 排序渲染
      $(".select-nva a").click(function () {
        $(this).addClass("active").siblings().removeClass("active");

        if ($(".select-nva a").eq(1).hasClass("active")) {
          res.sort((a, b) => a.money - b.money);
          pageHtml();
        } else if ($(".select-nva a").eq(2).hasClass("active")) {
          res.sort((a, b) => b.money - a.money);
          pageHtml();
        }

      });

      // 渲染页面
      pageHtml();
      function pageHtml() {
        var html = "";
        res.forEach((item, index) => {
          item.id = index;
          html += `        
          <li>
          <img src="${item.img}" alt="">
          <p class="money"> <b>¥</b>${item.money}</p>
          <p class="mainTitle">${item.title}</p>
          <span>加入购物车</span>
          <p class="pro"><i class="iconfont icon-duihuakuang"></i>暂无评论 <i class="iconfont icon-dianzan"> </i> <span>${getRandomInt(60, 100)}%</span></p>
          <p class="shop-text"><span>自营</span> 谷高数码手机专营店 </p>
          </li>`;
        });

        $(".main-list").html(html);
      }

      // 给每个商品添加数据
      $(".main-list li").each(function (index, ele) {
        $(this).data("data-id", index);
        $(this).data("data-img", $(this).children("img").prop("src"));
        $(this).data("data-money", parseInt($(this).children(".money").text().replace("¥", "")));
        $(this).data("data-info", $(this).children(".mainTitle").text());
      })

      // var listArr = JSON.parse(localStorage.getItem("list") || "[]");

      // var num = 0;
      // // 在用户点击 加入购物车 将数据在 localStorage 保存下来
      // $(".main-list li span").click(function () {

      //   var obj = {
      //     id: $(this).parent().data("data-id"),
      //     img: $(this).parent().data("data-img"),
      //     money: $(this).parent().data("data-money"),
      //     info: $(this).parent().data("data-info"),
      //     num: $(this).parent().data("data-num")
      //   }

      //   var flag = true;
      //   listArr.forEach((item) => {
      //     if (item.id == $(this).parent().data("data-id")) {
      //       // num = parseInt($(this).parent().data("data-num")) + 1;
      //       num++
      //       console.log(num)
      //       $(this).parent().data("data-num", num);
      //       flag = false;
      //     } else {
      //       $(this).parent().data("data-num", 1);
      //       // item.num = 1;
      //     }
      //   });

      //   if (flag) {
      //     listArr.push(obj);
      //   }

      //   localStorage.setItem("list", JSON.stringify(listArr));
      // })


    }
  });
}

function initHeaderInfo() {
  $.ajax({
    url: "../data/Lheader-info.json",
    type: "GET",
    success: function (res) {
      var html = "";
      res.forEach(function (item, index) {

        item.success.forEach((ele) => {
          html += `<li>${ele}</li>`
        })
      });

      $(".header-info").html(html);
    }
  })



  $.ajax({
    url: "../data/header-category.json",
    type: "GET",
    success: function (res) {
      var html = "";
      // res 是整个二维数组
      res.forEach(function (item) {
        // item 是数组里面的每一项
        // item.title 是每一个标题, dt 标签渲染
        // item.des 是一个数组里面的小数组, 需要渲染成好多的 dd 标签
        //   => dd 标签是放在 dt 后面, </dl> 闭合标签的前面
        html += `            
            <dl class="clearfix">
            <dt>${item.title}</dt>
          `

        // 在这里通过 item.des 数组添加好多 dd 放在这里
        item.des.forEach(item2 => {
          html += `<dd>${item2}</dd>`
        })

        html += `</dl>`;
      })
      $(".category-list").html(html);
    }
  });
}

function initNavTop() {
  var num = 0;
  setInterval(function () {
    num += 30;
    if (num >= 120) {
      $(".guangbo").css("top", 0);
      num = 30;
    }
    $(".guangbo").animate({ top: -num });
  }, 2000);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //不含最大值，含最小值
}