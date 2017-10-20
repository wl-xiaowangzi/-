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
        API.getRecordList(organizationid, starttime, endtime, start, limit,persontype,similarity,keyword,personid, function (res) {
            //编译模板
            var peopleChoicePicture = art.render(peopleChoicePictureTpl, res);
            var $peopleChoicePicture = $(peopleChoicePicture);
            // 移出上一次的模态框
            $("#modalPeopleChoicePicture").remove();
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
                    $(".btn-blue").parent().attr("firstFaceimages",res.data[0].faceimage);
                    $(".btn-blue").parent().attr("firstFacedatas",res.data[0].facedata);
                    $(".btn-blue").parent().attr("facetypes1","2");
                    $(".headfaceimage1").attr("src",res.data[0].faceimage);
                    $peopleChoicePicture.modal("hide");
                    })
                })
                .on("click",".loadMore",function(){
                    page++
                    // editLoadMore(ps_id,ps_type,page)
                })
            // 渲染数据
            $peopleChoicePicture.appendTo("body").modal();
            $(".replaceName").html(ps_name);
            $("body").removeClass("noResult");
        })
    };
});