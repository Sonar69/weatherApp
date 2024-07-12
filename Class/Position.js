export class Position {
    // attributes
    _latitude = 0;
    _longitude = 0;

    constructor(x, y) {
        this._latitude = x;
        this._longitude = y;
    }

    // methods

    get latitude() {
        return this._latitude;
    }

    set latitude(value) {
        this._latitude = value;
    }

    get longitude() {
        return this._longitude;
    }

    set longitude(value) {
        this._longitude = value;
    }

    toString() {
        return `Position {latitude: ${this._latitude}, longitude: ${this._longitude}}`;
    }
}