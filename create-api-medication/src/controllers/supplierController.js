import { SupplierModel } from "../models/supplierModel.js";

export const SupplierController = {
  async getAll(req, res) {
    try {
      const suppliers = await SupplierModel.getAll();
      res.json(suppliers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const supplier = await SupplierModel.getById(req.params.id);
      res.json(supplier);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const supplier = await SupplierModel.create(req.body);
      res.status(201).json(supplier);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const supplier = await SupplierModel.update(req.params.id, req.body);
      res.json(supplier);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await SupplierModel.remove(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
