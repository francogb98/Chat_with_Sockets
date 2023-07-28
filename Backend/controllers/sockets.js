const Usuario = require("../models/usuario");
const Mensaje = require("../models/mensaje");
const { modelNames } = require("mongoose");

const ususarioConectado = async (uid) => {
  const usuario = await Usuario.findById(uid);
  usuario.online = true;

  await usuario.save();
  return usuario;
};
const ususarioDesconectado = async (uid) => {
  const usuario = await Usuario.findById(uid);
  usuario.online = false;

  await usuario.save();
  return usuario;
};

const getUsuarios = async () => {
  const users = await Usuario.find().sort("-online");
  return users;
};

const saveMensajes = async (payload) => {
  try {
    const mensaje = new Mensaje(payload);
    await mensaje.save();
    return mensaje;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  ususarioConectado,
  ususarioDesconectado,
  getUsuarios,
  saveMensajes,
};
