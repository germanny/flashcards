const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data; // equivalent of data.card from the JSON file


router.get('/', (req, res) => {
  // Find a random card
  const randomCard = Math.floor(Math.random() * cards.length);

  // Redirect the user to view that card
  if (randomCard) {
    res.redirect(`/cards/${randomCard}`);
  }
});

// router.get('/:id', (req, res) => {
//   res.render('card', {
//     prompt: cards[req.params.id].question,
//     hint: cards[req.params.id].hint
//   });
// });

// get prompt and hint above using query string params instead:
router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;

  if (!side) {
    return res.redirect(`/cards/${id}?side=question`); // stop the execution here
  }

  const name = req.cookies.username;

  const text = cards[id][side];
  const { hint } = cards[id];
  const templateData = { id, text, name };

  if (side === "question") {
    templateData.hint = hint;
    templateData.toggle = "Answer"
  } else if (side === "answer") {
    templateData.toggle = "Question"
  } else {
    res.redirect(`/cards/${id}?side=question`);
  }

  res.render('card', templateData);
});

module.exports = router;
