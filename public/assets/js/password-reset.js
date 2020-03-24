// 修改密码按钮
$("#modifyPass").on("click", function() {
    // 先验证表单是否填写完整
    let userPass = $('[name="userPass"]')
        .val()
        .trim()
    let newPass = $('[name="newPass"]')
        .val()
        .trim()
    let confirmPass = $('[name="confirmPass"]')
        .val()
        .trim()
    if (userPass.length == 0) return alert("请输入旧密码")
    if (newPass.length == 0) return alert("请输入新密码")
    if (confirmPass.length == 0) return alert("请再次输入新密码")
    if (newPass !== confirmPass) return alert("输入的两次密码不一样")
    // 全部通过则开始执行下面代码
    let data = $("#modifyPassForm").serialize()
    console.log(data)
    $.ajax({
        url: "/users/password",
        type: "put",
        data,
        success() {
            alert("请重新登录")
            location.href = "/admin/login.html"
        },
    })
})
