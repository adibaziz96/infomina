const Member = require('./member.model');

module.exports = {
  getAll: () => Member.findAll(),
  getById: (id) => Member.findByPk(id),
  create: (data) => Member.create(data),
  update: async (id, data) => {
    const member = await Member.findByPk(id);
    if (!member) return null;
    return member.update(data);
  },
  delete: async (id) => {
    const member = await Member.findByPk(id);
    if (!member) return null;
    await member.destroy();
    return true;
  }
};
