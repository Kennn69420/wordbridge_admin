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
