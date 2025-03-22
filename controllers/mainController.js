const { database } = require("../firebase"); 

function convertDriveLink(driveLink) {
    try {
        const url = new URL(driveLink);
        let fileId = null;
        if (url.hostname === "drive.google.com") {
            const pathSegments = url.pathname.split("/");
            if (pathSegments.includes("d")) {
                fileId = pathSegments[pathSegments.indexOf("d") + 1];
            }
        }
        if (!fileId) {
            fileId = url.searchParams.get("id");
        }

        return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : driveLink;
    } catch (error) {
        console.error("Error converting Drive link:", error.message);
        return driveLink;
    }
};

exports.getHome = (req, res) => {
    res.redirect("/login");
}


exports.getAdminHome = async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login"); 
    }

    try {
        const usersRef = database.collection("admin");
        const snapshot = await usersRef.get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.render("index", { users, user: req.session.user, error: null });
    } catch (error) {
        console.error("Firebase Error:", error);
        res.status(500).send("Error fetching users");
    }
};



exports.addWord = async (req, res) => {
    try {
        let { word, language, link } = req.body;

        if (!word || !language || !link) {
            const usersSnapshot = await database.collection("admin").get();
            const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return res.render("index", { users, error: "Missing required fields." });
        }

        const formattedWord = word.charAt(0).toUpperCase() + word.slice(1);

        const querySnapshot = await database.collection("admin")
            .where("word", "==", formattedWord)
            .get();

        if (!querySnapshot.empty) {
            const usersSnapshot = await database.collection("admin").get();
            const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return res.render("index", { users, error: `Word "${formattedWord}" already exists.` });
        }

        const directLink = convertDriveLink(link);
        await database.collection("admin").add({
            word: formattedWord,
            language: language,
            link: directLink
        });

        res.redirect("/admin_home");
    } catch (error) {
        console.error("Error adding word:", error);
        const usersSnapshot = await database.collection("admin").get();
        const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.render("index", { users, error: "Internal server error." });
    }
};

exports.getEditWord = async (req, res) => {
    const userId = req.params.id;
    try {
        const userDoc = await database.collection("admin").doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).send("User not found");
        }
        res.render("edit", { user: { id: userDoc.id, ...userDoc.data() } });
    } catch (error) {
        res.status(500).send("Error fetching user data");
    }
};

exports.editWord = async (req, res) => {
    const userId = req.params.id;
    const { word, language, link } = req.body;

    try {
        await database.collection("admin").doc(userId).update({
            word,
            language,
            link,
        });

        res.redirect("/admin_home");
    } catch (error) {
        res.status(500).send("Error updating user");
    }
};

exports.deleteWord = async (req, res) => {
    const userId = req.params.id;
    try {
        await database.collection("admin").doc(userId).delete();
        res.redirect("/admin_home?deleted=true");
    } catch (error) {
        res.status(500).send("Error deleting user");
    }
};


exports.getAbout = (req, res) => {
    res.render("about");
}

