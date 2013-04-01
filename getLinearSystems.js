var foreground = '000000';
var background = 'FFFFFF00';

/*
 * Função que recebe um sitema linear e retorna os dados processados
 */
function getLinearSystems (data) {
    data = data.replace(/\r/g,'');
    data = data.split(/\n/);
    var linear_system = '';
    var output = [];
    var count = 0;

    for (var i in data) {

        if (data[i].match(/^(?:[+-]?[0-9.,\/]*[a-z]?)+=(?:[+-]?[0-9.,\/]*[a-z]?)+$/)) { // se for uma equação...
            linear_system += data[i] + '\n';

        } else {
            if (linear_system != '') {
                linear_system = linear_system.replace(/\n$/,'');
                output.push(new LinearSystem(linear_system));
                linear_system = '';
            }

            output.push(data[i] == '' ? data[i] : data[i] + EXPRESSAO_INVALIDA);
        }
    }

    if (linear_system != '') {
        linear_system = linear_system.replace(/\n$/,'');
        output.push(new LinearSystem(linear_system));
        linear_system = '';
    }
    

    for (var i in output) {
        if (output[i] instanceof LinearSystem) {
            try {
                output[i].cramer();
            } catch (e) {
                alert('Não foi possivel processar a fórmula: ' + toText(output[i].linear_system));
            }
            var index    = 0;
            var response = '';
            var solucao  = 's={';
            response     += toText(output[i].linear_system) + '<br><br>';
            response     += output[i].matrix(-1).table() + '<br>det = ' + toText(output[i].matrix(-1).axis()) + '=' + output[i].matrix(-1).axis().sum() + '<br><br>';
            for (var j in output[i].variables) {
                response += output[i].matrix(index).table() + '<br>det ' + j;
                response += '=' + toText(output[i].matrix(index).axis()) + '=';
                response += output[i].matrix(index).axis().sum() + '<br>Δ' + j;
                response += '=' + output[i].variables[j] + '<br><br>';
                solucao  += output[i].variables[j] + ',';
                index++;
            }

            solucao = solucao.substr(0,solucao.length-1) + '}';

            output[i] = response + solucao + '<hr>';
            count++;
        }
    }

    $('#menu .ui-li-count').text(parseInt($('#menu .ui-li-count').text()) + count);
    return (output);
}

/*
 * Função que recebe os arquivos e processa
 */
function dropHandler (evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files_data = '';

    document.querySelector('#content').innerHTML =  '';
    for (var i = 0; i < evt.dataTransfer.files.length; i++) {
        var file = evt.dataTransfer.files[i];
        if (file.type == 'text/plain') {
            var file_reader = new FileReader();
            file_reader.file = file;
            file_reader.onload = function (evt) {
                document.querySelector('#content').innerHTML += getLinearSystems(evt.target.result).join('\n').replace(/\n/g,'<br>') + '<br>'; //'File:' + evt.target.file.name + '<br>' + 
            };
            file_reader.readAsText(file);
        }
    }

    window.location="#system";
}

/*
 * Função que previne que o evento se propague
 */
function prevent (evt) {
    evt.stopPropagation();
    evt.preventDefault();
}


function clickHandler (evt) {
    document.querySelector('#file').click();
}

/*function changeHandler (evt) {
    console.log(evt.target);
}

*/
function clickTextHandler () {
    $('#menu .ui-li-count').text(parseInt($('#menu .ui-li-count').text()) + 1);
    var result = $("#txtarea").val();
    $('#content').html($('#content').html() + getLinearSystems(result).join('\n').replace(/\n/g,'<br>') + '<br>');
}

function toText(value) {
    if (value.constructor == String) {
        return value;
    }

    if (value.constructor == Array) {
        for (var i in value) {
            if (value[i].toString().substr(0,1) != '-' && value[i].toString().substr(0,1) != '+') {
                value[i] = '+' + value[i];
            }
        }

        return value.join('');
    }
}

function toTex(value) {
    if (value.constructor == String) {
        return '<img src="https://chart.googleapis.com/chart?cht=tx&chf=a,s,' + foreground + '|bg,s,' + background + '&chl=\\left\\{' + value.replace(/\+/g,'%2B') +'}">';
    }

    if (value.constructor == Array) {
        for (var i in value) {
            if (value[i].toString().substr(0,1) != '-' && value[i].toString().substr(0,1) != '+') {
                value[i] = '+' + value[i];
            }
        }

        return '<img src="https://chart.googleapis.com/chart?cht=tx&chf=a,s,' + foreground + '|bg,s,' + background + '&chl=' + value.join('').replace(/\+/g,'%2B') +'">';
    }
}

$('#processar').on('click',clickTextHandler);
document.querySelector('#txtarea').addEventListener('drop',dropHandler,false);
document.querySelector('#txtarea').addEventListener('dragover',prevent,false);
document.querySelector('#txtarea').addEventListener('dragenter',prevent,false);

/*
document.querySelector('.drop-area').addEventListener('click',clickHandler,false);
document.querySelector('#file').addEventListener('change',dropHandler,false);
*/
