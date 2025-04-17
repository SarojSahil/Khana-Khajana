function auth(req, res, next) {
    const publicRoutes = [/^\/login$/, /^\/register$/, /^(?:\/admin).*$/, /^\/api\/item$/, /^\/api\/order$/, /^\/images\/.*$/, /^\/assets\/.*$/]

    for (let r of publicRoutes) {
        if (r.test(req.path)) {
            console.log("public url " + req.path)
            return next();
        }
    }
    if (req.session && req.session.userId) {
        console.log("private url " + req.path)
        return next();
    }
    else {
        console.log("error url " + req.path)
        return res.status(401).send("Unauthorized");
    }
}

module.exports = auth;