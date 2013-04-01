function Term (term) {
    this.amount   = 0;
    this.variable = '';

    this.setTerm = function (value) {
        if (!isNaN(value)) {
            this.amount   = value;
            this.variable = '';
        } else {
            if (value.match(/[a-z]$/)) {
                this.amount   = value.substr(0, value.length-1);
                this.variable = value.substr(value.length-1, 1);
            } else {
                this.amount   = value;
                this.variable = '';
            }

            if (this.amount == '-' || this.amount == '') {
                this.amount += '1';
            }

            if (this.amount == '+') {
                this.amount = '1';
            }

            if (this.amount.match(/^[0-9\/-]+$/)) {
                eval('this.amount = ' + this.amount);
            }

        }

        if (!isNaN(this.amount)) {
            this.amount = parseFloat(this.amount);
        }

    }

    if (term) {
        this.setTerm(term);
    }

}
