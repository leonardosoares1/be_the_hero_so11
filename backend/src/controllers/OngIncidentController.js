const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const { id: ongId } = request.params

    const ongIncidents = await connection('incidents')
      .where('ong_id', ongId)
      .select('*')

    return response.json(ongIncidents)
  },
}