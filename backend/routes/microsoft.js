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
    res.send(`<script>
        window.opener.postMessage('${user}', 'http://localhost:3000');
        window.close();
    </script>`);
});

export { loginRouter };
