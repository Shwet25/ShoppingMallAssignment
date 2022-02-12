import express from 'express';
const router = express.Router();

import paths from './router'

export default router.use('/shoppingmall', paths);
