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
    console.log(userArr)
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
    // 发送请求
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
