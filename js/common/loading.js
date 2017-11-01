/**
 *
 * Author:land
 *   Date:2017/9/6
 */
define(["jquery", "text!tpls/loading.html","common/prompt"], function ($, loadingTpl,prompt) {
    var $loadingTpl = $(loadingTpl);
    $.ajaxSetup({
        /**
         * ajax请求发送之前执行的回调函数
         */
        beforeSend: function () {
            $(".module-container").append($loadingTpl);
        },
        /**
         * ajax请求完成(成功 or 失败)之后执行的回调函数
         */
        complete: function (xhr,status) {
            // 状态不成功
            console.log(status)
            if (status != 'success') {
                prompt('由于您长时间没有操作, session已过期, 请重新登录.')
                $("button").on("click",function(){
                    location.href="login.html";
                })
                
            }
            $loadingTpl.remove();
        }
    })
});