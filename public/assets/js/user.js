// 定义一个数组
let userArr = []
// 发送请求
$.ajax({
    type: "get",
    url: "/users",
    success(response) {
        userArr = response
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
            console.log(response[0].avatar)
            // 显示预览图片
            $("#avatar")
                .siblings("img")
                .attr("src", response[0].avatar)
            // 将图片地址保存到表单隐藏域中
            $("#hidden").val(response[0].avatar)
        },
    })
})
