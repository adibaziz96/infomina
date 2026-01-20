const service = require('./member.service');

module.exports = {
  async index(req, res) {
    try {
      const members = await service.getAll();
      res.json(members);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async store(req, res) {
    try {
      const member = await service.create(req.body);
      res.status(201).json(member);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async show(req, res) {
    try {
      const member = await service.getById(req.params.id);
      if (!member) return res.status(404).json({ error: 'Member not found' });
      res.json(member);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const member = await service.update(req.params.id, req.body);
      if (!member) return res.status(404).json({ error: 'Member not found' });
      res.json(member);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async destroy(req, res) {
    try {
      const deleted = await service.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Member not found' });
      res.json({ message: 'Member deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
