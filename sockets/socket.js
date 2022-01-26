const { io } = require('../index');

const { comprobarJWt } = require('../helpers/jwt');
const { usuarioIsConectado, grabarMensaje } = require('../controllers/socket');

console.log('init server');


// Mensjess de sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    
    const [valido, uid] = comprobarJWt(client.handshake.headers['x-token']);
    
    // Verificar Autenticación
    if (!valido) {
        return client.disconnect();
    }
    // Cliente autenticado
    usuarioIsConectado(uid);

    console.log('Cliente autenticado');

    // ingresar al usuario a una sala
    client.join(uid);

    // Escuchar del cliente el mensaje personal
    client.on('mensaje-personal', async (payload) => {
        console.log(payload);
        await grabarMensaje(payload);
        io.to(payload['para']).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
        usuarioIsConectado(uid, false);
     });

     /* client.on('mensaje', (payload) => {
         console.log('Mensaje!!!!', payload);

         io.emit('mensaje', {admin: 'Nuevo mensaje'});
     }) */
});