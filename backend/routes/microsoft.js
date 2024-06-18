import { Router } from "express";
import passport from "passport";

const loginRouter = Router();

loginRouter.get("/microsoft", passport.authenticate("auth-microsoft", {
    prompt: "select_account",
    session: false,
}));

loginRouter.get("/microsoft/callback", passport.authenticate("auth-microsoft", {
    failureRedirect: "/auth/microsoft",
    session: false,
}), (req, res) => {
    const user = JSON.stringify(req.user);
    //res.send(req.user)
    res.send(`<script>
        window.opener.postMessage('${user}', 'https://softwareseguroa-1.onrender.com');
        window.close();
    </script>`);
});

console.log(loginRouter)
export { loginRouter };
