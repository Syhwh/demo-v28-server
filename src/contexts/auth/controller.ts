import { Request, Response } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-discord';
import { prisma } from '../../database/database';
import {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_REDIRECT_URI,
} from '../../config/config';
import { createDependencies } from '../users/infrastructure';

import * as userService from '../users/application';

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  console.log({ user });
  done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: `${DISCORD_CLIENT_ID}`,
      clientSecret: `${DISCORD_CLIENT_SECRET}`,
      callbackURL: `${DISCORD_REDIRECT_URI}`,
      scope: ['email'],
    },
    (accessToken: string, refreshToken: string, profile, done) => {
      console.log({
        accessToken,
        refreshToken,
        profile,
      });

      try {
        const userExists = prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });

        if (!userExists) {
          prisma.user.create({
            data: {
              email: profile.email,
            },
          });
        }

        return done(null, profile);
      } catch (error) {
        return done(error, undefined);
      }
    },
  ),
);

export const discordAuth = (req: Request, res: Response, next: any) => {
  console.clear();
  console.log('Discord Auth');
  passport.authenticate('discord')(req, res, next);
};

export const discordCallback = (req: Request, res: Response, next: any) => {
  console.clear();
  // code -> params -> req.query.code
  // post -> auth server -> discord/authorize -> access token / refresh token
  // get -> discord/user ->  access token -> user info

  console.log('Discord Callback');
  passport.authenticate('discord', {
    failureRedirect: '/error',
    // successRedirect: '/',
  })(req, res, next);
};


const { userRepository, bcryptAdapter, jwtAdapter, mailerService } =
  createDependencies();

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userService.createUser(
      { email, password },
      userRepository,
      bcryptAdapter,
      jwtAdapter,
      mailerService,
    );

    res.status(201).json(user);
  } catch (error: unknown) {
    throw new Error(`Unable to create user: ${error}`);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await userService.loginUser(
      { email, password },
      userRepository,
      bcryptAdapter,
      jwtAdapter,
    );

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 3600000),
      })
      .json({ user });
  } catch (error: unknown) {
    throw new Error(`Unable to login user: ${error}`);
  }
};
