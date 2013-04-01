function LinearSystem (linear_system) {
    var matrix         = [];
    this.linear_system = '';
    this.equations     = [];
    this.variables     = {};

    this.setLinearSystem = function (linear_system) {
        this.linear_system = linear_system;
        matrix    = [];
        this.variables = {};
        linear_system  = linear_system.split(/[\r\n]+/);
        for (var i in linear_system) {
            linear_system[i] = new Equation(linear_system[i]);

            for (var j in linear_system[i].variables) {
                if (!(j in this.variables)) {
                    this.variables[j] = 0;
                }
            }
        }

        for (var i in linear_system) {
            var tmp_matrix = [];
            for (var j in this.variables) {

                if (linear_system[i].variables[j]) {
                    tmp_matrix.push(linear_system[i].variables[j]);
                } else {
                    tmp_matrix.push(1);
                }


            }

            tmp_matrix.push(linear_system[i].term);
            matrix.push(tmp_matrix);
        }
    }

    this.matrix = function (index) {
        if (!index && index !== 0) {
            return matrix;
        }

        var s_matrix = [];
        for (var i = 0; i < matrix.length; i++) {
            s_matrix[i] = [];

            for (var j = 0; j < matrix[i].length - 1; j++) {
                if (j != index) {
                    s_matrix[i][j] = matrix[i][j];
                } else {
                    s_matrix[i][j] = matrix[i][matrix.length];
                }
            }
        }

        return s_matrix;
    }

    this.cramer = function () {
        var det   = this.matrix(-1);
        var index = 0;
        det       = det.axis();
        det       = det.sum();

        for (var i in this.variables) {
            this.variables[i] = this.matrix(index);
            this.variables[i] = this.variables[i].axis();
            this.variables[i] = this.variables[i].sum();
            this.variables[i] /= det;
            index++;
        }

        return true;
    }

    if (linear_system) {
        this.setLinearSystem(linear_system);
    }
}

