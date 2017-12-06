/**
 * 填写授权信息
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/authorizationInfo.html", "text!tpls/peopleSubAuthority.html", "text!tpls/peopleSubOrg.html", "common/api","./authorityNew","./qrcode"], function ($, art,authorizationInfoTpl, peopleSubAuthorityTpl,peopleSubOrgTpl,API,authorityNew,qrcode ) {
    return function (content) {
        // 渲染模板
        var authorizationInfo=art.render(authorizationInfoTpl);
        var $authorizationInfo=$(authorizationInfo);
        var organizationid=$.cookie("organizationid");
        var content = content;
        $("#btnPersontype").attr("content",content)
        var keyword;
         // 组织加购选项
            API.getTree(organizationid, function (res) {
                 var peopleSubOrg = art.render(peopleSubOrgTpl,res.data[0]);
                 var $peopleSubOrg = $(peopleSubOrg);
                 $("#department").append($peopleSubOrg);
             })
            //  授权组选项
            API.queryAuthorizationgroupList(0, 100, keyword,1, function (res) {
                var peopleSubAuthority = art.render(peopleSubAuthorityTpl,res);
                 var $peopleSubAuthority = $(peopleSubAuthority);
                 $("#group").append($peopleSubAuthority);
            })
        // 提交表单
        $authorizationInfo
        .on("click","#qrcode",function(){
            var content=$("#btnPersontype").attr("content");
            var authorizationgroupid=$("#group").val();
            var organizationid=$("#department").val();
            console.log(content)
            content=content+"&authorizationgroupid="+authorizationgroupid+"&organizationid="+organizationid;
            var size = 260;
            var logoword = "门禁二维码";
            qrcode(content, size, logoword);
        }) 
        .on("click","#lastStep",function(){
            $("#choiceRole").removeClass("displayN");
            $("#authorizationInfo").empty();
        }) 
        .on("click","#new-group",function(){
            authorityNew()
        })  
        // 清除上一次的模板
        $("#choiceRole").addClass("displayN");
        $("#authorizationInfoCon").empty();
        $("#authorizationInfoCon").append($authorizationInfo);
    };
});