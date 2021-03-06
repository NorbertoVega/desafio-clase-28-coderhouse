
function getRandom(cant) {
    const min = 1;
    const max = 1001;

    let numero;
    const obj = {};

    for (let i = 0; i < cant; i++) {
        numero = Math.floor(Math.random() * (max - min) + min);
        console.log('Numero aleatorio generado: ', numero);

        if (obj[numero])
            obj[numero]++;
        else
            obj[numero] = 1;
    }

    return obj;
}

process.on('message', data => {
    if (data.cant) {
        console.log("Cantidad de numeros a generar:", data.cant);
        process.send(getRandom(data.cant));
    }

    if (data === 'finish'){
        console.log("Terminando proceso.");
        process.exit();
    }
})

