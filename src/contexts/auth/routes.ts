import { Router } from 'express';
import { createUser, discordAuth, loginUser } from './controller';
import { validateUserInput } from '../users/middleware/userInputValidation';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/auth/discord', discordAuth);
router.get('/auth/discord/callback', discordAuth);
router.get('/auth/user', (req, res) => {
  console.log({ user: req.user, session: req.session, cookies: req.cookies });
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.json(req.user);
});
router.get('/auth/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });

});

router.post('/signup', validateUserInput, asyncHandler(createUser));
router.post('/login', validateUserInput, asyncHandler(loginUser));
export default router;
