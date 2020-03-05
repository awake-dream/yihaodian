$(function () {

  const cartList = JSON.parse(localStorage.getItem("cartList"));

  if (cartList.length === 0) {
    $('.hide').show();

  } else {

    bindHtml();

    bindEvent();
  }

  function bindHtml() {
    let selectAll = cartList.every(item => {
      return item.isSelect === true;
    })

    let str = `
    <div class="header">
    <div class="header-in">
      <div class="header-title clearfix">
        <div class="header-left fl clearfix">
          <h1>
            <a href="javascript:;"></a>
            <a href="javascript:;"></a>
          </h1>
          <p>配送至: </p>
          <div>
            <a href="javascript:;">上海</a>
            <span>|</span>
            <a href="javascript:;">静安区</a>
            <span>|</span>
            <a href="javascript:;">城区</a>
            <i class="iconfont icon-xiajiantou"></i>
          </div>
        </div>
  
        <div class="header-right fr">
          <input type="text" placeholder="请输入关键字">
          <i class="iconfont icon-fangdajing"></i>
        </div>
      </div>
      <div class="header-list">
        <span class="checkbox">
          <a href="javascript:;" class="all" style="background-color: ${selectAll ? "#ff5e5e" : "#fff"}">
            <i class="iconfont icon-gouxuan"></i>
          </a>
          全选
        </span>
        <span class="tit"> 商品信息 </span>
        <span class="price">单价（元） </span>
        <span class="num"> 数量 </span>
        <span> 小计（元） </span>
        <span class="act">操作</span>

      </div>
    </div>
  </div>`


    cartList.forEach(item => {
      str += `
    <div class="cart">
      <div class="cart-in">
        <div class="cart-list">
  
          <div class="cart-title">
            <a href="javascript:;" class="selectOne" data-id=${item.id} style="background-color: ${item.isSelect ? "#ff5e5e" : "#fff"}">
              <i class="iconfont icon-gouxuan"></i>
            </a>
            谷高数码手机专营店
          </div>
  
          <div class="cart-middle clearfix">
            <a href="javascript:;" class="selectOne" data-id=${item.id} style="background-color: ${item.isSelect ? "#ff5e5e" : "#fff"}">
              <i class="iconfont icon-gouxuan"></i>
            </a>
            <img src="${item.img}" alt="">
            <div class="info">
              <a href="javascript:;">
                ${item.title}
              </a>
              <p>
                <span> 7 </span>
                <a href="javascript:;">
                  紫玉幻境 4G版 全网通8G+256G
                </a>
              </p>
            </div>
  
            <p class="item_price fl">
              ${item.money}
            </p>
  
            <div class="num_act fl">
              <span class="bth-down" data-id=${item.id}> - </span>
              <input type="text" value="${item.num}">
              <span class="bth-up" data-id=${item.id}> + </span>
            </div>
  
            <div class="amount fl">
              <div class="money">
                ${item.xiaoji.toFixed(2)}
              </div>
              <div class="weight">
                1.00kg
              </div>
            </div>
  
            <div class="item_act fl">
              <i class="iconfont icon-02"></i>
              <i class="iconfont icon-lajitong del" data-id=${ item.id}></i>
            </div>
  
  
          </div>
  
          <div class="cart-amount">
            商品总价格 : 
            <span>${item.xiaoji.toFixed(2)}</span>
          </div>
  
        </div>
      </div>
    </div>`
    })


    let selectList = cartList.filter(item => item.isSelect);

    let selectNum = 0;
    let selectPrice = 0;

    selectList.forEach(item => {
      selectNum += item.num;
      selectPrice += item.xiaoji;
    })

    str += `
    <div class="tools">
    <div class="tools-in clearfix">
      <div class="tools-left fl">
        <a href="javascript:;" class="all" style="background-color: ${selectAll ? "#ff5e5e" : "#fff"}">
          <i class="iconfont icon-gouxuan"></i>
        </a>
        <a href="javascript:;">
          全选（共 <span class="res">${cartList.length}</span> 件）
        </a>
        <s>|</s>
        <a href="javascript:;" class="all-del">批量删除</a>
      </div>
      <div class="tools-right fr clearfix">
        <a href="javascript:;">去结算</a>
        <p>合计: <b class="total">${selectPrice.toFixed(2)}</b></p>
        <span>|</span>
        <div>已选商品 <span class="goods_num">${selectNum}</span> 件 <s>预览 </s> </div>
      </div>
    </div>
    </div>
    `

    $(".main").html(str);
  }


  function bindEvent() {
    // 全选
    $(".main").on("click", ".all", function () {
      $(this).css("backgroundColor", "#ff5e5e");
      var flag = false;

      flag = $(this).css("backgroundColor") == "rgb(255, 94, 94)";

      cartList.forEach(item => {
        item.isSelect = flag
      })

      bindHtml();

      localStorage.setItem("cartList", JSON.stringify(cartList));

    });

    // 单选
    $(".main").on("click", ".selectOne", function () {
      const id = $(this).data("id");

      cartList.forEach(item => {
        if (item.id == id) {
          item.isSelect = !item.isSelect;
        }
      })

      bindHtml();

      localStorage.setItem("cartList", JSON.stringify(cartList));

    });

    // 减少商品数量
    $(".main").on("click", ".bth-down", function () {
      const id = $(this).data("id");

      cartList.forEach(item => {
        if (item.id == id) {
          item.num > 1 ? item.num-- : "";
          item.xiaoji = item.money * item.num;
        }
      })

      bindHtml();

      localStorage.setItem("cartList", JSON.stringify(cartList));
    });

    // 增加商品数量
    $(".main").on("click", ".bth-up", function () {
      const id = $(this).data("id");

      cartList.forEach(item => {
        if (item.id == id) {
          item.num++
          item.xiaoji = item.money * item.num;
        }
      })

      bindHtml();

      localStorage.setItem("cartList", JSON.stringify(cartList));
    });

    // 点击删除的事件
    $(".main").on('click', ".del", function () {
      const id = $(this).data("id");

      $(this).parents(".cart").remove();

      let listArr = cartList.filter(item => item.id != id);

      localStorage.setItem('cartList', JSON.stringify(listArr));

    })
    

    // 全部清空
    $(".main").on("click", ".all-del", function () {
      $(".cart").remove();

      $(".res").text("0");
      $(".goods_num").text("0");
      $(".total").text("0.00");

      localStorage.setItem('cartList', JSON.stringify([]));

    });

  }
});