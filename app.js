import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwy-jMzTqlqH3R7KMXVNJJky9imtrqTDo",
  authDomain: "t2truth-3452b.firebaseapp.com",
  projectId: "t2truth-3452b",
  storageBucket: "t2truth-3452b.appspot.com",
  messagingSenderId: "432180268294",
  appId: "1:432180268294:web:3493691768977df7fa2287",
  measurementId: "G-9D2D6T7FM0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.getElementById("googleSignInBtn").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert(`Signed in as: ${user.displayName}`);
      loadFeed();
    })
    .catch((error) => {
      console.error("Sign-in failed:", error);
    });
});

function loadFeed() {
  const feed = document.getElementById("feedContainer");
  feed.innerHTML = `
    <h2>Current Flashpoint Threads</h2>
    <ul>
      <li>🔥 Gaza Strip — Civilian footage contradicting mainstream narrative</li>
      <li>🔥 Crimea — NATO proxy dynamics & deepfake drone footage</li>
      <li>♨️ Taiwan — Strategic silence or looming storm?</li>
      <li>🛑 Syria — Damascus fallen, Assad evacuated [Media Blackout]</li>
    </ul>
  `;
}
