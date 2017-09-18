/**
 * 人员列表
 * Created by landon 2017/9/4.
 */

define(["jquery","artTemplate","common/api","text!tpls/peopleList.html","./baseInfo","./visitant","./add","./del","common/camera"],function($,art,API,peopleListTpl,baseInfo,visitant,peopleAdd,peopleDel,camera){

    return function(){
            API.getPeopleList(0,60,function(res){
            
            //编译模板
            var peopleList=art.render(peopleListTpl,res);

            //将编译成功的内容转换为jquery对象(--->方便后续的事件绑定)
            var $peopleList=$(peopleList);

            //实现人员管理事件
            $peopleList
            .on("click","#peopleAdd",function(){
                peopleAdd();
            })
            .on("click",".btn-people-del",function(){
                //1、获取员工id
                var ep_id=$(this).attr("ep_id");
                // 传参
                peopleDel(ep_id);
            })
            .on("click","#peopleVisitantList",function(){
               visitant();
            })
            .on("click",".btn-edit-course-baseinfo",function(){
                //编辑员工基本信息
                //1、获取员工id
                var ep_id=$(this).parent().attr("ep_id");
                //将员工id传入信息模块
                baseInfo(ep_id)
            })
            
            //把渲染好的元素放到页面中
            $(".module-container").append($peopleList);
        })

        

    }
})