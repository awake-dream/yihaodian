$(function () {
  // 1.初始化顶部导航区域
  initNavTop();

  // 2.初始化头部菜单区域
  initHeaderInfo();


  // 3.初始化列表区域
  initMain();

});

function initMain() {
  let flag = true;

  getList();
  function getList() {
    $.ajax({
      url: "../data/Llist.json",
      type: "GET",
      success: function (res) {

        pageSort(res);
        
        bindHtml(res.slice(0, 16));

        flag && bindPagi(res);

        addCart(res);
      }
    })
  }
    

  // 排序渲染
  function pageSort(res) {

    $(".select-nva a").click(function () {
      $(this).addClass("active").siblings().removeClass("active")


      res.sort(function (a, b) {
        if($(".select-nva a").eq(1).hasClass("active")){
          return a.money - b.money;
        }else if($(".select-nva a").eq(2).hasClass("active")){
          return b.money - a.money;
        }
      });

      bindHtml(res.slice(0, 16));
    });

  }

  // 渲染页面
  function bindHtml (list) {
    let str = "";
    list.forEach((item) => {
      str += `        
      <li data-id="${item.id}">
      <img src="${item.img}" alt="">
      <p class="money"> <b>¥</b>${item.money}</p>
      <p class="mainTitle">${item.title}</p>
      <span>查看详情</span>
      <p class="pro"><i class="iconfont icon-duihuakuang"></i>暂无评论 <i class="iconfont icon-dianzan"> </i> <span>${getRandomInt(60, 100)}%</span></p>
      <p class="shop-text"><span>自营</span> 谷高数码手机专营店 </p>
      </li>`;
    });

    $(".main-list").html(str);
  }

  // 分页器
  function bindPagi (res) {
    flag = false;
    
    $('.M-box3').pagination({
      pageCount: Math.ceil(res.length / 16),
      jump: true,
      coping: true,
      homePage: '首页',
      endPage: '末页',
      prevContent: '上页',
      nextContent: '下页',
      callback: function (api) {
        let curr = api.getCurrent();

        let list = res.slice((curr - 1) * 16, curr * 16);

        bindHtml(list);
      }
    });
  }

  // 存储数据 + 跳转页面
  function addCart (res) {
    $(".main-list").on("click", "li", function () {
      const id = $(this).data("id");

      let data = null;
      for(let i = 0; i < res.length;i++){
        if(res[i].id == id){
          data = res[i];
          break;
        }
      }

      localStorage.setItem("goodsInfo", JSON.stringify(data));

      window.location.href = './detail.html';
    })

  }

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