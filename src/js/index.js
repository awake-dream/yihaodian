$(function () {
  // 0.初始化顶部隐藏导航区域
  initTop();

  // 1.初始化顶部导航区域
  initNavTop();

  // 2. 初始化头部列表区域
  initCategory();

  // 3.初始化banner区域
  initBanner();

  // 4.初始化home秒杀区域
  //  这个函数执行的时候, 把页面上你一开始写的倒计时结构已经给动起来了
  // initSeckill();

  // 5.初始化home列表区域
  //   你这个函数执行的时候, 从新获取了一次页面上的结构,从新添加到页面里面了
  //   你新加进去的哪个倒计时结构式没有经过定时器渲染的
  initHome();

  // 6. 初始化楼层区域
  initSingle();

});

function initSingle() {
  $.ajax({
    url: "../data/single-list.json",
    type: "GET",
    success: function (res) {
      var html = "";
      res.forEach(function (item, index) {
        html += `
        <ul>
        <li>
          <img src="${item[0].img}" alt="">
          <div class="sw_num">TOP<span>${item[0].num}</span> </div>
        </li>
        <li><img src="${item[1].img}" alt="">
          <div class="sw_num">TOP<span>${item[1].num}</span> </div>
        </li>
        <li><img src="${item[2].img}" alt="">
          <div class="sw_num">TOP<span>${item[2].num}</span> </div>
        </li>
        </ul>`
      })
      // 渲染到页面
      $(".move-list").html(html);
      var num = 0;

      function leftmove() {
        if(parseInt($(".move-list").css("left")) == -296) return;

        num += 148;
        $(".move-list").stop().animate({ "left": -num });
      }

      $(".bth-left").click(leftmove);


      function rightmove() {
        if (parseInt($(".move-list").css("left")) == 0) return;

        num = parseInt($(".move-list").css("left")) + 148;
        $(".move-list").stop().animate({ "left": num });
      }

      $(".bth-right").click(rightmove);

    }
  });
}

function initHome() {
  $.ajax({
    url: "../data/home-list.json",
    type: "GET",
    success: function (res) {
      var html = $(".home-list").html();

      res.forEach((item) => {
        html += `        
        <li>
        <img src="${item.img}" alt="">
        <p>${item.des}</p>
        <p class="s_bar">
          <span class="line"></span>
        </p>
        <div class="s_num">
          <b>${item.act}</b>
          <s>${item.nuit}</s>
        </div>
      </li>`;
      });

      $(".home-list").html(html)
      // 这里才渲染完倒计时的结构
      initSeckill();

      $(".line").each(function () {
        $(this).css("width", Math.random() * 100 + "%")
      })
    }
  });

}

function initSeckill() {
  let oHour = document.getElementById("hour");
  let oMinute = document.getElementById("minute");
  let oSecond = document.getElementById("second");

  let preDate = new Date("2020-3-10 12:00:00");

  // setTime() 执行一次
  setTime();
  function setTime(){
    // 获取一次返回值
      let obj = getTime(preDate, new Date());
      oHour.innerText = obj.hh;
      oMinute.innerText = obj.mm;
      oSecond.innerText = obj.ss;
  }

  setInterval(setTime, 1000);

  function getTime(preDate, curDate) {
      // 获取相差的毫秒值
      let timer = preDate - curDate;
      // 获取秒钟
      let ss = Math.floor(timer / 1000) % 60;
      ss = ss < 10 ? "0" + ss : ss;
      // 获取分钟
      let mm = Math.floor(timer / 1000 / 60) % 60;
      mm = mm < 10 ? "0" + mm : mm;
      // 获取小时
      let hh = Math.floor( timer / 1000 / 60/ 60) % 24;
      hh = hh < 10 ? "0" + hh : hh;
      // 获取天数
      let day = Math.floor(timer / 1000 / 60 / 60 / 24);

      return{
          ss,
          mm,
          hh
      }
  };
}

function initBanner() {
  $(".banner>ol>li").mouseenter(function () {

    $(this).addClass("active").siblings().removeClass("active");

    $(".banner>ul>li").eq($(this).index()).stop().fadeIn(500).siblings().stop().fadeOut(500);
  });

  var num = 0;
  setInterval(function () {
    num++;
    num = num > 3 ? 0 : num;
    $(".banner>ol>li").eq(num).trigger("mouseenter");
  }, 4000)
}

function initCategory() {
  $.ajax({
    url: "../data/header-list.json",
    type: "GET",
    success: function (res) {
      var html = "";
      res.forEach(function (item, index) {

        item.success.forEach((ele) => {
          html += `<li>${ele}</li>`
        })
      });

      $(".header-list").html(html);
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
          html += `<dd>${ item2 }</dd>`
        })
         
        html += `</dl>`;
      })
      $(".category-list").html(html);
    }
  });
}

/*
  遍历 res
  html += 
    <dl class="clearfix">
      <dt>res[0].title</dt>
      <dd>res[0].des[0]</dd>
      <dd>res[0].des[1]</dd>
      <dd>res[0].des[2]</dd>
    </dl>
    <dl class="clearfix">
      <dt>res[1].title</dt>
      <dd>res[1].des[0]</dd>
      <dd>res[1].des[1]</dd>
      <dd>res[1].des[2]</dd>
    </dl>
*/


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

function initTop() {
  $(window).scroll(function () {
    var offsetY = $(this).scrollTop();
    if(Math.floor(offsetY) >= 560){
      $(".top_bp").slideDown(500);
    }else{
      $(".top_bp").slideUp(500);
    }
  });
}