"use strict";function initSelect(){function t(){var i=!0;$(".cart-middle .select").each(function(t,a){!1===$(a).hasClass("active")&&(i=!1)}),i?($(".tools .all").addClass("active"),$(".header-list .all").addClass("active")):($(".tools .all").removeClass("active"),$(".header-list .all").removeClass("active"))}$(".header-list .all").click(function(){$(this).toggleClass("active"),$(".cart-middle").children(".select").addClass("active"),$(".cart-title").children(".select").addClass("active"),$(".tools .all").toggleClass("active")}),$(".cart-middle").children(".select").click(function(){$(this).toggleClass("active"),$(this).hasClass("active")?$(this).parents(".cart-list").children(".cart-title").children(".select").addClass("active"):$(this).parents(".cart-list").children(".cart-title").children(".select").removeClass("active"),t()}),$(".cart-title").children(".select").click(function(){$(this).toggleClass("active"),$(this).hasClass("active")?$(this).parents(".cart-list").children(".cart-middle").children(".select").addClass("active"):$(this).parents(".cart-list").children(".cart-middle").children(".select").removeClass("active"),t()}),$(".tools .all").click(function(){$(this).toggleClass("active"),$(".cart-middle").children(".select").addClass("active"),$(".cart-title").children(".select").addClass("active"),$(".header-list .all").toggleClass("active")})}function initCart(){var i=JSON.parse(localStorage.getItem("list")||"[]");0===i.length&&$(".hide").show();var a="";function n(){$(".money").each(function(){var t=parseFloat($(this).parents(".cart-middle").children(".item_price").text()),a=parseFloat($(this).parents(".cart-middle").children(".num_act").children("input").val());$(this).text(t*a+".00"),$(this).parents(".cart-list").children(".cart-amount").children("span").text(t*a+".00")})}function e(t){for(var a=0;a<i.length;a++)if(i[a].id==$(this).parents(".cart-list").attr("name")){i[a].num=t-1;break}localStorage.setItem("list",JSON.stringify(i))}function c(){var i=0;return $(".cart-amount").children("span").each(function(t,a){i+=Number($(a).text())}),i}i.forEach(function(t){a+='      \n        <div class="cart-list" name="'.concat(t.id,'">\n\n        <div class="cart-title">\n          <a href="javascript:;" class="select">\n            <i class="iconfont icon-gouxuan"></i>\n          </a>\n          谷高数码手机专营店\n        </div>\n\n        <div class="cart-middle clearfix">\n          <a href="javascript:;" class="select">\n            <i class="iconfont icon-gouxuan"></i>\n          </a>\n          <img src="').concat(t.img,'" alt="">\n          <div class="info">\n            <a href="javascript:;">\n              ').concat(t.info,'\n            </a>\n            <p>\n              <span> 7 </span>\n              <a href="javascript:;">\n                紫玉幻境 4G版 全网通8G+256G\n              </a>\n            </p>\n          </div>\n\n          <p class="item_price fl">\n            ').concat(t.money,'\n          </p>\n\n          <div class="num_act fl">\n            <span class="bth-down"> - </span>\n            <input type="text" value="').concat(t.num+1,'">\n            <span class="bth-up"> + </span>\n          </div>\n\n          <div class="amount fl">\n            <div class="money">\n\n            </div>\n            <div class="weight">\n              1.00kg\n            </div>\n          </div>\n\n          <div class="item_act fl">\n            <i class="iconfont icon-02"></i>\n            <i class="iconfont icon-lajitong del"></i>\n          </div>\n\n\n        </div>\n\n        <div class="cart-amount">\n          商品总价格 : \n          <span></span>\n        </div>\n\n        </div>')}),$(".cart-in").html(a),n(),$(".bth-up").click(function(){$(".goods_num").text(Number($(".goods_num").text())+1);var t=$(this).prev().val();1<++t&&$(this).prevAll(".bth-down").css("color","#666"),$(this).prev().val(t),n(),e.call(this,t),$(".total").text("¥"+c()+".00")}),$(".bth-down").click(function(){$(".goods_num").text(Number($(".goods_num").text())-1);var t=$(this).next().val();--t<2?$(this).css("color","#dfdfdf"):$(this).css("color","#666"),t<1?t=1:($(this).next().val(t),n(),e.call(this,t),$(".total").text("¥"+c()+".00"))}),$(".del").click(function(){var a=this;$(this).parents(".cart-list").remove();var t=JSON.parse(localStorage.getItem("list")||"[]").filter(function(t){return!($(a).parents(".cart-list").attr("name")==t.id)});localStorage.setItem("list",JSON.stringify(t))})}$(function(){initCart(),initSelect();var i,n,t=$(".cart-list");$(".res").text(t.length),$(".all-del").click(function(){alert("是否需要全部删除"),$(".cart-list").remove(),localStorage.removeItem("list")}),$(".goods_num").text((i=0,$(".num_act").children("input").each(function(t,a){i+=Number($(a).val())}),i)),$(".total").text("¥"+(n=0,$(".cart-amount").children("span").each(function(t,a){n+=Number($(a).text())}),n)+".00")});