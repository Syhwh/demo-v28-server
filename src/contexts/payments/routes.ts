import { Router } from 'express';

import { checkout, success } from './controller';

const router = Router();

router.post('/checkout', checkout);
router.get('/success', success);

export default router;