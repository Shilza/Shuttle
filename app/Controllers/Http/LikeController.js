'use strict';

const Like = use('App/Models/Like');
const Post = use('App/Models/Post');
const Comment = use('App/Models/Comment');
const EntityType = use('App/Models/EntityType');
const {validate} = use('CValidator');

class LikeController {

    async like({request, response, auth}) {
        const rules = {
            type: 'required|string',
            entity_id: 'required|integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const type = await EntityType.findBy('type', request.input('type'));
        if (!type)
            return response.status(400).json({
                message: 'Type does not exists'
            });

        const entity_id = request.input('entity_id');
        const user = await auth.getUser();

        const like = await Like.query()
            .where('owner_id', user.id)
            .where('entity_id', entity_id)
            .where('type', type.id)
            .first();

        if (like)
            return response.json({message: 'Like already exists'});

        switch (type.type) {
            case 'comment':
                const comment = await Comment.find(entity_id);
                if (!comment)
                    return response.status(400).json({
                        message: 'Comment does not exists'
                    });

                await Like.create({entity_id, owner_id: user.id, type: type.id});

                return response.json({message: 'Comment liked successfully'});

            case 'post':
                const post = await Post.find(entity_id);
                if (!post)
                    return response.status(400).json({
                        message: 'Post does not exists'
                    });
                await Like.create({entity_id, owner_id: user.id, type: type.id});

                return response.json({message: 'Post liked successfully'});

            default:
                return response.status(400).json({message: 'Something went wrong'});
        }
    }


    async unlike({request, response, auth}) {
        const rules = {
            type: 'required|string',
            entity_id: 'required|integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const type = await EntityType.findBy('type', request.input('type'));
        if (!type)
            return response.status(400).json({
                message: 'Type does not exists'
            });

        const entity_id = request.input('entity_id');
        const user = await auth.getUser();

        const like = await Like.query()
            .where('owner_id', user.id)
            .where('entity_id', entity_id)
            .where('type', type.id)
            .first();

        if (!like)
            return response.json({message: 'Like does not exists'});

        switch (type.type) {
            case 'comment':
                const comment = await Comment.find(entity_id);
                if (!comment)
                    return response.status(400).json({
                        message: 'Comment does not exists'
                    });

                if (await like.delete())
                    return response.json({message: 'Comment unliked successfully'});

                break;

            case 'post':
                const post = await Post.find(entity_id);
                if (!post)
                    return response.status(400).json({
                        message: 'Post does not exists'
                    });

                if (await like.delete())
                    return response.json({message: 'Post unliked successfully'});

                break;
            default:
                return response.status(400).json({message: 'Something went wrong'});
        }
    }
}

module.exports = LikeController;
