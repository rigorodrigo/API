import pool from "../db.js";

export const getUsuarios = (req, res) => {
  try {
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar usuarios' });
  }
};