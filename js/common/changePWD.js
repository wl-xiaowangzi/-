/**
 * 个人中心
 * Author:land
 *   Date:2017/9/4
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/changePWD.html", ], function ($, art, API, changePWDTpl) {

    return function () {
        // API.changePWD(function(res){


        $("#modalChangePWD").remove();

        // var personalCenter=art.render(personalCenterTpl,res.result);

        var $changePWD = $(changePWDTpl);

        $changePWD
            .on("click", ".oldPWD", function () {
                if ($(".oldPassword").attr("type") == "password") {
                    $(".oldPassword").attr("type", "text");
                    $(".oldPWD").removeClass("glyphicon-eye-close").addClass("glyphicon-eye-open")
                } else {
                    $(".oldPassword").attr("type", "password");
                    $(".oldPWD").removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close")
                }
            })
            .on("click", ".newPWD", function () {
                if ($(".newPassword").attr("type") == "password") {
                    $(".newPassword").attr("type", "text");
                    $(".newPWD").removeClass("glyphicon-eye-close").addClass("glyphicon-eye-open")
                } else {
                    $(".newPassword").attr("type", "password");
                    $(".newPWD").removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close")
                }
            })
            .on("click", ".confirmPWD", function () {
                if ($(".confirmPassword").attr("type") == "password") {
                    $(".confirmPassword").attr("type", "text");
                    $(".confirmPWD").removeClass("glyphicon-eye-close").addClass("glyphicon-eye-open")
                } else {
                    $(".confirmPassword").attr("type", "password");
                    $(".confirmPWD").removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close")
                }
            })
           .on("input",".confirmPassword",function(){
               if($(".newPassword").val()!=$(".confirmPassword").val()){
                  $(".cfmPWD").addClass("opacity1");
               }else{
                   $(".cfmPWD").removeClass("opacity1");
               }
           })
           
        // .on("submit","form",function(){

        //     var formData=$(this).serialize();

        //     API.editSavePersonalCenter(formData,function(){
        //         location.href="/";//刷新页面
        //     })

        //     return false;
        // })

        $changePWD.appendTo("body").modal();

        // })


    }
})