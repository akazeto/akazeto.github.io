import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAezRB7dtq2Ct8K3ac5w2OzWIglbluHVhM",
    authDomain: "haru-scommission.firebaseapp.com",
    projectId: "haru-scommission",
    storageBucket: "haru-scommission.firebasestorage.app",
    messagingSenderId: "720420356048",
    appId: "1:720420356048:web:92b57d369068042dccc3d5"
};

const app  = initializeApp(firebaseConfig);
const db   = getFirestore(app);
const auth = getAuth(app);

// 커미션 상태 읽기
async function getStatus() {
    const ref  = doc(db, "commission", "status");
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data();
    // 문서 없으면 기본값
    return { isOpen: false, waitCount: 0 };
}

// 커미션 상태 저장 (관리자용)
async function setStatus(isOpen, waitCount) {
    const ref = doc(db, "commission", "status");
    await setDoc(ref, { isOpen, waitCount });
}

export { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, getStatus, setStatus };
