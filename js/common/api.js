/**
 * 这是注释的内容
 * Author:land
 *   Date:2017/9/6
 */
define(["jquery"],function($){
    // var api="http://39.108.171.172:8081/facerecognition";
    var api="http://127.0.0.1:80/facerecognition";
    return {
        // 识别记录
        getRecordList:function(organizationid,starttime,endtime,callback){
            $.get(api+"/system/record/query",{organizationid:organizationid,starttime:starttime,endtime:endtime},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 查看详细信息
        showRecord:function(ps_id,organizationid,callback){
            $.get(api+"/system/record/query",{personid:ps_id,organizationid:organizationid},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 入库审批列表
        getApprovalList:function(start,limit,callback){
            $.get(api+"/system/uploadFile",{start,limit},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 员工审批列表
        getPeopleApprovalList:function(start,limit,status,callback){
            $.get(api+"/system/employee/query",{start,limit,status},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 员工审核详细信息
         getPeopleCheckInfo:function(ep_id,callback){
            $.get(api+"/system/employee/getCheckinfos",{employeeid:ep_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 员工审核
        checkEmployee:function(isagree,checksuggestion,callback){
            $.ajax({
                url:api+"/system/employee/check",
                type:"post",
                data:{isagree:isagree,checksuggestion:checksuggestion},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 访客审批列表
        getVisitorApprovalList:function(start,limit,status,callback){
            $.get(api+"/system/visitor/query",{start,limit,status},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 访客审核详细信息
         getVisitorCheckInfo:function(vs_id,callback){
            $.get(api+"/system/visitor/getCheckinfos",{visitorid:vs_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 访客审核
        checkVisitor:function(isagree,checksuggestion,callback){
            $.ajax({
                url:api+"/system/visitor/check",
                type:"post",
                data:{isagree:isagree,checksuggestion:checksuggestion},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 图片上传
        uploadImage:function(imagefile,callback){
            $.ajax({
                url:api+"/system/uploadFile",
                type:"post",
                data:{imagefile:imagefile},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },

        // 员工列表
        getPeopleList:function(start,limit,callback){
            $.get(api+"/system/employee/query",{start,limit},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
          /**
         * 根据员工id获取员工基本信息
         * @param ep_id 员工id
         * @param callback
         */
        getEmployeeBaseInfo:function(ep_id,callback){
            $.get(api+"/system/employee/query",{employeeid:ep_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 员工编辑
        editEmployee:function(formData,callback){
            $.ajax({
                url:api+"/system/employee/update",
                type:"post",
                data:formData,
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 员工注销
        delEmployee:function(ep_id,callback){
            $.post(api+"/system/employee/delete",{employeeids:ep_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }

                callback && callback();

            })
        },
        // 访客列表
        getVisitorList:function(start,limit,callback){
            $.get(api+"/system/visitor/query",{start,limit},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        /**
         * 根据访客id获取访客基本信息
         * @param ep_id 访客id
         * @param callback
         */
        getVisitorBaseInfo:function(vs_id,callback){
            $.get(api+"/system/visitor/query",{visitorid:vs_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 访客编辑
        editVisitor:function(formData,callback){
            $.ajax({
                url:api+"/system/visitor/update",
                type:"post",
                data:formData,
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 访客注销
        delVisitor:function(vs_id,callback){
            $.post(api+"/system/visitor/delete",{visitorids:vs_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }

                callback && callback();

            })
        },
        
        // 系统设置
        // 系统消息查询
        getMessageList:function(start,limit,callback){
            $.get(api+"/system/message/query",{start,limit},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 系统消息详情
        getMessage:function(datanumber,callback){
            $.get(api+"/system/message/getMessage",{datanumber:datanumber},function(res){
                if(res.code!=0){
                    console.log(res.message);
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
                    return;
                }
                callback && callback(res);
            })
        },
        // 系统参数列表
         getParameterList:function(start,limit,callback){
            $.get(api+"/system/parameter/query",{start,limit},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 系统参数增加
         addParameter:function(formData,callback){
            $.ajax({
                url:api+"/system/parameter/add",
                type:"post",
                data:formData,
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 系统参数查询
        queryParameter:function(para_key,callback){
            $.get(api+"/system/parameter/query",{parameterkey:para_key},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 系统参数编辑
        editParameter:function(formData,callback){
            $.ajax({
                url:api+"/system/parameter/update",
                type:"post",
                data:formData,
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        //系统参数删除
        delParameter:function(para_key,callback){
            $.post(api+"/system/parameter/delete",{parameterkeys:para_key},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }

                callback && callback();

            })
        },
        // 设备列表
        getDeviceList:function(start,limit,callback){
            $.get(api+"/system/device/query",{start,limit},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 添加设备
        addDevice:function(formData,callback){
            $.ajax({
                url:api+"/system/device/add",
                type:"post",
                data:formData,
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
         // 查看设备信息
        queryDevice:function(dv_id,callback){
            $.get(api+"/system/device/query",{deviceid:dv_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 设备编辑
        editDevice:function(formData,callback){
            $.ajax({
                url:api+"/system/device/update",
                type:"post",
                data:formData,
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        //删除设备
        delDevice:function(dv_id,callback){
            $.post(api+"/system/device/delete",{deviceids:dv_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }

                callback && callback();

            })
        },
        // 用户信息
        // 用户列表
        getUsersList:function(start,limit,callback){
            $.get(api+"/system/user/query",{start,limit},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
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
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 查看用户信息
        queryUser:function(user_id,callback){
            $.get(api+"/system/user/query",{userid:user_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 用户编辑
        editUser:function(formData,callback){
            $.ajax({
                url:api+"/system/user/update",
                type:"post",
                data:formData,
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
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
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
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
                success:function(res){
                    
                callback && callback(res);
                }
            })
        }
    }
})