const Mensaje = require("../models/mensaje");
const Usuario = require("../models/usuario")


const usuarioIsConectado = async (uid = '', isConnect = true) => {
    const usuario  = await Usuario.findById(uid);
    usuario.online = isConnect;

    await usuario.save();

    return usuario;
}

const grabarMensaje = async (payload) => {
    /**
     *  payload: {
     *      de: '',
     *      para: '',
     *      texto: ''
     *  }
     */
    try {
        const mensaje = new Mensaje(payload)
        await mensaje.save();

        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    usuarioIsConectado,
    grabarMensaje
}