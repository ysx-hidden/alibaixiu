// 定义一个数组
let userArr = []
// 发送请求
$.ajax({
    type: "get",
    url: "/users",
    success(response) {
        userArr = response.reverse()
        render()
    },
})
// 封装渲染页面的函数
function render() {
    let html = template("userTpl", { data: userArr })
    $("tbody").html(html)
}
// 上传头像的功能
// 这段代码是将图片上传到服务器了, 在完成用户添加功能是, 还需要将图片地址写入数据库
$("#avatar").on("change", function() {
    let formData = new FormData()
    formData.append("avatar", this.files[0])
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 只要是通过jquery实现上传文件功能  就需要设置下面两个属性
        processData: false,
        contentType: false,
        success(response) {
            // console.log(response[0].avatar)
            // 显示预览图片
            $("#avatar")
                .siblings("img")
                .attr("src", response[0].avatar)
            // 将图片地址保存到表单隐藏域中
            $("#hidden").val(response[0].avatar)
        },
    })
})
// 添加用户的功能
$("#addBtn").on("click", function() {
    // 收集用户输入的数据, 将表单里面的数据一次性获取
    let data = $("form").serialize()
    // console.log(data)
    // console.log(data.split("&"))
    // 判断是否输入，再确定点击添加是否发送请求
    let flag = true
    $.each(data.split("&"), (index, item) => {
        // console.log(item.split("=")[1].trim())
        if (index > 0) {
            if (item.split("=")[1].trim() == "") {
                flag = false
            }
        }
    })
    // 发送请求
    flag &&
        $.ajax({
            type: "post",
            url: "/users",
            data,
            success(response) {
                // 添加到用户数组中并重新渲染，实现无刷新技术
                userArr.push(response)
                render()
                // 清空表单里的value
                $('input[name="nickName"]').val("")
                $('input[name="email"]').val("")
                $('input[name="password"]').val("")
                $("#status0").prop("checked", false)
                $("#status1").prop("checked", false)
                $("#admin").prop("checked", false)
                $("#normal").prop("checked", false)
                $("#hidden").val("")
                $("#avatar")
                    .siblings("img")
                    .attr("src", "../assets/img/default.png")
            },
            error(err) {
                console.log(err)
            },
        })
})
// 用户编辑按钮
$("tbody").on("click", ".edit", function() {
    // 获取当前用户的_id
    let id = $(this).attr("data-id")
    $("#editBtn").attr("data-id", id)
    // 显示修改按钮，隐藏添加按钮
    $("#addBtn").addClass("hidden")
    $("#editBtn").removeClass("hidden")
    // 更改左上角标题
    $("h2").html("编辑用户")
    // 当前被点击的用户的父元素tr
    let currentTr = $(this).parents("tr")
    // 获取父元素tr的img标签的src属性
    let imgSrc = currentTr.find("img").attr("src")
    // 左侧用户头像图片预览
    $("#avatar")
        .siblings("img")
        .attr("src", imgSrc || "../assets/img/default.png")
    // 同时保存到隐藏域中
    $("#hidden").val(currentTr.find("img").attr("src"))
    // 左侧用户邮箱(禁止修改)
    $('input[name="email"]')
        .prop("disabled", true)
        .val(
            currentTr
                .children()
                .eq(2)
                .text(),
        )
    // 左侧用户密码(禁止修改)
    $('input[name="password"]').prop("disabled", true)
    // 左侧用户昵称
    $('input[name="nickName"]').val(
        currentTr
            .children()
            .eq(3)
            .text(),
    )
    // 是否激活
    if (
        currentTr
            .children()
            .eq(4)
            .text() == "激活"
    ) {
        $("#status1").prop("checked", true)
    } else {
        $("#status0").prop("checked", true)
    }
    // 用户身份
    if (
        currentTr
            .children()
            .eq(5)
            .text() == "超级管理员"
    ) {
        $("#admin").prop("checked", true)
    } else {
        $("#normal").prop("checked", true)
    }
})
// 点击修改按钮完成编辑
$("#editBtn").on("click", function() {
    let data = $("form").serialize()
    $.ajax({
        type: "put",
        url: "/users/" + $(this).attr("data-id"),
        data,
        success(response) {
            // 更新用户数组重新渲染
            userArr[userArr.findIndex(item => item._id == response._id)] = response
            render()
            // 恢复到之前的添加表单,清空表单里的value
            $("h2").text("添加新用户")
            $('input[name="nickName"]').val("")
            // 取消邮箱密码禁用
            $('input[name="email"]')
                .prop("disabled", false)
                .val("")
            $('input[name="password"]')
                .prop("disabled", false)
                .val("")
            $("#status0").prop("checked", false)
            $("#status1").prop("checked", false)
            $("#admin").prop("checked", false)
            $("#normal").prop("checked", false)
            $("#hidden").val("")
            $("#avatar")
                .siblings("img")
                .attr("src", "../assets/img/default.png")
            // 显示修改按钮，隐藏添加按钮
            $("#addBtn").removeClass("hidden")
            $("#editBtn").addClass("hidden")
        },
        error(a) {
            console.log(a)
        },
    })
})
// 删除单个用户
$("tbody").on("click", ".delete", function() {
    let id = $(this).attr("data-id")
    if (confirm("确认删除吗？")) {
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success(response) {
                userArr = userArr.filter(item => item._id != response._id)
                render()
            },
        })
    }
})
