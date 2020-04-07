/* @flow strict */

import { Router } from 'express';

import ThemeController from '/Modules/Themes/Controller/ThemeController.js';

const router = Router();

router.get('/theme/:title?', ThemeController.theme);

export default router;
