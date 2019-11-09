const Compilation = use('App/Models/Compilation');

class CompilationsService {

  async getCompilations(userId, page) {
    const compilations = (await Compilation
      .query()
      .where('owner_id', userId)
      .distinct('name')
      .paginate(page, 20)).toJSON();

    const compilationsNames = compilations.data.map(item => item.name);
    if (compilationsNames.length) {
      let compilationsData = [];

      const dataToFetch = [];
      compilationsNames.forEach(name => {
        let data = Compilation
          .query()
          .select(['name', 'post_id'])
          .where('owner_id', userId)
          .where('name', name)
          .with('post')
          .limit(4)
          .orderBy('id', 'desc')
          .fetch();

        dataToFetch.push(data);
      });

      await Promise.all(dataToFetch).then(data => {
        JSON.parse(JSON.stringify(data)).forEach(dataEntry => dataEntry.forEach(item => {
          let comp = compilationsData.find(compilationsDataItem => {
            if (compilationsDataItem.hasOwnProperty(item.name))
              return true;
          });
          if (item.post) {
            if (comp) {
              comp[item.name].push(item.post.src);
            } else
              compilationsData.push({
                [item.name]: [item.post.src]
              });
          }
        }));
      });

      compilations.data = compilationsData;
    }

    return compilations;
  }

  async isCompilationExists(ownerId, compilationName) {
    return !!(await Compilation
      .query()
      .select(1)
      .where('owner_id', ownerId)
      .where('name', compilationName)
      .first());
  }

  async isPostExists(userId, postId) {
    return !!(Compilation
      .query()
      .where('owner_id', userId)
      .where('post_id', postId)
      .first());
  }

  async deletePost(userId, postId) {
    return await Compilation
      .query()
      .where('owner_id', userId)
      .where('post_id', postId)
      .delete();
  }

  async deleteCompilation(userId, compilationName) {
    return await Compilation.query()
      .where('owner_id', userId)
      .where('name', compilationName)
      .delete();
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
      post.isSaved = !!savedPosts.find(savedPost => savedPost === post.id);

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
