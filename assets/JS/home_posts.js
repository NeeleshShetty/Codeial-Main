{
  //method to sub,it the form data for the new post using Ajax
  let createPost = function () {
    let newPosts = $("#new-posts");

    newPosts.submit(function (e) {
      e.preventDeafault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPosts.serialize(),
        sucess: function (data) {
          console.log(data);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  createPost();
}
