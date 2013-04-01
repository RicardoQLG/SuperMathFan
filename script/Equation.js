function Equation (equation) {
    this.left      = [];
    this.right     = [];
    this.variables = {};
    this.term      = 0;

    this.setEquation = function (equation) {
        var variables  = equation.match(/([a-z])/gi);
        this.variables = {};

        for (var i in variables) {
            if (variables[i] in this.variables) {} else {
                this.variables[variables[i]] = 0;
            }
        }

        var equation   = equation.split('=');
        this.left      = equation[0].match(/([+-]?[0-9\/]*[a-z]*)/gi);
        this.left      = this.left.filter(function (e) {if (e != '') { return e; }});
        this.right     = equation[1].match(/([+-]?[0-9\/]*[a-z]*)/gi);
        this.right     = this.right.filter(function (e) {if (e != '') { return e; }});

        for (i in this.left) {
            this.left[i] = new Term(this.left[i]);
        }
        
        for (i in this.right) {
            this.right[i] = new Term(this.right[i]);
        }

        this.comutative();
        this.sum();
    }

    this.comutative = function () {
        var right_ok = [];
        var left_ok  = [];

        for (var i in this.left) {
            if (this.left[i].variable == '') {
                this.left[i].amount *= -1;
                right_ok.push(this.left[i]);
            } else {
                left_ok.push(this.left[i]);
            }
        }

        for (var i in this.right) {
            if (this.right[i].variable != '') {
                this.right[i].amount *= -1;
                left_ok.push(this.right[i]);
            } else {
                right_ok.push(this.right[i]);
            }
        }

        this.left  = left_ok.length > 0 ? left_ok : [new Term('0')];
        this.right = right_ok.length > 0 ? right_ok : [new Term('0')];
    }

    this.sum = function () {
        this.term = 0;
        for (var i in this.left) {
            this.variables[this.left[i].variable] += parseFloat(this.left[i].amount);
        }


        for (var i in this.right) {
            this.term += parseFloat(this.right[i].amount);
        }
    }

    if (equation) {
        this.setEquation(equation);
    }
}