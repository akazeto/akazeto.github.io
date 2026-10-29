import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, runTransaction } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAezRB7dtq2Ct8K3ac5w2OzWIglbluHVhM",
    authDomain: "haru-scommission.firebaseapp.com",
    projectId: "haru-scommission",
    storageBucket: "haru-scommission.firebasestorage.app",
    messagingSenderId: "720420356048",
    appId: "1:720420356048:web:92b57d369068042dccc3d5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 커미션 상태 읽기
async function getStatus() {
    const ref = doc(db, "commission", "status");
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data();
    return { isOpen: false, waitCount: 0 };
}

// 커미션 상태 저장
async function setStatus(isOpen, waitCount) {
    const ref = doc(db, "commission", "status");
    await setDoc(ref, { isOpen, waitCount });
}

// 조회수 증가 — page: 'commission' | 'portfolio'
async function incrementView(page) {
    const ref = doc(db, 'views', page);
    const today = new Date().toISOString().slice(0, 10); // "2026-10-29"

    await runTransaction(db, async (tx) => {
        const snap = await tx.get(ref);
        const data = snap.exists() ? snap.data() : { total: 0, today: 0, lastDate: '' };

        const todayCount = data.lastDate === today ? data.today + 1 : 1;
        tx.set(ref, {
            total: (data.total || 0) + 1,
            today: todayCount,
            lastDate: today
        });
    });
}

// 조회수 읽기 — page: 'commission' | 'portfolio'
async function getViews(page) {
    const snap = await getDoc(doc(db, 'views', page));
    return snap.exists() ? snap.data() : { total: 0, today: 0 };
}

export { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, getStatus, setStatus, incrementView, getViews };
