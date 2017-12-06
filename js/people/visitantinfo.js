/**
 * 编辑基本信息
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery","artTemplate","common/api","text!tpls/peopleVisitantInfo.html", "./visitantEdit","./visitantDel"],function ($,art,API,peopleVisitantInfoTpl,visitantEdit,visitantDel) {

    return function(vs_id){
        //把渲染好的元素放到页面中
        //根据访客id获取访客基本信息
        API.getVisitorBaseInfo(vs_id,function(res){
            // 渲染模板
            var peopleVisitantInfo=art.render(peopleVisitantInfoTpl,res.data);
            var $peopleVisitantInfo=$(peopleVisitantInfo);
            var ps_id = vs_id;
            // 提交表单
            $peopleVisitantInfo
                .on("click", ".btn-visitant-del", function () {
                    var vs_id = $(this).attr("vs_id");
                    visitantDel(vs_id);
                    return false;
                })
                .on("click","#PE-submit",function(){
                    $("#modalVisitantEditInfo").remove();
                    $(".modal-backdrop").remove();
                    visitantEdit(ps_id);
                    return false;
                })
            // 移除上一次模态框
            $("#modalVisitantEditInfo").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            $peopleVisitantInfo.appendTo("body").modal();
       })
    }
})