
function validateRequest(req) {
    const validToken = (process.env.NODE_ENV && process.env.NODE_ENV === "production") ? process.env.API_AUTH_TOKEN : "development";
    return new Promise((resolve, reject) => {
        if (req.headers.token && req.headers.token === validToken) {
            resolve(true);
        } else {
            reject("unauthorized");
        }
    });
}

export default { validateRequest };
