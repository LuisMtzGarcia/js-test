document.getElementById('calcular-1').addEventListener("click", function() {
    let row = document.getElementById('r1');
    let nomina = row.children[0].textContent;
    let fecha = row.children[1].textContent;
    let genero = row.children[2].textContent;
    let objeto = calculoMotor(nomina, fecha, genero);
    row.children[3].textContent = objeto['montoMinimo'];
    row.children[4].textContent = objeto['montoMaximo'];
    row.children[5].textContent = objeto['recomendacionLinea'];
})
document.getElementById('calcular-2').addEventListener("click", function() {
    let row = document.getElementById('r2');
    let nomina = row.children[0].textContent;
    let fecha = row.children[1].textContent;
    let genero = row.children[2].textContent;
    let objeto = calculoMotor(nomina, fecha, genero);
    row.children[3].textContent = objeto['montoMinimo'];
    row.children[4].textContent = objeto['montoMaximo'];
    row.children[5].textContent = objeto['recomendacionLinea'];
})
document.getElementById('calcular-3').addEventListener("click", function() {
    let row = document.getElementById('r3');
    let nomina = row.children[0].textContent;
    let fecha = row.children[1].textContent;
    let genero = row.children[2].textContent;
    let objeto = calculoMotor(nomina, fecha, genero);
    row.children[3].textContent = objeto['montoMinimo'];
    row.children[4].textContent = objeto['montoMaximo'];
    row.children[5].textContent = objeto['recomendacionLinea'];
})
document.getElementById('calcular-4').addEventListener("click", function() {
    let row = document.getElementById('r4');
    let nomina = row.children[0].textContent;
    let fecha = row.children[1].textContent;
    let genero = row.children[2].textContent;
    let objeto = calculoMotor(nomina, fecha, genero);
    row.children[3].textContent = objeto['montoMinimo'];
    row.children[4].textContent = objeto['montoMaximo'];
    row.children[5].textContent = objeto['recomendacionLinea'];
})

/**
 * 
 * @param {string} tipoNomina 
 * @param {date} fechaPrimerEmpleo 
 * @param {string} genero
 * @returns {object} object Objeto con montoMinimo, montoMaximo y
 *                          recomendacionLinea
 */
function calculoMotor(tipoNomina, fechaPrimerEmpleo, genero) {
    let monto_min_masc = [
        [100, 1000,  400,  400],
        [400,  600,  200,  300],
        [900, 1000,  200,  500],
        [100, 1000, 1000,  900],
        [600, 1000,  600, 1000],
    ];
    let monto_min_fem = [
        [800,  800,  200,  500],
        [800,  700,  900, 1000],
        [800,  100,  700,  600],
        [600,  600,  800,  400],
        [200,  700,  100,  700],
    ];

    let monto_max_masc = [
        [4900, 4700, 5000, 4400],
        [4700, 4400, 4700, 4700],
        [4600, 5000, 5000, 4300],
        [4600, 4400, 4200, 4900],
        [4500, 4900, 4600, 4300],
    ];
    let monto_max_fem = [
        [4000, 4700, 4600, 5000],
        [4200, 4200, 4900, 4900],
        [4100, 4500, 4600, 4700],
        [4200, 4300, 4700, 5000],
        [4500, 4400, 4000, 4300],
    ];

    switch (tipoNomina) {
        case 'A':
            tipoNomina = 0;
            break;
        case 'B':
            tipoNomina = 1;
            break;
        case 'C':
            tipoNomina = 2;
            break;
        case 'D':
            tipoNomina = 3;
    }

    let fecha_split = fechaPrimerEmpleo.split("/")
    let year, month, day;
    year = fecha_split[2];
    month = fecha_split[1];
    day = fecha_split[0];

    let fecha = new Date(`${month}/${day}/${year}`);
    let hoy = new Date();
    let difference = hoy - fecha;
    // to seconds 
    difference = difference = difference * 0.001;
    // to days
    difference = difference / 86400;
    // to months
    let meses = difference / 30;
    meses = Math.floor(meses);

    let meses_pos;

    let montoMinimo;
    let montoMaximo;

    if (genero == 'm') {
        if (meses <= 26) {
            meses_pos = 0;
        } else if (meses == 27) {
            meses_pos = 1;
        } else if (meses == 28) {
            meses_pos = 2;
        } else if (meses == 29) {
            meses_pos = 3;
        } else if (meses >= 30) {
            meses_pos = 4
        }
        montoMinimo = monto_min_masc[meses_pos][tipoNomina];
        montoMaximo = monto_max_masc[meses_pos][tipoNomina];
    } else if (genero == 'f') {
        if (meses <= 24) {
            meses_pos = 0;
        } else if (meses == 25) {
            meses_pos = 1;
        } else if (meses == 26) {
            meses_pos = 2;
        } else if (meses == 27) {
            meses_pos = 3;
        } else if (meses >= 28) {
            meses_pos = 4
        }
        montoMinimo = monto_min_fem[meses_pos][tipoNomina];
        montoMaximo = monto_max_fem[meses_pos][tipoNomina];
    }

    let p1 = montoMinimo + (Math.sqrt(montoMaximo - montoMinimo));
    let p2 = montoMinimo + (0.0175 * (montoMaximo - montoMinimo));


    // No me quedo claro lo que significaba max(p1, p2), asi que tome la decision
    // de interpretarlo como el mayor de estos numeros.
    let recomendacionLinea;
    if (p1 > p2) {
        recomendacionLinea = p1;
    } else if (p2 > p1) {
        recomendacionLinea = p2;
    } else {
        recomendacionLinea = p1;
    }

    let objeto = {
        'montoMinimo': montoMinimo,
        'montoMaximo': montoMaximo,
        'recomendacionLinea': recomendacionLinea,
    }
    return objeto
}