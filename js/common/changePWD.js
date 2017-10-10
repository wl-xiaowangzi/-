/**
 * 个人中心
 * Author:land
 *   Date:2017/9/4
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/changePWD.html", ], function ($, art, API, changePWDTpl) {

    return function () {

        $("#modalChangePWD").remove();

        // var personalCenter=art.render(personalCenterTpl,res.result);

        var $changePWD = $(changePWDTpl);

        $changePWD
            .on("click", ".oldPWD", function () {
                if ($(".oldPassword").attr("type") == "password") {
                    $(".oldPassword").attr("type", "text");
                    $(".oldPWD").removeClass("eye-close").addClass("eye-open")
                } else {
                    $(".oldPassword").attr("type", "password");
                    $(".oldPWD").removeClass("eye-open").addClass("eye-close")
                }
            })
            .on("click", ".newPWD", function () {
                if ($(".newPassword").attr("type") == "password") {
                    $(".newPassword").attr("type", "text");
                    $(".newPWD").removeClass("eye-close").addClass("eye-open")
                } else {
                    $(".newPassword").attr("type", "password");
                    $(".newPWD").removeClass("eye-open").addClass("eye-close")
                }
            })
            .on("click", ".confirmPWD", function () {
                if ($(".confirmPassword").attr("type") == "password") {
                    $(".confirmPassword").attr("type", "text");
                    $(".confirmPWD").removeClass("eye-close").addClass("eye-open")
                } else {
                    $(".confirmPassword").attr("type", "password");
                    $(".confirmPWD").removeClass("eye-open").addClass("eye-close")
                }
            })
           .on("input",".confirmPassword",function(){
               if($(".newPassword").val()!=$(".confirmPassword").val()){
                  $(".cfmPWD").addClass("opacity1").html("两次输入密码不一致！");
               }else{
                   $(".cfmPWD").removeClass("opacity1");
               }
           })
           
        .on("submit","form",function(){

            var formData=$(this).serialize();

            API.changePWD(formData,function(res){
                if(res.message=="原密码错误！"){
                    $(".cfmPWD").addClass('opacity1').html("原密码错误！")
                    return;
                }
                $changePWD.modal("hide");
            })

            return false;
        })

        $changePWD.appendTo("body").modal();
        

    }
})