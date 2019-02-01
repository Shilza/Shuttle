'use strict';

const {validate} = use('CValidator');
const Post = use('App/Models/Post');
const Database = use('Database');
const User = use('App/Models/User');
const Compilation = use('App/Models/Compilation');


class CompilationController {

    async showPosts({request, response, auth}) {

        const rules = {
            compilation: 'required|string|min:1|max:32',
            page: 'integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await auth.getUser();

        const postsIds = await Compilation
            .query()
            .where('owner_id', user.id)
            .where('name', request.input('compilation'))
            .pluck('post_id');

        const page = parseInt(request.input('page'), 10);
        let posts = await Post
            .query()
            .whereIn('id', postsIds)
            .withCount('comments')
            .withCount('likes')
            .orderBy('id', 'desc')
            .paginate(page, 12);

        let likes;
        if (user) {
            // get requester likes on post
            likes = await Database
                .from('likes')
                .where('type', 1)
                .where('owner_id', user.id)
                .whereIn('entity_id', posts.rows.map(e => e.id));

            likes = JSON.parse(JSON.stringify(likes));
        }

        let owners = await User
            .query()
            .select(['id', 'username'])
            .whereIn('id', posts.rows.map(e => e.owner_id))
            .fetch();

        owners = owners.toJSON();
        posts.rows = posts.rows.map(post => {
            post.owner = this.find(owners, post.owner_id);
            // is comment liked by requester
            if (likes) {
                post.isLiked = !!likes.find(like => {
                    if (like.entity_id === post.id)
                        return true;
                });
            }

            return post;
        });

        response.json(posts);
    }

    find(array, id) {
        const user = array.find(user => {
            if (user.id === id)
                return true;
        });

        return user.username;
    }

    async showCompilations({request, response, auth}) {

        const user = await auth.getUser();
        const compilationsNames = await Compilation
            .query()
            .where('owner_id', user.id)
            .distinct('name')
            .pluck('name');

        let comp = [];
        for (let i = 0; i < compilationsNames.length; i++) {
            let data = await Compilation
                .query()
                .select('post_id')
                .where('name', compilationsNames[i])
                .with('post')
                .limit(4)
                .orderBy('id', 'desc')
                .fetch();

            data = data.toJSON().map(item => item.post = item.post.src);

            comp.push({
                [compilationsNames[i]]: data
            });
        }

        response.json({compilations: comp});
    }

    async create({request, response, auth}) {
        const rules = {
            post_id: 'required|integer',
            compilation: 'string|min:1|max:32'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const post = await Post.find(request.input('post_id'));
        if (!post)
            return response.status(400).json({
                message: 'Post does not exists'
            });

        const user = await auth.getUser();

        const isSaved = await Compilation
            .query()
            .where('owner_id', user.id)
            .where('post_id', post.id)
            .first();

        if (isSaved)
            return response.status(400).json({
                message: 'Post already saved'
            });

        const compilationData = {
            owner_id: user.id,
            post_id: post.id,
            name: request.input('compilation')
        };
        Object.entries(compilationData).forEach(
            e => {
                if (!e[1])
                    delete compilationData[e[0]]
            }
        );
        await Compilation.create(compilationData);

        response.json({
            message: 'Post saved successfully'
        });
    }

    async update({request, response, auth}) {
        const rules = {
            old_compilation_name: 'required|string|min:1|max:32',
            new_compilation_name: 'required|string|min:1|max:32'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await auth.getUser();
        const isExists = await Compilation
            .query()
            .where('owner_id', user.id)
            .where('name', request.input('old_compilation_name'))
            .first();

        if (!isExists)
            return response.status(400).json({
                message: 'Compilation does not esists'
            });

        await Compilation
            .query()
            .where('owner_id', user.id)
            .where('name', request.input('old_compilation_name'))
            .update({name: request.input('new_compilation_name')});

        response.json({
            message: 'Compilation name updated successfully'
        });
    }

    async delete({request, response, auth}) {
        const rules = {
            compilation: 'required|string|min:1|max:32'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await auth.getUser();

        const compilation = await Compilation
            .query()
            .where('name', request.input('compilation'))
            .first();

        if (!compilation)
            return response.json({
                message: 'Compilation does not exists'
            });

        const isDeleted = await Compilation.query()
            .where('owner_id', user.id)
            .where('name', request.input('compilation'))
            .delete();

        if (isDeleted)
            return response.json({
                message: 'Compilation deleted successfully'
            });

        response.json({
            message: 'Something went wrong'
        });
    }

    async deletePost({request, response, auth}) {
        const rules = {
            post_id: 'required|integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await auth.getUser();

        const post = await Compilation
            .query()
            .where('owner_id', user.id)
            .where('post_id', request.input('post_id'))
            .first();

        if (!post)
            return response.status(400).json({
                message: 'Post does not exists'
            });
;
        const isDeleted = await Compilation
            .query()
            .where('owner_id', user.id)
            .where('post_id', request.input('post_id'))
            .delete();

        if (isDeleted)
            return response.json({
                message: 'Post deleted successfully'
            });

        response.status(400).json({
            message: 'Something went wrong'
        });
    }
}

module.exports = CompilationController;
