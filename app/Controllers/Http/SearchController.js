'use strict';

const User = use('App/Models/User');
const {validate} = use('CValidator');
const UsersService = use('UsersService');

class SearchController {

    async search({request, response}) {
        const rules = {
            username: 'required|string',
            page: 'integer'
        };

        const validation = await validate(request.all(), rules);
        let page = parseInt(request.input('page'), 10);
        page = page > 0 ? page : 1;

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        let users = await User
            .query()
            .where('username', 'like', request.input('username') + '%')
            .paginate(page, 12);

        response.json(users);
    }

  async privateSearch({request, response, auth}) {
    const rules = {
      username: 'required|string',
      page: 'integer'
    };

    const validation = await validate(request.all(), rules);
    let page = parseInt(request.input('page'), 10);
    page = page > 0 ? page : 1;

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    const user = await auth.getUser();

    let users = await User
      .query()
      .where('username', 'like', request.input('username') + '%')
      .paginate(page, 12);

    const data = await Promise.all(users.rows.map(searchUser => UsersService.canSee(searchUser, user.id)));
    users.rows = users.rows.map((user, index) => data[index] && user).filter(Boolean);

    return response.json(users);
  }
}

module.exports = SearchController;
