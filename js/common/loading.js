/**
 *
 * Author:land
 *   Date:2017/9/6
 */
define(["jquery", "text!tpls/loading.html"], function ($, loadingTpl) {
    var $loadingTpl = $(loadingTpl);

    $.ajaxSetup({
        /**
         * ajax请求发送之前执行的回调函数
         */
        beforeSend: function () {
            $loadingTpl.appendTo("body").modal({
                backdrop: "static" //模态框不会自动关闭
            })
        },
        /**
         * ajax请求完成(成功 or 失败)之后执行的回调函数
         */
        complete: function (xhr,status) {
            console.log(status)
            var sessionStatus = xhr.getResponseHeader('sessionstatus');
            if (status != 'success') {
                confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                location.href="login.html";
            }
            $loadingTpl.modal("hide");
        }
    })
});