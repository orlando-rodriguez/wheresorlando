const express = require('express');
const router = express.Router();

const queries = require('../queries');

router.get('/', (req, res, next) => {
    queries.listComments().then(comments => {
        res.json({ comments });
    }).catch(next);
});

router.get('/:id', (req, res, next) => {
    queries.readComments(req.params.id).then(comment => {
        comment
            ? res.json({ comment })
            : res.status(404).json({ message: 'Comment not found' })
    }).catch(next);
});

router.post('/', (req, res, next) => {
    queries.createComment(req.body).then(comment => {
        res.status(201).json({ comment: comment });
    }).catch(next);
});

router.delete('/:id', (req, res, next) => {
    queries.deleteComment(req.params.id).then(() => {
        res.status(204).json({ deleted: true });
    }).catch(next);
});

router.put('/:id', (req, res, next) => {
    queries.updateComment(req.params.id, req.body).then(comment => {
        res.json({ comment: comment[0] });
    }).catch(next);
});

module.exports = router;
