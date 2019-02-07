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

    async _getSavedPostsId(userId, postsIds) {
        return await Compilation
            .query()
            .where('owner_id', userId)
            .whereIn('post_id', postsIds)
            .pluck('post_id');
    }

    //!!!!!!!!! may be unused
    async _isSavedBy(userId, postId) {
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