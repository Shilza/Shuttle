'use strict';

const {validate} = use('CValidator');
const PostsService = use('PostsService');
const LikesService = use('LikesService');

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

        let page = parseInt(request.input('page'), 10);
        page = page > 0 ? page : 1;

        const user = await auth.getUser();

        let posts = await PostsService.getFeedPosts(user.id, page);

        response.json(posts);
    }
}

module.exports = FeedController;
