import express from 'express';

import { getUserSigin,
    getUserLogin, homePage, postLogin, postRegister,
    userVotingPage, getReset, postReset, getNewPassword, postNewPassword
} from '../controllers/auth.js'






const router = express.Router();


router.get('/', homePage);
router.get('/signup', getUserSigin);
router.get('/login', getUserLogin);
router.get('/voting',userVotingPage);
router.get('/reset', getReset)
router.get('/reset/:token',getNewPassword )

router.post('/signup', postRegister);
router.post('/login', postLogin)
router.post('/reset', postReset);
router.post('/newPassword',postNewPassword);

//router.get('/reset/:token',getnewPassword)

export default router;