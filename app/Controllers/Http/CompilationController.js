'use strict';

const {validate} = use('CValidator');
const Post = use('App/Models/Post');
const Compilation = use('App/Models/Compilation');
const CompilationsService = use('CompilationsService');
const PostsService = use('PostsService');

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

    let page = parseInt(request.input('page'), 10);
    page = page > 0 ? page : 1;

    const posts = await PostsService.getCompilationsPosts(
      user.id,
      request.input('compilation'),
      page
    );

    response.json(posts);
  }

  async showCompilations({request, response, auth}) {
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
    const compilations = await CompilationsService.getCompilations(user.id, page);

    response.json(compilations);
  }

  async create({request, response, auth}) {
    const rules = {
      post_id: 'required|integer',
      compilation: 'string|min:2|max:12|regex:^[A-z0-9]+$:'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    let post = await Post
      .query()
      .where('id', request.input('post_id'))
      .notArchived()
      .first();

    if (!post)
      return response.status(400).json({
        message: 'Post does not exists'
      });

    const user = await auth.getUser();

    const isSaved = await CompilationsService.isSavedBy(user.id, post.id);

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
    const isExists = await CompilationsService.isCompilationExists(user.id, request.input('old_compilation_name'));
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

    const isExists = await CompilationsService.isCompilationExists(user.id, request.input('compilation'));

    if (!isExists)
      return response.json({
        message: 'Compilation does not exists'
      });

    const isDeleted = await CompilationsService.deleteCompilation(user.id, request.input('compilation'));

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

    const isPostExists = await CompilationsService.isPostExists(user.id, request.input('post_id'));

    if (!isPostExists)
      return response.status(400).json({
        message: 'Post does not exists'
      });

    const isDeleted = await CompilationsService.deletePost(user.id, request.input('post_id'));

    if (isDeleted)
      return response.json({
        message: 'Post deleted from saved successfully'
      });

    response.status(400).json({
      message: 'Something went wrong'
    });
  }
}

module.exports = CompilationController;
