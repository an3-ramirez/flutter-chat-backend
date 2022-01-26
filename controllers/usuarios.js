const { response } = require("express");

/** Models */
const Usuario = require("../models/usuario");

const getUsuarios = async (req, res = response) => {

    try {
        const regPerPage = 10;
        const numberPage = Number(req.query.numberpage) || 0;

        const usuarios = await Usuario
            .find({_id: { $ne: req.uid}})
            .sort('-online')
            .skip(numberPage * regPerPage)
            .limit(regPerPage)
        
        res.json({
            ok: true,
            usuarios,
            numberPage
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error
        })
    }
}

module.exports = {
    getUsuarios
}