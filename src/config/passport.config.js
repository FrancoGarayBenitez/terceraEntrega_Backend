const passport = require('passport');
//Import model
const { userModel } = require('../dao/mongo/models/userModel');
//Import utils.js
const { createHash } = require('../utils');


const initializePassport = () => {

    //-------------------------------------------------------//
    //Estrategia local para registrarse.
    const local = require('passport-local');
    const LocalStrategy = local.Strategy;

    passport.use("local", new LocalStrategy({ usernameField: "email" },
        async function (username, password, done) {

            const { first_name, last_name, email, age } = req.body;
            await userModel.findOne({ email: username }, async function (err, user) {

                //Validación si existe el usuario.
                if (user) {
                    console.log("El usuario ya existe.");
                    return done(null, false);

                } else if (!user) {
                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password)
                    }
                    //Enviamos usuario creado a la base.
                    let result = await userModel.create(newUser);

                    //Retorno del resultado.
                    return done(null, result);

                } else {
                    if (err) { return done(err); }
                }

            });
        }
    ));


    //-------------------------------------------------------//
    //Estrategia para autenticarse con GitHub.
    const GitHubStrategy = require('passport-github2');
    //Import config dotenv
    const config = require('./config.dotenv')

    passport.use(new GitHubStrategy({
        clientID: "Iv1.deeb2f97c9cba1bc",
        clientSecret: "33c286d7e9b81fbca660ebacaa124b3a6aff8bd3",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    },
        async function (accessToken, refreshToken, profile, done) {
            await userModel.findOne({ email: profile._json.email }, async function (err, user) {

                if (!user) {
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: "",
                        age: "",
                        email: profile._json.email,
                        password: ""
                    }

                    let result = await userModel.create(newUser);

                    done(null, result)

                } else if (user) {
                    done(null, user)
                } else {
                    return done(err, user);
                }

            });
        }
    ));


    //-------------------------------------------------------//
    //Estrategia para logearse con JWT
    const JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;
    const opts = {}

    const cookieExtractor = function (req) {
        const token = null;
        if (req && req.cookies) {
            token = req.cookies['jwt'];
        }
        return token;
    };

    opts.jwtFromRequest = cookieExtractor;
    opts.secretOrKey = 'coderSecret';

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }));


    //-------------------------------------------------------//
    //Serializar y deserializar.
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById({ _id: id });
        done(null, user);
    })

}

module.exports = initializePassport;