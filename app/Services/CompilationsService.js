const Compilation = use('App/Models/Compilation');

class CompilationsService {

    async getCompilations(userId) {
        const compilationsNames = await Compilation
            .query()
            .where('owner_id', userId)
            .distinct('name')
            .pluck('name');

        let compilations = [];
        for (let i = 0; i < compilationsNames.length; i++) {
            let data = await Compilation
                .query()
                .select('post_id')
                .where('owner_id', userId)
                .where('name', compilationsNames[i])
                .with('post')
                .limit(4)
                .orderBy('id', 'desc')
                .fetch();

            data = data.toJSON().map(item => item.post = item.post.src);

            compilations.push({
                [compilationsNames[i]]: data
            });
        }

        return compilations;
    }

    async getPostsIdsByCompilationName(userId, compilationName) {
        return await Compilation
            .query()
            .where('owner_id', userId)
            .where('name', compilationName)
            .pluck('post_id');
    }

    async setSavedInfo(userId, posts) {
        const savedPosts = await this.getSavedPostsId(userId, posts.map(item => item.id));

        return posts.map(post => {
            post.isSaved = !!savedPosts.find(savedPost => {
                if (savedPost === post.id)
                    return true;
            });

            return post;
        });
    }

    async getSavedPostsId(userId, postsIds) {
        return await Compilation
            .query()
            .where('owner_id', userId)
            .whereIn('post_id', postsIds)
            .pluck('post_id');
    }

    async isSavedBy(userId, postId) {
        const isSaved = await Compilation
            .query()
            .select(1)
            .where('owner_id', userId)
            .where('post_id', postId)
            .fetch();

        return !!isSaved.rows.length;
    }
}

module.exports = CompilationsService;