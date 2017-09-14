/**
 * 访客列表
 * Created by land on 2017/9/2.
 */
define(["jquery","artTemplate","text!tpls/peopleVisitantList.html","./visitantinfo","./visitantAdd"],function($,art,peopleVisitantListTpl,visitantinfo,visitantAdd){

    return function(){

        $.get("http://39.108.171.172:8081/facerecognition/system/visitor/query",{limit:12,start:0},function(res){
            console.log(res)
             $(".module-container").empty();
          
            //编译模板
            var peopleVisitantList=art.render(peopleVisitantListTpl,res);

            //将编译成功的内容转换为jquery对象(--->方便后续的事件绑定)
            var $peopleVisitantList=$(peopleVisitantList);
            //编辑入库信息
            $peopleVisitantList
            .on("click",".btn-peopleList",function(){
                $("#btnPeopleManager").trigger("click");
            })
            .on("click",".btn-edit-visitant-baseinfo",function(){
                var vs_id=$(this).parent().attr("vs_id");
                visitantinfo(vs_id);
            })
            .on("click","#visitantAdd",function(){
                visitantAdd();
            })
            //把渲染好的元素放到页面中
            $(".module-container").append($peopleVisitantList);
        },"jsonp")



    }
})