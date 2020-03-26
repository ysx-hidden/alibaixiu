// 选择logo图片
$("#logo").on("change", function() {
    // 获取到选择的图片
    let file = this.files[0]
    // 创建formData实现二进制文件上传
    let formData = new FormData()
    formData.append("logo", file)
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success(response) {
            console.log(response)
            $("#hiddenLogo").val(response[0].logo)
            $("#logoPreview").attr("src", response[0].logo)
        },
    })
})
// 当点击保存设置按钮时 保存数据
$("#saveBtn").on("click", function() {
    // 将是否开启评论功能与是否开启人工批准功能的内容写入到 定义的隐藏域中
    // console.log($("#comment_status").prop("checked"))
    $("#comment").val($("#comment_status").prop("checked"))
    $("#review").val($("#comment_reviewed").prop("checked"))
    // 获取表单中的内容, 有name属性的才会收集
    let formData = $("#settingsForm").serialize()
    console.log(formData)
    $.ajax({
        type: "post",
        url: "/settings",
        data: formData,
        success(response) {
            // location.reload()
        },
    })
})
// 向服务器发送请求 获取 网站设置
$.ajax({
    type: "get",
    url: "/settings",
    success(response) {
        console.log(response)
        console.log($('input[name="description"]')[0])
        if (response) {
            // 将logo地址存储在隐藏域中
            $("#hiddenLogo").val(response.logo)
            // 将logo显示在页面中
            $("#logoPreview").attr("src", response.logo)
            // 站点名称
            $('input[name="title"]').val(response.title)
            // 站点描述
            $('textarea[name="description"]').val(response.description)
            // 站点关键词
            $('input[name="keywords"]').val(response.keywords)
        }
    },
})
