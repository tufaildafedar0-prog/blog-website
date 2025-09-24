// ---------- search bar ----------
let searchForm = document.getElementById("searchForm");
let searchInput = document.getElementById("searchInput");
let allPosts = document.querySelectorAll(".blog-post");

if (searchForm) {
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let text = searchInput.value.toLowerCase();

    allPosts.forEach(function (post) {
      let words = post.innerText.toLowerCase();
      if (words.indexOf(text) !== -1) {
        post.style.display = "block";
      } else {
        post.style.display = "none";
      }
    });
  });
}

// ---------- category filter ----------
let filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    let type = btn.dataset.category;

    allPosts.forEach(function (post) {
      if (type === "all" || post.dataset.category === type) {
        post.style.display = "block";
      } else {
        post.style.display = "none";
      }
    });
  });
});

// ---------- comments ----------
let commentForms = document.querySelectorAll(".comment-form");

commentForms.forEach(function (form) {
  let postId = form.dataset.postId;
  let listBox = document.getElementById("comments-" + postId);

  // load old comments if any
  loadOld(postId, listBox);

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();

    let emailBox = form.querySelector("input[type='email']");
    let textBox = form.querySelector("textarea");

    let emailVal = emailBox.value.trim();
    let msgVal = textBox.value.trim();

    if (emailVal === "" || msgVal === "") {
      alert("Both email and comment required!");
      return;
    }

    let commentObj = {
      user: emailVal,
      text: msgVal,
      time: new Date().toLocaleString(),
    };

    saveComment(postId, commentObj);
    showOne(listBox, commentObj);

    form.reset();
  });
});

// show saved ones
function loadOld(postId, listBox) {
  let saved = JSON.parse(localStorage.getItem(postId)) || [];
  saved.forEach(function (c) {
    showOne(listBox, c);
  });
}

// push one comment to UI
function showOne(container, cmt) {
  let li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = `<b>${cmt.user}</b> <small class="text-muted">(${cmt.time})</small><br>${cmt.text}`;
  container.appendChild(li);
}

// save one comment in storage
function saveComment(postId, cmt) {
  let arr = JSON.parse(localStorage.getItem(postId)) || [];
  arr.push(cmt);
  localStorage.setItem(postId, JSON.stringify(arr));
}

