/**
 * 注销访客提示
 * Created by land on 2017/9/18.
 */
define(["jquery","artTemplate","common/api","text!tpls/peopleVisitantDel.html","bootstrap"],function($,art,API,visitantDelTpl){
    
    return function(vs_id){
     
            $("#modalDelVisitant").remove();

            var $visitantDel=$(visitantDelTpl);
            var vs_id = vs_id;

            $visitantDel.on("submit", "form", function () {
            console.log(vs_id)
            API.delVisitor(vs_id, function (res) {
                console.log(res)
                $visitantDel.modal("hide");
                $(".btnVisitantList").trigger("click");
            })

            return false;
        })
            $visitantDel.appendTo("body").modal();

    }
})