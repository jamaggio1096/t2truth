const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Post submission
document.getElementById("post-button").addEventListener("click", () => {
  const user = auth.currentUser;
  if (!user) return alert("Please sign in to post.");

  const tier = document.querySelector('.tier-button.selected')?.textContent;
  const eventType = document.getElementById("event-type").value;
  const truth = document.getElementById("truth-input").value;

  if (!truth) return alert("Post content cannot be empty.");

  db.collection("posts").add({
    uid: user.uid,
    tier,
    eventType,
    truth,
    timestamp: new Date().toISOString(),
    flagged: false
  }).then(() => {
    document.getElementById("truth-input").value = "";
    loadPosts();
  }).catch(alert);
});

// Load posts
function loadPosts() {
  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "";
  db.collection("posts").orderBy("timestamp", "desc").get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const post = doc.data();
        postsDiv.innerHTML += `
          <div class="post">
            <strong>${post.tier}</strong> | <em>${post.eventType}</em><br>
            ${post.truth}<br><small>${new Date(post.timestamp).toLocaleString()}</small>
          </div>
        `;
      });
    });
}

window.onload = () => {
  auth.onAuthStateChanged(user => {
    if (user) loadPosts();
  });
};