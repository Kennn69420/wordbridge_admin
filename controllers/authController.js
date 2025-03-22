const admin = require("firebase-admin");
const firebaseAuth = require("firebase/auth");

exports.getLogin = (req, res) => {
  res.render("login", { error: null });
};


exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const auth = firebaseAuth.getAuth(); // Get Firebase Auth instance

        // Sign in user with Firebase Authentication
        const userCredential = await firebaseAuth.signInWithEmailAndPassword(auth, email, password);

        const user = userCredential.user; // Firebase User Object

        // Store user details in session
        req.session.user = {
            uid: user.uid,
            email: user.email
        };

        console.log("User logged in:", user.email);

        // Redirect to admin home
        return res.redirect("/admin_home");
    } catch (error) {
        console.error("Login error:", error.message);

        let errorMessage = "Invalid email or password";
        if (error.code === "auth/user-not-found") {
            errorMessage = "User not found";
        } else if (error.code === "auth/wrong-password") {
            errorMessage = "Incorrect password";
        }

        return res.render("login", { error: errorMessage });
    }
};


exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
