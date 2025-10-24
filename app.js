// Users array for profiles
const users = [
  { username: 'User1', profilePic: 'https://via.placeholder.com/40' },
  { username: 'User2', profilePic: 'https://via.placeholder.com/40' }
];

// Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const chatTabs = document.querySelectorAll('.chat-tab');
const chatContents = document.querySelectorAll('.chat-content');
const friendsList = document.querySelector('#friends-list');
const addFriendBtn = document.querySelector('#add-friend-btn');
const friendInput = document.querySelector('#friend-input');
const chatInput = document.querySelector('#chat-input');
const sendChatBtn = document.querySelector('#send-chat');
const newPostInput = document.querySelector('#new-post-input');
const createPostBtn = document.querySelector('#create-post-btn');
const feedContainer = document.querySelector('#feed-container');

// Navigation toggle
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.dataset.target;

    sections.forEach(sec => sec.classList.add('hidden'));
    document.getElementById(target).classList.remove('hidden');

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Chat tabs toggle
chatTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.target;

    chatContents.forEach(c => c.classList.add('hidden'));
    document.getElementById(target).classList.remove('hidden');

    chatTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// Friends list add with profile pic
addFriendBtn.addEventListener('click', () => {
  const name = friendInput.value.trim();
  if(name === '') return;

  let user = users.find(u => u.username === name);
  if(!user) {
    user = { username: name, profilePic: 'https://via.placeholder.com/35' };
    users.push(user);
  }

  const li = document.createElement('li');
  const img = document.createElement('img');
  img.src = user.profilePic;
  img.alt = user.username + ' profile';
  const span = document.createElement('span');
  span.textContent = user.username;
  span.classList.add('username');

  li.appendChild(img);
  li.appendChild(span);
  friendsList.appendChild(li);

  friendInput.value = '';
});

// Chat input send
sendChatBtn.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if(message === '') return;

  const activeChat = document.querySelector('.chat-content:not(.hidden)');
  const p = document.createElement('p');
  p.innerHTML = `<strong>${users[0].username}:</strong> ${message}`;

  activeChat.appendChild(p);
  chatInput.value = '';
  activeChat.scrollTop = activeChat.scrollHeight;
});

chatInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') sendChatBtn.click();
});

// Create Post
function createPost(content, user = users[0]) {
  const post = document.createElement('div');
  post.classList.add('card', 'feed-post');
  post.innerHTML = `
    <div class="post-header">
      <img src="${user.profilePic}" alt="${user.username}">
      <span class="username">${user.username}</span>
      <span class="timestamp">Just now</span>
    </div>
    <p>${content}</p>
    <div class="post-actions">
      <button class="like-btn">Like</button>
      <button class="comment-btn">Comment</button>
    </div>
    <div class="comments-container scrollable hidden"></div>
  `;
  feedContainer.prepend(post);
  addPostEventListeners(post);
}

createPostBtn.addEventListener('click', () => {
  const content = newPostInput.value.trim();
  if(content === '') return;
  createPost(content);
  newPostInput.value = '';
});

newPostInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') createPostBtn.click();
});

// Post Event Listeners (Like & Comment)
function addPostEventListeners(post) {
  const likeBtn = post.querySelector('.like-btn');
  const commentBtn = post.querySelector('.comment-btn');
  const commentsContainer = post.querySelector('.comments-container');

  // Like functionality
  let liked = false;
  likeBtn.addEventListener('click', () => {
    liked = !liked;
    likeBtn.textContent = liked ? 'Liked' : 'Like';
  });

  // Comment functionality
  commentBtn.addEventListener('click', () => {
    commentsContainer.classList.toggle('hidden');
    if(!commentsContainer.querySelector('input')) {
      const commentInput = document.createElement('input');
      commentInput.type = 'text';
      commentInput.placeholder = 'Write a comment...';
      commentInput.classList.add('comment-input');
      commentInput.style.width = '100%';
      commentInput.style.marginTop = '5px';
      commentInput.style.padding = '5px 10px';
      commentInput.style.borderRadius = '15px';
      commentInput.style.border = 'none';
      commentInput.style.backgroundColor = '#222';
      commentInput.style.color = '#fff';

      commentInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
          const val = commentInput.value.trim();
          if(val === '') return;
          const p = document.createElement('p');
          p.innerHTML = `<strong>${users[0].username}:</strong> ${val}`;
          commentsContainer.appendChild(p);
          commentInput.value = '';
          commentsContainer.scrollTop = commentsContainer.scrollHeight;
        }
      });

      commentsContainer.appendChild(commentInput);
    }
  });
}

// Initialize existing posts
document.querySelectorAll('.feed-post').forEach(post => addPostEventListeners(post));

// Mini Profile Card Elements
const profileCard = document.querySelector('#profile-card');
const profilePic = document.querySelector('#profile-pic');
const profileUsername = document.querySelector('#profile-username');
const profileStatus = document.querySelector('#profile-status');
const closeProfileBtn = document.querySelector('#close-profile');

// Show profile function
function showProfile(user) {
  profilePic.src = user.profilePic;
  profileUsername.textContent = user.username;
  profileStatus.textContent = `Status: Learning languages!`;
  profileCard.classList.remove('hidden');
}

// Close profile
closeProfileBtn.addEventListener('click', () => {
  profileCard.classList.add('hidden');
});

// Add click event to usernames
function addUsernameClickEvents() {
  const usernameElements = document.querySelectorAll('.username');
  usernameElements.forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      const username = el.textContent;
      const user = users.find(u => u.username === username);
      if(user) showProfile(user);
    });
  });
}

// Run after DOM updates
addUsernameClickEvents();

// Observe feed & friends for new usernames
const observer = new MutationObserver(addUsernameClickEvents);
observer.observe(document.querySelector('#feed-container'), { childList: true });
observer.observe(friendsList, { childList: true });
