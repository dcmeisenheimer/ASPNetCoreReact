import React, { useState } from "react";
import Constants from "./utilities/Constants";
import PostCreateForm from "./components/PostCreateForm";
import PostUpdateForm from "./components/PostUpdateForm";

export default function App() {
  //use to store post from our web api
  const [posts, setPosts] = useState([]);
  const [showingCreateNewPostForm, setShowingCreateNewPostForm] = useState(false);
  const [postCurrentlyBeingUpdated, setPostCurrentlyBeingUpdated] = useState(null);



  function getPosts() {
    //url for our connection string
    const url = Constants.API_URL_GET_ALL_POSTS;

    //Want to fetch our urls
    fetch(url, {
      method: 'GET'
    })
      //Asynchrounus JS
      .then(response => response.json())
      .then(postFromServer => {
        setPosts(postFromServer);
      })
      //Catch error and alert the user through alert
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deletePost(postId) {
    //url for our connection string
    const url = `${Constants.API_URL_DELETE_POST_BY_ID}/${postId}`;

    //Want to fetch our urls
    fetch(url, {
      method: 'DELETE'
    })
      //Asynchrounus JS
      .then(response => response.json())
      .then(responseFromSever => {
        console.log(responseFromSever);
        onPostDeleted(postId);
      })
      //Catch error and alert the user through alert
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {(showingCreateNewPostForm === false && postCurrentlyBeingUpdated === null) && (
            <div>
              <h1>ASP.NET Core React Project</h1>

              <div className="mt-5">
                {/* Only runs when button is clicked no () */}
                <button onClick={getPosts} className="btn btn-dark btn-lg w-100">Get Posts from server</button>
                <button onClick={() => setShowingCreateNewPostForm(true)} className="btn btn-secondary btn-lg w-100 mt-4">Create New Post</button>
              </div>
            </div>
          )}

          {/* logical condition to see if posts is there */}
          {(posts.length > 0 && showingCreateNewPostForm === false && postCurrentlyBeingUpdated === null) && renderPostsTable()}

          {showingCreateNewPostForm && <PostCreateForm onPostCreated={onPostCreated} />}

          {postCurrentlyBeingUpdated !== null && <PostUpdateForm post={postCurrentlyBeingUpdated} onPostUpdated={onPostUpdated} />}
        </div>
      </div>
    </div>
  );

  function renderPostsTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">PostId (PK)</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">CRUD Operations</th>
            </tr>
          </thead>
          <tbody>
            {/* similar to C# foreach loop for table rows */}
            {posts.map((post) => (
              // Provide each row a key
              <tr key={post.postId}>
                {/* Makes table headers and table data dynamic */}
                <th scope="row">{post.postId}</th>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <button onClick={() => setPostCurrentlyBeingUpdated(post)} className="btn btn-dark btn-lg mx-3 my-3">Update</button>
                  <button onClick={() => { if (window.confirm(`Are you sure you want to delete the post titled "${post.title}"?`)) deletePost(post.postId) }} className="btn btn-secondary btn-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={() => setPosts({})} className="btn btn-dark btn-lg w-100">Empty React posts array</button>
      </div>
    );
  }
  //Calls the PostCreated component
  function onPostCreated(createdPost) {
    setShowingCreateNewPostForm(false);

    if (createdPost === null) {
      return;
    }

    alert(`Post successfully created. After clicking OK. your new post titled "${createdPost.title}" will show up in the table below.`)

    getPosts();
  }

  //Calls the PostUpdated compenent
  function onPostUpdated(updatedPost) {
    setPostCurrentlyBeingUpdated(null);
    if (updatedPost === null) {
      return;
    }

    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
      if (postsCopyPost.postId === updatedPost.postId) {
        return true;
      }
    });

    if (index !== -1) {
      postsCopy[index] = updatedPost;
    }

    setPosts(postsCopy);

    alert(`Post successfully updated. After clicking OK, look for the post with the title "${updatedPost.title}" in the table below to see the updates.`)
  }
  //Calls the PostDeleted component
  function onPostDeleted(deletedPostPostId) {
    
    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
      if (postsCopyPost.postId === deletedPostPostId) {
        return true;
      }
    });

    if (index !== -1) {
      postsCopy.splice(index, 1);
    }

    setPosts(postsCopy);

    alert('Post successfuly deleted. After click OK, look ath the table below to see your post disappear')
  }
}

//I think it's a bad idea put all Components (renderPostsTable, PostCreateForm and PostUpdateForm) in different curly braces and use logical conditions to determine which component should now be shown. It is more correct to use react-router, react-router-dom, useHistory for this purpose.
