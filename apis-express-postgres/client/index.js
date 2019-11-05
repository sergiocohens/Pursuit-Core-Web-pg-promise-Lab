document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.querySelector('#addUserForm')
    const userButton = document.querySelector('#usersButton')
    const postForm = document.querySelector('#addPostForm')
    const postsByIdButton = document.querySelector('#postsByIdButton')
    const postButton = document.querySelector('#postsButton')
    const likesOfPostButton = document.querySelector('#likesOfPostButton')
    const usersThatLikedButton = document.querySelector('#usersThatLikedButton')
    const numOfLikesButton = document.querySelector('#numOfLikesButton')

    userForm.addEventListener('submit', addUserFormSubmitted)
    userButton.addEventListener('click', () => loadUsers())
    postForm.addEventListener('submit', addPostFormSubmitted)
    postsByIdButton.addEventListener('click', () => loadPostsById())
    postButton.addEventListener('click', () => loadPosts())
    likesOfPostButton.addEventListener('click', () => likesOfPost())
    usersThatLikedButton.addEventListener('click', () => usersThatLiked())
    numOfLikesButton.addEventListener('click', () => numOfLikes())
});

async function loadUsers() {
    const usersList = document.querySelector('#usersList')
    usersList.innerHTML = ""
    const response = await axios.get(`http://localhost:3030/users/all`)
    response.data.payload.forEach((user) => {
       let listItem = document.createElement("li");
       listItem.innerText = `${user.firstname} ${user.lastname}, age ${user.age}`;
       usersList.appendChild(listItem);
    });
}

async function addUserFormSubmitted(event) {
    event.preventDefault();
    const firstname = document.querySelector('#firstNameInput').value
    const lastname = document.querySelector('#lastNameInput').value
    const age = document.querySelector('#ageInput').value
    let response = await axios.post(`http://localhost:3030/users/register`, { firstname, lastname, age })
    loadUsers()
}

async function loadPosts() {
    const postsList = document.querySelector('#postsList')
    postsList.innerHTML = ""
    const response = await axios.get(`http://localhost:3030/posts/all`)
    response.data.payload.forEach((post) => {
       let listItem = document.createElement("li");
       listItem.innerText = `${post.poster_id} ${post.body}`;
       postsList.appendChild(listItem);
    });
}

async function loadPostsById() {
  const postsById = document.querySelector('#postsById')
  postsById.innerText = ""
  const userId = document.querySelector('#userInput').value
  response = await axios.get(`http://localhost:3030/posts/${userId}`)
  response.data.payload.forEach((post) => {
    let listItem = document.createElement("li")
    listItem.innerText = `${post.poster_id} ${post.body}`
    postsById.appendChild(listItem)
  })
}

async function addPostFormSubmitted(event) {
    event.preventDefault();
    const posterId = document.querySelector('#posterInput').value
    const body = document.querySelector('#bodyInput').value
    let response = await axios.post(`http://localhost:3030/posts/register`, { posterId, body })
    loadPosts()
}

async function likesOfPost() {
    const likes = document.querySelector('#likesOfPost')
    likes.innerText = ""
    const postId = document.querySelector('#postIdInput').value
    const response = await axios.get(`http://localhost:3030/likes/${postId}`)
    likes.innerText = response.data.payload[0].count
}

async function usersThatLiked() {
    const usersThatLiked = document.querySelector('#usersThatLiked')
    usersThatLiked.innerText = ""
    const postId2 = document.querySelector('#postIdInput2').value
    const response = await axios.get(`http://localhost:3030/likes/liked/${postId2}`)
    response.data.payload.forEach((user) => {
      let listItem = document.createElement('li')
      listItem.innerText = `${user.firstname} ${user.lastname}, age ${user.age}`
      usersThatLiked.appendChild(listItem)
    })
}

async function numOfLikes() {
    const numOfLikes = document.querySelector('#numOfLikes')
    numOfLikes.innerText = ''
    const number = document.querySelector('#numOfLikesInput').value
    const response = await axios.get(`http://localhost:3030/likes/num/${number}`)
    response.data.payload.forEach((post) => {
      let listItem = document.createElement('li')
      listItem.innerText = `${post.id} ${post.body}`
      numOfLikes.appendChild(listItem)
    })
}
