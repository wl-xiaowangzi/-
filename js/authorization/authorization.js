/**
 * 填写授权信息
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/authorizationInfo.html", "common/api","./qrcode"], function ($, art,authorizationInfoTpl, API,qrcode ) {
    return function () {
        // 渲染模板
        var authorizationInfo=art.render(authorizationInfoTpl);
        var $authorizationInfo=$(authorizationInfo);
        // 提交表单
        $authorizationInfo
        .on("click","#qrcode",function(){
            qrcode()
        }) 
        .on("click","#lastStep",function(){
            $("#choiceRole").removeClass("displayN");
            $("#authorizationInfo").empty();
        })   
        // 清除上一次的模板
        $("#choiceRole").addClass("displayN");
        $("#authorizationInfoCon").empty();
        $("#authorizationInfoCon").append($authorizationInfo);
    };
});