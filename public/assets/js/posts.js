$.ajax({
    type: "get",
    url: "/posts",
    data: {
        page: 1,
    },
    success(response) {
        let html = template("postsTpl", { data: response.records })
        // console.log(response.records)
        $("tbody").html(html)
    },
})
