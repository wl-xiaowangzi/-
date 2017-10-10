/**
 * 个人中心
 * Author:land
 *   Date:2017/9/3
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/personalCenter.html"], function ($, art, API, personalCenterTpl) {

    return function () {
        var userid = $.cookie("userid");
        API.queryUser(userid, function (res) {

            console.log(res)
            $("#modalPersonalCenter").remove();

            var personalCenter = art.render(personalCenterTpl, res.data[0]);

            var $personalCenter = $(personalCenter);
            var frm = null;
            var timer = null

            
            $personalCenter


            // .on("submit","form",function(){

            //     var formData=$(this).serialize();

            //     API.editSavePersonalCenter(formData,function(){
            //         location.href="/";//刷新页面
            //     })

            //     return false;
            // })



            $personalCenter.appendTo("body").modal();
            
            
        })

    }
})