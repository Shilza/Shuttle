'use strict';

const User = use('App/Models/User');
const Database = use('Database');
const {validate} = use('CValidator');

class SearchController {

    async search({ request, response }){
        const rules = {
            username: 'required|string'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        let users = await Database
            .from('users')
            .where('username', 'like', '%' + request.input('username') + '%');


        users = JSON.parse(JSON.stringify(users));

        response.json({users});
    }
}

module.exports = SearchController;
