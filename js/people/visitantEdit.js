/**
 * 编辑访客基本信息
 * Author:land
 *   Date:2017/12/6
 */
define(["jquery","artTemplate","common/api","text!tpls/peopleVisitantEdit.html","text!tpls/peopleSubAuthority.html","common/editCamera1","common/editCamera2", "./choicePicture1", "./choicePicture2"],function ($,art,API,peopleVisitantEditTpl,peopleSubAuthorityTpl,editCamera1,editCamera2,choicePicture1,choicePicture2) {

    return function(vs_id){
        //把渲染好的元素放到页面中
        //根据访客id获取访客基本信息
        API.getVisitorBaseInfo(vs_id,function(res){
            // 渲染模板
            var peopleVisitantEdit=art.render(peopleVisitantEditTpl,res.data);
            var $peopleVisitantEdit=$(peopleVisitantEdit);
            // 选择照片
            var ps_id = vs_id;
            var ps_type = 2;
            var ps_name = res.data.name;
            var keyword;
             // 设置部门及授权组默认值
            var auID=res.data.authorizationgroupid;
            auID="au"+auID;
            //  授权组选项
            API.queryAuthorizationgroupList(0, 100, keyword,1, function (res) {
                var peopleSubAuthority = art.render(peopleSubAuthorityTpl,res);
                 var $peopleSubAuthority = $(peopleSubAuthority);
                 $("#VE-authorization").append($peopleSubAuthority);
                 $("#"+auID).prop("selected","selected");
            })
            $peopleVisitantEdit.on("click", ".picture1", function () {
                choicePicture1(ps_id,ps_type,ps_name);
            });
            $peopleVisitantEdit.on("click", ".picture2", function () {
                choicePicture2(ps_id,ps_type,ps_name);
            });
            // 提交表单
            $peopleVisitantEdit
            .on("submit","form",function(){
                var visitorid=ps_id;
                var firstFacedatas = $("#VE-submit").parent().attr("firstFacedatas").replace(/\[|]/g, '');
                var firstFaceimages = $("#VE-submit").parent().attr("firstFaceimages");
                var secondFacedatas = $("#VE-submit").attr("secondFacedatas").replace(/\[|]/g, '');
                var secondFaceimages = $("#VE-submit").attr("secondFaceimages");
                var facetypes1 = $("#VE-submit").parent().attr("facetypes1")||1;
                var facetypes2 = $("#VE-submit").attr("facetypes2")||1;
                var authorizationgroupid = $("#VE-authorization").val();
                var birthday=$("#VE-birthday").val();
                var phonenumber=$("#VE-phonenumber").val();
                var name=$("#visitantInfoName").val();
                var remark = $("#VE-remark").val();
                var starttime = $("#VE-starttime").val();
                var endtime = $("#VE-endtime").val();
                var sex=$("#VE-sex").val();
                // 设置条件1张or2张照片
                if (secondFaceimages == undefined) {
                    var faceimages = firstFaceimages;
                    var facedatas = "[" + firstFacedatas + "]";
                    var facetypes = facetypes1;
                } else {
                    var faceimages = firstFaceimages + "," + secondFaceimages;
                    var facedatas = "[" + firstFacedatas + "]|" + "[" + secondFacedatas + "]";
                    var facetypes = facetypes1+","+facetypes2;
                }
                if(Date.parse(starttime)>Date.parse(endtime)){
                    alert("结束时间不能小于开始时间");
                }else{
                    console.log(visitorid,authorizationgroupid,name,sex,birthday,phonenumber,starttime,endtime, remark,facedatas,faceimages,facetypes)
                // 编辑访客
                API.editVisitor(visitorid,authorizationgroupid,name,sex,birthday,phonenumber,starttime,endtime, remark,facedatas,faceimages,facetypes,function(res){
                    $peopleVisitantEdit.modal("hide");
                    //数据更新成功-->跳转到员工列表
                    $("#btnVisitorManager").trigger("click");
                })
                }
                return false;
            })
            $(".module-container").empty();
            $(".module-container").append($peopleVisitantEdit);
            $("#"+auID).prop("selected","selected");
            // 为下拉框替换左侧小三角
            var flag=true;
            $("select").on("click",function(){
                if(flag){
                    $(this).addClass("triangle_down");
                    flag=false;
                }else{
                    $(this).removeClass("triangle_down");
                    flag=true;
                }
            })
            // 日期控件
            $peopleVisitantEdit.find(".birthday-join").datetimepicker({
            format: 'yyyy-mm-dd',
            weekStart: 1,
            autoclose: true,
            startView: 4,
            minView: 2,
            forceParse: false,
            language: 'zh-CN'
            });
            //渲染入库日期-->日期控件
            var newDate = new Date();
            var t = newDate.toJSON(); 
            $peopleVisitantEdit.find(".date-join").datetimepicker({
                weekStart:1,//一周从哪一天开始。0（星期日）到6（星期六）
                format: 'yyyy-mm-dd h:ii:ss',//选ii才能选择分钟
                //daysOfWeekDisabled:[0,1,2]  //指定周几不能使用
                autoclose:true,
                minView:0,
                minuteStep:5,
                todayBtn:true,
                todayHighlight:true,
                startDate:new Date(t),
                language:"zh-CN"
            });
       })
    }
})