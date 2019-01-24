'use strict';

const Feed = use('App/Models/Feed');
const Post = use('App/Models/Post');
const User = use('App/Models/User');
const Database = use('Database');
const {validate} = use('CValidator');

class FeedController {

    async show({request, response, auth}) {

        const rules = {
            page: 'integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const page = parseInt(request.input('page'), 10);

        const user = await auth.getUser();

        const postIds = await Feed
            .query()
            .where('receiver_id', user.id)
            .pluck('post_id');

        let posts = await Post
            .query()
            .whereIn('id', postIds)
            .with('comments', builder => {
                builder.limit(3)
            })
            .withCount('comments')
            .withCount('likes')
            .orderBy('id', 'desc')
            .paginate(page, 12);

        posts = posts.toJSON();

        let likes;
        if (user) {
            // get requester likes on post
            likes = await Database
                .from('likes')
                .where('type', 1)
                .where('owner_id', user.id)
                .whereIn('entity_id', posts.data.map(e => e.id));

            likes = JSON.parse(JSON.stringify(likes));
        }

        const postsOwnersIds = posts.data.map(e => e.owner_id);
        let owners = await Database
            .select('id', 'username')
            .from('users')
            .whereIn('id', postsOwnersIds);

        owners = JSON.parse(JSON.stringify(owners));

        let commentsOwnersIds = [];
        posts.data.forEach(post => post.comments.forEach(comment => commentsOwnersIds.push(comment.owner_id)));
        let commentsOwners = await Database
            .select('id', 'username')
            .from('users')
            .whereIn('id', commentsOwnersIds);

        owners = JSON.parse(JSON.stringify(owners));

        let comments = [];
        posts.data = posts.data.map(post => {
            post.owner = owners.find(owner => {
                if (owner.id === post.owner_id)
                    return true;
            }).username;
            // is post liked by requester
            if (likes) {
                post.isLiked = !!likes.find(like => {
                    if (like.entity_id === post.id)
                        return true;
                });
            }

            comments.push(...post.comments.map(comment => {
                comment.owner = commentsOwners.find(owner => {
                    if (owner.id === comment.owner_id)
                        return true
                }).username;
                return comment;
            }));
            delete post.comments;

            return post;
        });

        posts.comments = comments;

        response.json(posts);
    }
}

module.exports = FeedController;
