/**
 * 编辑选择照片1
 * Author:land
 *   Date:2017/10/17
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/peopleChoicePicture.html", "common/editCamera1"], function ($, art, API, peopleChoicePictureTpl,editCamera1) {
    return function (ps_id,ps_type,ps_name) {
        // 获取参数
        var organizationid = $.cookie("organizationid");
        var time = new Date();
        var starttime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes();
        var endtime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (time.getDate()+1) + ' ' + time.getHours() + ':' + time.getMinutes();
        var page = $("#btnPager").attr("page")||1;
        var start = 0;
        var limit = 50*(page)-1;
        var similarity = $("#btnSimilarity").attr("similarity") || 0.75;
        var persontype = ps_type;
        var keyword = $("#btnSearchWords").attr("keyword");
        var personid=ps_id;
        // 清除参数
        $("#btnPager").removeAttr("page");
        // 调用识别记录接口
        API.queryRecordList(organizationid, starttime, endtime, start, limit,persontype,similarity,keyword,personid, function (res) {
            //编译模板
            var peopleChoicePicture = art.render(peopleChoicePictureTpl, res);
            var $peopleChoicePicture = $(peopleChoicePicture);
            // 设置事件
            $peopleChoicePicture
                .on("click",".editCamera1",function(){
                    $peopleChoicePicture.modal("hide");
                    editCamera1();
                })
                .on("click",".replaceIMG",function(){
                    // 设置点击后的样式
                    $(this).siblings().removeClass("opacity05");
                    $(this).addClass("opacity05");
                    // 调用接口
                    var datanumber = $(this).attr("datanumber");
                    API.showRecord(organizationid,starttime,endtime,start,limit,datanumber,function(res){
                    // 保存人脸数据
                    if(res.data[0].facedata==null){alert("该数据已损坏，请重新选择");return}
                    var data = res.data[0].facedata.replace(/\[|]/g, '')
                    if(data.substr(data.length-1,1)==","){
                        alert("该数据已损坏，请重新选择");
                        return
                    }
                    var facedata1 = "["+data+"]";
                    var facedata1 = JSON.parse(facedata1);
                    console.log(facedata1.length)
                    if(facedata1.length!=1024){alert("该数据已损坏，请重新选择");return}
                    console.log(res.data[0].facedata)
                    var firstFacedatas = res.data[0].facedata;
                    var firstFaceimages = res.data[0].faceimage;
                    $(".btn-blue").parent().attr("firstFaceimages",firstFaceimages);
                    $(".btn-blue").parent().attr("firstFacedatas",firstFacedatas);
                    $(".btn-blue").parent().attr("facetypes1","2");
                    $(".headfaceimage1").attr("src",res.data[0].faceimage);
                    // $peopleChoicePicture.modal("hide");
                    $peopleChoicePicture.css("width",0);
                    $(".modal-backdrop").remove();
                    })
                })
                .on("click",".loadMore",function(){
                    page++
                    // editLoadMore(ps_id,ps_type,page)
                })
            // 渲染数据
            // 移出上一次的模态框
            $("#modalPeopleChoicePicture").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            $peopleChoicePicture.appendTo("body").modal();
            $(".replaceName").html(ps_name);
            $("body").removeClass("noResult");
        })
    };
});