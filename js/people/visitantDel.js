/**
 * 删除访客提示
 * Created by land on 2017/9/18.
 */
define(["jquery","artTemplate","common/api","text!tpls/peopleVisitantDel.html","bootstrap"],function($,art,API,visitantDelTpl){
    return function(vs_id){
           
            // 渲染模板
            var $visitantDel=$(visitantDelTpl);
            var vs_id = vs_id;
            // 提交表单
            $visitantDel.on("submit", "form", function () {
            API.delVisitor(vs_id, function (res) {
                $visitantDel.modal("hide");
                $(".modal-backdrop").remove();
                $("#modalVisitantEditInfo").remove();
                $(".btnVisitantList").trigger("click");
            })
            return false;
        })
        //移除上一次模板 
        $("#modalDelVisitant").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        // $(".modal-backdrop").remove();
        $visitantDel.appendTo("body").modal();
        $(".vsDelInfo").html("删除");
    }
})