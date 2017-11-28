/**
 * 这是注释的内容
 * Author:land
 *   Date:2017/9/6
 */
define(["jquery"],function($){
    // var api="http://39.108.171.172:80/facerecognition";
    var api="http://127.0.0.1:80/facerecognition";
    // var ap = window.location.href.substr(23,1);
    // if(ap=="h"){
    //     var api="https://guard.heils.cn/heils/facerecognition"
    // }else if(ap=="f"){
    //     var api="https://guard.heils.cn/fostone/facerecognition"
    // }else{
    //     var api="https://guard.heils.cn:80/facerecognition"
    // }
    // console.log(ap)
    return {
        // 识别记录
        getRecordList:function(organizationid,starttime,endtime,start,limit,persontype,similarity,keyword,personid,callback){
            $.get(api+"/system/record/query",{organizationid:organizationid,starttime:starttime,endtime:endtime,start:start,limit:limit,persontype:persontype,similarity:similarity,keyword:keyword,personid:personid},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                if(res.data.length==0){
                    $("body").addClass("noResult")
                }else{
                    $("body").removeClass("noResult")
                }
                callback && callback(res);
            })
        },
        
        //查询识别记录（无加载动画）
        queryRecordList:function(organizationid,starttime,endtime,start,limit,persontype,similarity,keyword,personid,callback){
            $.ajax({
                url:api+"/system/record/query",
                type:"get",
                data:{organizationid:organizationid,starttime:starttime,endtime:endtime,start:start,limit:limit,persontype:persontype,similarity:similarity,keyword:keyword,personid:personid},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 查看详细信息
        showRecord:function(organizationid,starttime,endtime,start,limit,datanumber,callback){
            $.ajax({
                url:api+"/system/record/query",
                type:"get",
                data:{organizationid:organizationid,starttime:starttime,endtime:endtime,start:start,limit:limit,datanumber:datanumber},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 识别记录人脸替换
        replaceRecordIMG:function(ps_id,ps_type,facedata,faceimage,callback){
            $.ajax({
                url:api+"/system/record/updatefaceimage",
                type:"post",
                data:{personid:ps_id,persontype:ps_type,facedata:facedata,faceimage:faceimage},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 识别记录导出
        exportRecord:function(organizationid,starttime,endtime,persontype,similarity,callback){
            $.ajax({
                url:api+"/system/record/export",
                type:"post",
                data:{organizationid:organizationid,starttime:starttime,endtime:endtime,persontype:persontype,similarity:similarity},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    alert(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 识别记录导出状态检测
        exportRecordCheck:function(uid,callback){
            $.ajax({
                url:api+"/system/record/exportcheck",
                type:"get",
                data:{uid:uid},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 入库审批列表
        getApprovalList:function(start,limit,keyword,callback){
            $.ajax({
                url:api+"/system/person/query",
                type:"get",
                data:{start:start,limit:limit,keyword:keyword},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                if(res.data.length==0){
                    $("body").addClass("noResult")
                }else{
                    $("body").removeClass("noResult")
                }
                callback && callback(res);
                }
            })
        },
        // 定时请求不用调loading
        queryApprovalList:function(start,limit,keyword,callback){
            $.ajax({
                url:api+"/system/person/query",
                type:"get",
                data:{start:start,limit:limit,keyword:keyword},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 查看审核详细信息
        queryApproval:function(ps_id,ps_type,callback){
            $.get(api+"/system/person/query",{personid:ps_id,persontype:ps_type},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
            })
        },
        // 员工审批列表
        getPeopleApprovalList:function(start,limit,status,keyword,callback){
            $.get(api+"/system/employee/query",{start:start,limit:limit,status:status,keyword:keyword},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                if(res.data.length==0){
                    $("body").addClass("noResult")
                }else{
                    $("body").removeClass("noResult")
                }
                callback && callback(res);
            })
        },
        // 员工审核详细信息
         getPeopleCheckInfo:function(ep_id,callback){
            $.get(api+"/system/employee/getCheckinfos",{employeeid:ep_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
            })
        },
        // 员工审核
        checkEmployee:function(ep_id,isagree,checksuggestion,callback){
            $.ajax({
                url:api+"/system/employee/check",
                type:"post",
                data:{employeeid:ep_id,isagree:isagree,checksuggestion:checksuggestion},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 访客审批列表
        getVisitorApprovalList:function(start,limit,status,keyword,callback){
            $.get(api+"/system/visitor/query",{start:start,limit:limit,status:status,keyword:keyword},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                if(res.data.length==0){
                    $("body").addClass("noResult")
                }else{
                    $("body").removeClass("noResult")
                }
                callback && callback(res);
            })
        },
        // 访客审核详细信息
         getVisitorCheckInfo:function(vs_id,callback){
            $.get(api+"/system/visitor/getCheckinfos",{visitorid:vs_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
            })
        },
        // 访客审核
        checkVisitor:function(ps_id,isagree,checksuggestion,callback){
            $.ajax({
                url:api+"/system/visitor/check",
                type:"post",
                data:{visitorid:ps_id,isagree:isagree,checksuggestion:checksuggestion},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 图片上传
        uploadImage:function(imagefile,callback){
            $.ajax({
                url:api+"/api/uploadFileBase64",
                timeout:100000,
                type:"post",
                data:{imagefile:imagefile},
                beforeSend:function(res){},
                complate:function(status){
                    console.log(status);
                },
                success:function(res){
                callback && callback(res);
                }
            })
        },

        // 员工列表
        getPeopleList:function(start,limit,keyword,callback){
            $.get(api+"/system/employee/query",{start:start,limit:limit,keyword:keyword},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                if(res.data.length==0){
                    $("body").addClass("noResult")
                }else{
                    $("body").removeClass("noResult")
                }
                callback && callback(res);
            })
        },
        // 员工添加
        addEmployee:function(deviceids,name,sex,brithday,phonenumber,employeenumber,job,faceimages,facedatas,facetypes,callback){
            $.ajax({
                url:api+"/system/employee/add",
                type:"post",
                data:{deviceids:deviceids,name:name,sex:sex,birthtime:brithday,phonenumber:phonenumber,employeenumber:employeenumber,job:job,faceimages:faceimages,facedatas:facedatas,facetypes:facetypes},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message=="该机构手机号码已经被使用！"){
                        alert("该手机号码已被注册")
                    }
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
          /**
         * 根据员工id获取员工基本信息
         * @param ep_id 员工id
         * @param callback
         */
        getEmployeeBaseInfo:function(ep_id,callback){
            $.ajax({
                url:api+"/system/employee/queryDateil",
                type:"get",
                data:{employeeid:ep_id},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 员工编辑
        editEmployee:function(ep_id,deviceids,name,sex,birthday,phonenumber,job,employeenumber,facedatas,faceimages,facetypes,callback){
            $.ajax({
                url:api+"/system/employee/update",
                type:"post",
                data:{employeeid:ep_id,deviceids:deviceids,name:name,sex:sex,birthtime:birthday,phonenumber:phonenumber,job:job,employeenumber:employeenumber,facedatas:facedatas,faceimages:faceimages,facetypes:facetypes},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message=="手机号已经被其它雇员使用"){
                        alert("该手机号码已被注册")
                    }
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 员工注销
        delEmployee:function(ep_id,callback){
            $.ajax({
                url:api+"/system/employee/delete",
                type:"post",
                data:{employeeids:ep_id},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 访客列表
        getVisitorList:function(start,limit,keyword,callback){
            $.get(api+"/system/visitor/query",{start:start,limit:limit,keyword:keyword},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                if(res.data.length==0){
                    $("body").addClass("noResult")
                }else{
                    $("body").removeClass("noResult")
                }
                callback && callback(res);
            })
        },
        // 访客添加
        addVisitor:function(deviceids,name, sex, birthday, phonenumber,starttime,endtime, remark, faceimages, facedatas,facetypes,callback){
            $.ajax({
                url:api+"/system/visitor/add",
                type:"post",
                data:{deviceids:deviceids,name:name,sex:sex,birthtime:birthday,phonenumber:phonenumber,starttime:starttime,endtime:endtime,remark:remark,faceimages:faceimages,facedatas:facedatas,facetypes:facetypes},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message=="该机构手机号码已经被使用！"){
                        alert("该手机号码已被注册")
                    }
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        /**
         * 根据访客id获取访客基本信息
         * @param ep_id 访客id
         * @param callback
         */
        getVisitorBaseInfo:function(vs_id,callback){
             $.ajax({
                url:api+"/system/visitor/queryDateil",
                type:"get",
                data:{visitorid:vs_id},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 访客编辑
        editVisitor:function(vs_id,deviceids,name,sex,birthday,phonenumber,starttime,endtime, remark,facedatas,faceimages,facetypes,callback){
            $.ajax({
                url:api+"/system/visitor/update",
                type:"post",
                data:{visitorid:vs_id,deviceids:deviceids,name:name,sex:sex,birthtime:birthday,phonenumber:phonenumber,starttime:starttime,endtime:endtime,remark:remark,facedatas:facedatas,faceimages:faceimages,facetypes:facetypes},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message=="手机号已经被其它访客使用"){
                        alert("该手机号码已被注册")
                    }
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 访客注销
        delVisitor:function(vs_id,callback){
             $.ajax({
                url:api+"/system/visitor/delete",
                type:"post",
                data:{visitorids:vs_id},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 过期访客删除
        expiredVisitor:function(vs_id,callback){
            $.ajax({
                url:api+"/system/visitor/expired",
                type:"post",
                data:{visitorids:vs_id},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 系统设置
        // 系统消息查询
        getMessageList:function(start,limit,callback){
            $.ajax({
                url:api+"/system/message/query",
                type:"get",
                data:{start:start,limit:limit},
                beforeSend:function(){
                    // console.log(1)
                },
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                if(res.data.length==0){
                    $("body").addClass("noResult")
                }else{
                    $("body").removeClass("noResult")
                }
                callback && callback(res);
                }
            })
        },
        // 系统消息详情
        getMessage:function(datanumber,callback){
            $.get(api+"/system/message/getMessage",{datanumber:datanumber},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
            })
        },
        // 系统消息读取
        readMessage:function(datanumber,callback){
            $.get(api+"/system/message/read",{datanumber:datanumber},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                if(res.data.length==0){
                    $("body").addClass("noResult")
                }else{
                    $("body").removeClass("noResult")
                }
                callback && callback(res);
            })
        },
        // 系统参数列表
         getParameterList:function(start,limit,para_key,callback){
            $.get(api+"/system/systemparameter/queryDetail",{start:start,limit:limit,parameterkey:para_key},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
            })
        },
        // 系统参数增加
         addParameter:function(organizationid,para_key,itemparameterdata,description,callback){
            $.ajax({
                url:api+"/system/systemparameter/update",
                type:"post",
                data:{organizationid:organizationid,parameterkey:para_key,itemparameterdata:itemparameterdata,description:description},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 系统参数查询
        queryParameter:function(para_key,callback){
            $.get(api+"/system/systemparameter/queryDetail",{parameterkey:para_key},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
            })
        },
        // 系统参数编辑
        editParameter:function(formData,callback){
            $.ajax({
                url:api+"/system/systemparameter/update",
                type:"post",
                data:formData,
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        //系统参数删除
        delParameter:function(para_key,callback){
            $.post(api+"/system/systemparameter/delete",{parameterkeys:para_key},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }

                callback && callback();

            })
        },
        // 设备列表
        getDeviceList:function(start,limit,keyword,callback){
            $.get(api+"/system/device/query",{start:start,limit:limit,keyword:keyword},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                if(res.data.length==0){
                    $("body").addClass("noResult")
                }else{
                    $("body").removeClass("noResult")
                }
                callback && callback(res);
            })
        },
        // 查询设备列表（不带加载动画）
        queryDeviceList:function(start,limit,keyword,callback){
             $.ajax({
                url:api+"/system/device/query",
                type:"get",
                data:{start:start,limit:limit,keyword:keyword},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 添加设备
        addDevice:function(formData,callback){
            $.ajax({
                url:api+"/system/device/add",
                type:"post",
                data:formData,
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
         // 查看设备信息
        queryDevice:function(dv_id,callback){
            $.ajax({
                url:api+"/system/device/query",
                type:"get",
                data:{deviceid:dv_id},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 设备编辑
        editDevice:function(formData,callback){
            $.ajax({
                url:api+"/system/device/update",
                type:"post",
                data:formData,
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        //删除设备
        delDevice:function(dv_id,callback){
            $.ajax({
                url:api+"/system/device/delete",
                type:"post",
                data:{deviceids:dv_id},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
         // 机构管理
        // 中广信息机构查询机构树
        queryTree:function(organizationid,callback){
            $.get(api+"/system/organization/queryTree",{organizationid:organizationid},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                if(res.data.length==0){
                    $("body").addClass("noResult")
                }else{
                    $("body").removeClass("noResult")
                }
                callback && callback(res);
            })
        },
        // 中广信息机构查询机构树
        getTree:function(organizationid,callback){
            $.ajax({
                url:api+"/system/organization/queryTree",
                type:"get",
                data:{organizationid:organizationid},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 获取机构id
         getOrganizationId:function(parentorganizationid,callback){
            $.ajax({
                url:api+"/system/organization/getOrganizationId",
                type:"get",
                data:{parentorganizationid:parentorganizationid},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 增加机构
        addOrganization:function(organizationid,name,parentorganizationid,principal,qcode,callback){
            $.ajax({
                url:api+"/system/organization/add",
                type:"post",
                data:{organizationid:organizationid,name:name,parentorganizationid:parentorganizationid,principal:principal,qcode:qcode},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    alert(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
           // 修改机构
        editOrganization:function(organizationid,name,parentorganizationid,principal,qcode,callback){
            $.ajax({
                url:api+"/system/organization/update",
                type:"post",
                data:{organizationid:organizationid,name:name,parentorganizationid:parentorganizationid,principal:principal,qcode:qcode},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    alert(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
           // 删除机构
        delOrganization:function(organizationids,callback){
            $.ajax({
                url:api+"/system/organization/delete",
                type:"post",
                data:{organizationids:organizationids},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    alert(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
             // 查询机构
        queryOrganization:function(keyword,limit,start,callback){
            $.ajax({
                url:api+"/system/organization/query",
                type:"get",
                data:{keyword:keyword,limit:limit,start:start},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    alert(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 用户信息
        // 用户列表
        getUsersList:function(start,limit,keyword,callback){
            $.get(api+"/system/user/query",{start:start,limit:limit,keyword:keyword},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                if(res.data.length==0){
                    $("body").addClass("noResult")
                }else{
                    $("body").removeClass("noResult")
                }
                callback && callback(res);
            })
        },
        // 增加用户
        addUser:function(formData,callback){
            $.ajax({
                url:api+"/system/user/add",
                type:"post",
                data:formData,
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    alert(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 查看用户信息
        queryUser:function(user_id,callback){
            $.ajax({
                url:api+"/system/user/query",
                type:"post",
                data:{userid:user_id},
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                    alert(res.message);
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 用户编辑
        editUser:function(formData,callback){
            $.ajax({
                url:api+"/system/user/update",
                type:"post",
                data:formData,
                beforeSend:function(res){},
                success:function(res){
                    if(res.code!=0){
                        if(res.message=="无查询权限修改！"){
                            alert("无修改权限！")
                        }else{
                            alert(res.message);
                        }
                    if(res.message==undefined){
                        // confirm('由于您长时间没有操作, session已过期, 请重新登录.');
                        //跳转到登录页
                        location.href = "login.html";
                    }
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 用户删除
        delUser:function(user_id,callback){
            $.ajax({
                url:api+"/system/user/delete",
                type:"post",
                data:{userids:user_id},
                beforeSend:function(res){},
                success:function(res){
                    
                callback && callback(res);
                }
            })
        },
        // 修改密码
        changePWD:function(formData,callback){
             $.ajax({
                url:api+"/system/user/editpwd",
                type:"post",
                data:formData,
                beforeSend:function(res){},
                success:function(res){
                    
                callback && callback(res);
                }
            })
        },
        // 用户登出
        logout:function(callback){
            $.ajax({
                url:api+"/system/logout",
                type:"post",
                beforeSend:function(res){},
                success:function(res){
                    
                callback && callback(res);
                }
            })
        }
    }
})