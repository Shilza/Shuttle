'use strict'
const Mark = use('App/Models/Mark');
const {validate} = use('CValidator');

class MarkController {
  async delete({request, response, auth}) {

    const rules = {
      id: 'required|integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    const mark = await Mark.find(request.input('id'));

    if (!mark)
      return response.status(400).json({
        message: 'Mark does not exists'
      });

    const user = await auth.getUser();
    if (user.username !== mark.username)
      return response.status(403).json({
        message: 'Forbidden. Unable to delete'
      });

    await mark.delete();

    response.json({message: 'Mark deleted successfully'});
  }
}

module.exports = MarkController;
