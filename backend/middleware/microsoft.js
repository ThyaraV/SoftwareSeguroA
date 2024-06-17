import passport from "passport";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import { config } from "dotenv";

config();

passport.use("auth-microsoft", new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/microsoft/callback",
    scope: ["user.read", "calendars.read", "mail.read", "offline_access"],
    authorizationURL: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
}, function(accessToken, refreshToken, profile, done) {
    // Aquí puedes realizar validaciones adicionales o almacenar tokens
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
    console.log("Profile:", profile);

    // Aquí decides qué datos del perfil deseas almacenar en el objeto 'user'
    const user = {
        id: profile.id,
        email: profile.emails[0].value,
        displayName: profile.displayName,
        // Agrega más campos según lo necesites
    };

    // Puedes almacenar más datos relevantes del perfil en req.session
    // req.session.accessToken = accessToken;

    // Llama a done() para indicar que la autenticación fue exitosa
    done(null, user);
}));

export default passport;
