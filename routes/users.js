const router = require('express').Router();
const {
  getUsers,
  getUser,
  getCurrentUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/', auth, getUsers);
router.get('/:userId', auth, getUser);
router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, updateUser);
router.patch('/me/avatar', auth, updateAvatar);
router.post('/signin', login);
router.post('/signup', createUser);

module.exports = router;
