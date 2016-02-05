'use strict';
const crypto = require('crypto');
const _ = require('lodash');

class Generator {
    constructor(options) {
        this._amount = 1;
        if (options) {
            if (options.length) {
                this._length = options.length;
            }
            if (options.char) {
                this._char = options.char;
            }
            if (options.template) {
                this._template = options.template;
            }
            if (options.syntax) {
                this._syntax = options.syntax;
            }
            if (options.amount) {
                this._amount = options.amount;
            }
        }
        return this;
    };
    length(length) {
        this._length = length;
        return this;
    };
    char(char) {
        this._char = char;
        return this;
    };
    template(template) {
        this._template = template;
        return this;
    };
    syntax(syntax) {
        this._syntax = syntax;
        return this;
    };
    amount(amount) {
        this._amount = amount;
        return this;
    };
    static randomstring(chars, length) {
        let str = '';
        while (str.length < length) {
            let bf;
            try {
                bf = crypto.randomBytes(length);
            } catch (e) {
                continue;
            }
            for (let i = 0; i < bf.length; i++) {
                let index = bf.readUInt8(i) % chars.length;
                str += chars.charAt(index);
            }
        }
        return str;
    };
    static randomchar(str) {
        let index = _.random(0, str.length - 1);
        return str[index];
    };
    gen() {
        let result = [];
        let keygen;
        if (this._length && this._length > 0) {
            keygen = () => {
                return Generator.randomstring(this._char, this._length);
            };
        } else if (this._template) {
            keygen = () => {
                let key = '';
                for (let i = 0; i < this._template.length; i++) {
                    if (this._syntax[this._template[i]]) {
                        key += Generator.randomchar(this._syntax[this._template[i]]);
                    } else {
                        key += this._template[i];
                    }
                };
                return key;
            };
        }
        for (let i = 0; i < this._amount; i++) {
            result.push(keygen());
        };
        if (this._amount <= 1) {
            return result[0];
        } else {
            return result;
        }
    };
}

module.exports = Generator;