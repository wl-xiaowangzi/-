/**
 * 注销员工提示
 * Created by land on 2017/9/11.
 */
define(["jquery","artTemplate","common/api","text!tpls/peopleDel.html","bootstrap"],function($,art,API,peopleDelTpl){
    return function(ep_id){
            // 渲染模板
            var $peopleDel=$(peopleDelTpl);
            var ep_id = ep_id;
            // 提交表单
            $peopleDel.on("submit", "form", function () {
            API.delEmployee(ep_id, function (res) {
                $peopleDel.modal("hide");
                $("#btnPeopleManager").trigger("click");
            })
            return false;
        })
        // 移除模态框
        $("#modalDelPeople").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        // $(".modal-backdrop").remove();
        $peopleDel.appendTo("body").modal();
    }
})