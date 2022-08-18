const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', unlikeCard);

module.exports = router;
