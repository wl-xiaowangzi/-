/**
 * 注销员工提示
 * Created by land on 2017/9/11.
 */
define(["jquery","artTemplate","common/api","text!tpls/peopleDel.html","bootstrap"],function($,art,API,peopleDelTpl){
    
    return function(ep_id){
     
            $("#modalDelPeople").remove();

            var $peopleDel=$(peopleDelTpl);
            var ep_id = ep_id;

            $peopleDel.on("submit", "form", function () {
            
            API.delEmployee(ep_id, function (res) {
                
                $peopleDel.modal("hide");
                $("#btnPeopleManager").trigger("click");
            })

            return false;
        })
            $peopleDel.appendTo("body").modal();

    }
})