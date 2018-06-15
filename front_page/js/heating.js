// 添加取暖费
function add(obj){
    var tr = `<tr>
                <td>
                    <input type="checkbox" name="" id="a1" class="selectItem">
                </td>
                <td>${obj.campus}</td>
                <td>${obj.apartment}</td>
                <td>${obj.dormitoryName}</td>
                <td>${obj.count}</td>
                <td>${obj.datepicker}</td>
                <td>${obj.expense}</td>
                <td>
                    <span class="del">删除</span> /
                    <span class="change" data-toggle="modal" data-target="#myModal">修改</span>
                </td>
            </tr>`;
    $("#mod tbody").prepend(tr);
}
    //提交按钮
$(".btn-primary").on("click",function(e){
    var comNum = 0;
    var objLength = 0;
    var obj = {
        "campus": $("#campus").val(),//校区编号
        "apartment": $("#apartment").val(),  //公寓编号
        "datepicker": $("#datepicker").val(),//供暖时间
        "expense": $("#expense").val(),//住宿费
        "count": $("#count").val(), //床位数
        "dormitoryName": $("#dormitoryName").val() //宿舍编号
    }
    // console.log(obj)

    for( var i in obj ){
        objLength++;
        if(obj[i]) comNum++;
    }

    if(comNum < objLength) $(".pop").css({display:"inline"});
    else{
        $(".btn-default").trigger("click");         //关闭模态框
        if( $(".btn-primary").attr("genre") == "add" ) add(obj);  //根据标识判断操作是修改还是添加
    }

});
//添加住宿费
$(".add").on("click",function(){
    $(".btn-primary").attr("genre","add"); //点击提交按钮时设置标识 添加
    $(".pop").css({display:"none"});
    $("#myModalLabel").html("添加住宿费");
    $("#campus").val("BK-001");               //初始化模态框字段 置空
    $("#apartment").val("BK-ZL-001");
    $("#dormitoryName").val("");
    $("#datepicker").val("");
    $("#expense").val("");
    $("#count").val("");
})

//修改住宿费
$("body").on("click",".change",function(){
    var that = this;
    $(".btn-primary").attr("genre","mod"); //点击提交按钮时设置标识 添加
    $(".pop").css({display:"none"});
    $("#myModalLabel").html("修改住宿费信息");

    var obj = {
        "count": $(this).parent().prevAll().eq(2).html(),//床位数
        "datepicker": $(this).parent().prevAll().eq(1).html(),  //供暖时间
        "dormitoryName": $(this).parent().prevAll().eq(3).html(), //宿舍编号
        "apartment": $(this).parent().prevAll().eq(4).html(), //公寓编号
        "expense": $(this).parent().prev().html(), //住宿费
        "campus": $(this).parent().prevAll().eq(5).html(),//校区编号
    }

    // console.log(obj)

    $("#campus").val(obj.campus);               //初始化模态框字段
    if(obj.campus == 'BK-001') 
        $("#apartment").html(`<option value="BK-ZL-001">BK-ZL-001</option>
            <option value="BK-ZY-001">BK-ZY-001</option>
            <option value="BK-ZY-002">BK-ZY-002</option>  `)
    if(obj.campus == 'TFL-001') 
        $("#apartment").html(`<option>TFL-ZY-001</option><option>TF-ZL-002</option>`)
    $("#apartment").val(obj.apartment);
    $("#dormitoryName").val(obj.dormitoryName);
    $("#count").val(obj.count);
    $("#datepicker").val(obj.datepicker);
    $("#expense").val(obj.expense);

    $(".btn-primary").on("click",function(){
        var comNum = 0;
        var objLength = 0;
        var obj = {
            "campus": $("#campus").val(),//校区编号
            "apartment": $("#apartment").val(),//公寓编号
            "datepicker": $("#datepicker").val(),//供暖时间
            "expense": $("#expense").val(),//住宿费
            "dormitoryName": $("#dormitoryName").val(), //宿舍编号
            "count": $("#count").val()//床位数
        }
        // console.log(obj)
        

        for( var i in obj ){
            objLength++;
            if(obj[i]) comNum++;
        }

        if(comNum < objLength) $(".pop").css({display:"inline"});
        else{
            $(".btn-default").trigger("click");         //关闭模态框
            if( $(".btn-primary").attr("genre") == "mod" )//根据标识判断操作是修改还是添加
            {  
                $(that).parent().prevAll().eq(5).html(obj.campus)
                $(that).parent().prevAll().eq(4).html(obj.apartment)
                $(that).parent().prevAll().eq(3).html(obj.dormitoryName)
                $(that).parent().prevAll().eq(2).html(obj.count)
                $(that).parent().prevAll().eq(1).html(obj.datepicker)
                $(that).parent().prev().html(obj.expense)
            }
        }
    });
})

// 删除公寓  通过事件委托解决新添加的元素绑定不上事件的问题
$("body").on("click",".del",function () {
    var res = confirm("确认删除吗？");
    if (!res) return;
    else {
        var ele = this.parentNode.parentNode;
        $(ele).remove();
    }
})

// 全选
var flag1 = true;
$(".selectAll").on("click",function(){
    if(flag1)
    {
        $(".selectItem").prop("checked",true);
        flag1 = !flag1;
    }
    else{
        $(".selectItem").prop("checked",false);
        flag1 = !flag1;
    }
})

// 批量删除
var selectNum = 0;
$(".deletes").on("click",function(){
    if( $(".selectAll").prop("checked") ) selectNum = -1;
    else selectNum = 0;
    $(".selectItem").each(function(index,item){
        if( $(item).prop("checked") ) selectNum++;
    })
    if(!selectNum) alert("未选中任何删除项！");
    else{
        var res = confirm("确认删除该 "+selectNum+" 项数据？");
        if(res) alert("请求已发送！");
    }
})