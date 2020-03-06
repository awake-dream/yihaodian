$(function () {

  var cartList = JSON.parse(localStorage.getItem("cartList"));

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

    // 你这里渲染页面使用的是 cartList 对吧? 这个能理解吧
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
                ${item.xiaoji}
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
            <span>${item.xiaoji}</span>
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
      // 遇到问题要思考 ? 
      // 你这里获取的是元素身上的 data-id 属性
      //  刚才你检查元素的时候也看到了, 拿到的是 undefined
      //  你查看代码的时候也看了, 使用的是 item.id 这个数据绑定的
      // 那么问题出在了那里呢 ? 是不是就是说明 item.id 是一个 undefined
      // 那么就说明你的数据里面就没有 id 这一项啊 ? 明白吗

      // 你为什么要移除 DOM 结构呢 ?
      // 因为我想看到效果
      // 那你点击 + 的时候, 为什么不找到元素, 让它的 val() + 1 呢 ?
      // $(this).parents(".cart").remove();

      // 你想删除, 对吧, 然后你用了一个 filter 方法
      // 那么你的 listArr 就是删除一条数据的数组, 可是你的 cartList 没有改变 ? 明白吗
      // var listArr = cartList.filter(item => item.id != id);
      // 你现在做的删除是没有改变 cartList 对吧, 所以从新执行 bindHtml 不会改变页面
      // 如果你删除的时候是改变了 cartList 的话, 那么你从新执行 bindHtml 页面不久变了
      // 咋办 ?

        // cartList.forEach(function (item) {
        //   if(item.id == id){
        //     console.log(item) 
        //   }
        // })
        // 可算是开窍了 ?
        // 注意:  如果你的 cartList 是使用 const 定义的, 是不是就不能改啊 ?懂
        // 那我要去上面 var 吗 ? 对啊 
        cartList = cartList.filter(item => item.id != id)
        // 谢谢老师
        // console.log(listArr)

      // 你这里只是把新的数组从新存储在 localStorage 里面
      // 你并没有说渲染页面的时候使用新数组啊
      localStorage.setItem('cartList', JSON.stringify(cartList));

      // 你一执行 bindHtml, 这个函数还是在使用 cartList 在渲染页面啊  明白吗 ?
      bindHtml()
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