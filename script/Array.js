Object.defineProperty(Array.prototype, 'isSquare', {
    value: function () {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            if (this[i].length != len) {
                return false;
            }
        }

        return len > 1;
    }
});

Object.defineProperty(Array.prototype, 'determinant', {
    value: function () {
        return this;
    }
});

Object.defineProperty(Array.prototype, 'sum', {
    value: function () {
        var value = 0;
        for (var i in this) {
            value += this[i];
        }
        return value;
    }
});

Object.defineProperty(Array.prototype, 'axis', {
    value: function () {
        if (!this.isSquare()) {
            return false;
        }

        var tamanho = this.length;
        var auxiliar = [[],[]];
        var determinante = [];
        var i;
        var j;
        var eixo;

        for (i = 0; i < 3; i++) {
            auxiliar[1][i] = 1;
            auxiliar[0][i] = 1;
            for (j = 0; j < tamanho; j++) {
                eixo           = (j + i) % tamanho;
                auxiliar[1][i] *= this[j][eixo];
                auxiliar[0][i] *= this[tamanho-j-1][eixo];
            }
            auxiliar[0][i] = -auxiliar[0][i];
        }

        return auxiliar[0].concat(auxiliar[1]);
    }
});

Object.defineProperty(Array.prototype, 'table', {
    value: function () {
        var table = '<table>';
        for (var i in this) {
            table += '<tr>';
            for (var j in this[i]) {
                table += '<td>';
                table += this[i][j];
                table += '</td>';
            }

            for (var j =0; j < 2; j++) {
                table += '<td>';
                table += this[i][j];
                table += '</td>';
            }

            table += '</tr>';
        }

        table += '</table>';

        return table;
    }
});

/*
 * ToDo: testes com qUnit
 */
Object.defineProperty(Array.prototype, 'tex', {
    value: function () {
        var tex = '<img src="https://chart.googleapis.com/chart?cht=tx&chf=a,s,000000|bg,s,FFFFFF00&chl=\\begin{vmatrix}';
        for (var i in this) {
            for (var j in this[i]) {
                tex += this[i][j];
                tex += '%26';
            }
            tex = tex.replace(/%26$/,'');
            tex += '\\\\';
        }
        tex += '\\end{vmatrix}">';
        return tex;
    }
});