{
  //method to submit the form data for the new post using Ajax
  let createPost = function () {
    let newPosts = $("#new-posts");

    newPosts.submit(function (e) {
      e.preventDeafault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPosts.serialize(),
        success: function (data) {
          // console.log(data);
          let newPost = newPostDOM(data.data.post);
          $("posts-id-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  //method to create a post i the DOM
  let newPostDOM = function (post) {
    return $(`  <li id="post-${post._id}" >
    <p>
  <% if(locals.user && locals.user.id == post.user.id){ %>
      <small>
        <a class="delete-post-button" href="/posts/destroy/${post.id}"> XX</a>
      </small>
      <% } %> 

      ${post.content}
  <br>
      <small> 
      ${post.user.name}
      </small>
    </p>

    <!-- //comments part that is added after the post 
    //add comment  -->
    <div class="post-comments">
      <%if(locals.user){ %>
      <form action="/comments/create" method="post">
        <input type="text" name="content" placeholder="Type here to comment" />
        <input type="hidden" name="post" value="${post._id}" />
        <input type="submit" value="Add Comment" />
      </form>
      <% } %>

      <!-- Display the comments -->
      <div id="posts-comment-list">
        <ul id="posts-comment-${post._id}">
          
        </ul>
      </div>
    </div>
  </li>`);
  };

  //method to delete the posts from dOM
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDeafault();
    });

    $.ajax({
      type: "get",
      url: $(deleteLink).prop("href"),
      success: function (data) {
        $(`#post-${data.data.post._id}`).remove();
      },
      error: function (error) {
        console.log(error.responseText);
      },
    });
  };

  createPost();
}
