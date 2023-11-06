const path = require('path');
const UserComment = require('../models/comment');

exports.goToCreateComment = (req: any, res: any, next: any) => {
    console.log('CREATE USER COMMENT');
    const userId = req.params.id;
    res.render('add-comment', {
        userId: userId,
    });
};

exports.addComment = (req: any, res: any, next: any) => {
    console.log('Add COMMENT POST');
    const userId = req.params.id;
    const title = req.body.title;
    const description = req.body.description;

    const comment = new UserComment(title, description, 0, userId);

    comment
    .save()
    .then((result: any) => {
        console.log('COMMENT CREATED SUCCESSFULLY');
        res.redirect(`/user/${userId}`)
    })
    .catch((err: any) => {
        console.log(`ERROR WHILE CREATING COMMENT ${err}`)
    })
};

exports.getUserComments = async (req: any, res: any, next: any) => {
    console.log('GET USER COMMENTS');
    const userId = req.params.id;

    try {
        const comments = await UserComment.findCommentsById(userId);
        res.render('user-comments', {
            userId: userId,
            comments: comments
        });
    } catch (err) {
        console.error('ERROR:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.getSelectedComment = async (req: any, res: any, next: any) => {
    console.log('GET SELECTED USER');
    const userId = req.params.id;
    // await User.findByPk(userId)
    // .then((rows: any) => {
    //     res.render('selectedUser', {
    //         user: rows,
    //     });
    // })
    // .catch((err: any) => {
    //     console.error(err);
    //     res.status(500).send(`Error while getting user ${userId}.`);
    // });
};

exports.deleteComment = async (req: any, res: any, next: any) => {
    console.log('DELETE USER');
    const userId = req.params.id;
    const commentId = req.params.commentId;

    try {
        const deleteComment = await UserComment.deleteComment(commentId);

        if (deleteComment) {
            res.redirect(`/user-comments/${userId}`)
        } else {
            res.status(404).json({ mensagem: 'Comentário não encontrado' });
          }
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error while deleting COMMENT ${commentId} in Controller.`);
    }
};

exports.goToEditCommentPage = (req: any, res: any, next: any) => {
    console.log('Edit user GET');
    const userId = req.params.id;
    const commentId = req.params.commentId;
    res.render('edit-comment', {
        userId: userId,
        commentId: commentId
    });
};

exports.editComment = async (req: any, res: any, next: any) => {
    console.log('EDIT COMMENT');
    const userId = req.params.id;
    const commentId = req.params.commentId;
    const updatedTitle = req.body.title;
    const updatedDescription = req.body.description;

    try {
        const updatedComment = await UserComment.updateCommentById(commentId, {
            title: updatedTitle,
            description: updatedDescription,
            likes: 0
        });
        
        if (!updatedComment) {
            return res.status(404).json({ error: 'COMMENT NOT FOUND' });
        }

    } catch (err) {
        console.error('ERRO AO EDITAR COMENTÁRIO', err);
        return res.status(500).json({ error: 'Erro ao editar o comentário' });
    } finally {
        res.redirect(`/user-comments/${userId}`)
    }
};
