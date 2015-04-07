
function DrawObject(container, aryPos, clsName) {
    container.find("td").removeClass(clsName);
    container.find("tr:nth-child(" + aryPos[0][0] + ") td:nth-child(" + aryPos[0][1] + "):first, tr:nth-child(" + aryPos[1][0] + ") td:nth-child(" + aryPos[1][1] + "):first, tr:nth-child(" + aryPos[2][0] + ") td:nth-child(" + aryPos[2][1] + "):first, tr:nth-child(" + aryPos[3][0] + ") td:nth-child(" + aryPos[3][1] + "):first").addClass(clsName);
}

function CheckOverlapValidation(container, aryPos) {
    return (!container.find("tr:nth-child(" + aryPos[0][0] + ") td:nth-child(" + aryPos[0][1] + "):first, tr:nth-child(" + aryPos[1][0] + ") td:nth-child(" + aryPos[1][1] + "):first, tr:nth-child(" + aryPos[2][0] + ") td:nth-child(" + aryPos[2][1] + "):first, tr:nth-child(" + aryPos[3][0] + ") td:nth-child(" + aryPos[3][1] + "):first").hasClass("clsSolid"));
}

var StickObject = function (xPos, yPos, angle, cntnr) {

    var self = this;
    var container = $(cntnr);

    this.xPos = xPos;
    this.yPos = yPos;
    this.angle = angle;

    this.draw = function () {

        switch (self.angle) {

            case 90:
            case 270:
                DrawObject(container, [[self.yPos, self.xPos], [self.yPos, self.xPos + 1], [self.yPos, self.xPos + 2], [self.yPos, self.xPos + 3]], "clsStick");
                break;
            case 180:
            case 0:
            default:
                DrawObject(container, [[self.yPos, self.xPos], [self.yPos + 1, self.xPos], [self.yPos + 2, self.xPos], [self.yPos + 3, self.xPos]], "clsStick");
                break;
        }

    };

    this.checkValidation = function (xPos, yPos, angle) {

        var xMin = 1, xMax = 10, yMin = 1, yMax = 15;
        var x = xPos, y = yPos, x1 = xPos, y1 = yPos;
        var isValid = true;

        switch (angle) {
            case 90:
            case 270:
                x1 = x1 + 3;
                isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos, xPos + 1], [yPos, xPos + 2], [yPos, xPos + 3]]);
                break;
            case 180:
            case 0:
            default:
                y1 = y1 + 3;
                isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos + 1, xPos], [yPos + 2, xPos], [yPos + 3, xPos]]);
                break;
        }

        return (x >= xMin && x1 >= xMin && x <= xMax && x1 <= xMax && y >= yMin && y1 >= yMin && y <= yMax && y1 <= yMax) && isValid;
    };

    this.moveLeft = function () {
        if (self.checkValidation(self.xPos - 1, self.yPos, self.angle)) {
            self.xPos--;
            self.draw();
        }
    };

    this.moveRight = function () {
        if (self.checkValidation(self.xPos + 1, self.yPos, self.angle)) {
            self.xPos++;
            self.draw();
        }
    };

    this.moveUp = function () {
        if (self.checkValidation(self.xPos, self.yPos - 1, self.angle)) {
            self.yPos--;
            self.draw();
        }
    };

    this.moveDown = function () {
        if (self.checkValidation(self.xPos, self.yPos + 1, self.angle)) {
            self.yPos++;
            self.draw();
        }
    };

    this.rotate = function () {

        var newAngle = (((self.angle + 90) / 90) % 4) * 90;

        if (self.checkValidation(self.xPos, self.yPos, newAngle)) {
            self.angle = newAngle;
            self.draw();
        }
    };

    self.draw();
};

var SquareObject = function (xPos, yPos, angle, cntnr) {

    var self = this;
    var container = $(cntnr);

    this.xPos = xPos;
    this.yPos = yPos;
    this.x1Pos = (xPos + 1);
    this.y1Pos = (yPos + 1);

    this.draw = function () {
        DrawObject(container, [[self.yPos, self.xPos], [self.yPos, self.x1Pos], [self.y1Pos, self.xPos], [self.y1Pos, self.x1Pos]], "clsSquare");
    };

    this.checkValidation = function (xPos, yPos) {

        var xMin = 1, xMax = 10, yMin = 1, yMax = 15;
        var isValid = true;

        var x = xPos, y = yPos, x1 = (xPos + 1), y1 = (yPos + 1);

        isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos, x1], [y1, xPos], [y1, x1]]);

        return (x >= xMin && x1 >= xMin && x <= xMax && x1 <= xMax && y >= yMin && y1 >= yMin && y <= yMax && y1 <= yMax) && isValid;
    };

    this.moveLeft = function () {
        if (self.checkValidation(self.xPos - 1, self.yPos)) {
            self.xPos--;
            self.x1Pos--;
            self.draw();
        }
    };

    this.moveRight = function () {
        if (self.checkValidation(self.xPos + 1, self.yPos)) {
            self.xPos++;
            self.x1Pos++;
            self.draw();
        }
    };

    this.moveUp = function () {
        if (self.checkValidation(self.xPos, self.yPos - 1)) {
            self.yPos--;
            self.y1Pos--;
            self.draw();
        }
    };

    this.moveDown = function () {
        if (self.checkValidation(self.xPos, self.yPos + 1)) {
            self.yPos++;
            self.y1Pos++;
            self.draw();
        }
    };

    this.rotate = function () { };

    self.draw();
};

var FixerObject = function (xPos, yPos, angle, cntnr) {
    var self = this;
    var container = $(cntnr);

    this.xPos = xPos;
    this.yPos = yPos;

    this.angle = angle;

    this.draw = function () {

        switch (self.angle) {

            case 90:
                DrawObject(container, [[self.yPos, self.xPos], [self.yPos + 1, self.xPos], [self.yPos + 2, self.xPos], [self.yPos + 1, self.xPos + 1]], "clsFixer");
                break;
            case 270:
                DrawObject(container, [[self.yPos, self.xPos], [self.yPos + 1, self.xPos], [self.yPos + 2, self.xPos], [self.yPos + 1, self.xPos - 1]], "clsFixer");
                break;
            case 180:
                DrawObject(container, [[self.yPos + 2, self.xPos], [self.yPos + 1, self.xPos], [self.yPos + 1, self.xPos - 1], [self.yPos + 1, self.xPos + 1]], "clsFixer");
                break;
            case 0:
            default:
                DrawObject(container, [[self.yPos, self.xPos], [self.yPos + 1, self.xPos], [self.yPos + 1, self.xPos - 1], [self.yPos + 1, self.xPos + 1]], "clsFixer");
                break;
        }

    };

    this.checkValidation = function (xPos, yPos, angle) {

        var xMin = 1, xMax = 10, yMin = 1, yMax = 15;
        var x = xPos, y = yPos, x1 = xPos, y1 = yPos;
        var isValid = true;

        switch (angle) {
            //horizontal
            case 90:
                x = xPos; x1 = xPos + 1; y = yPos; y1 = yPos + 2;
                isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos + 1, xPos], [yPos + 2, xPos], [yPos + 1, xPos + 1]]);
                break;
            case 270:
                x = xPos - 1; x1 = xPos; y = yPos; y1 = yPos + 2;
                isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos + 1, xPos], [yPos + 2, xPos], [yPos + 1, xPos - 1]]);
                break;
                //vertical
            case 180:
                x = xPos - 1; x1 = xPos + 1; y = yPos + 1; y1 = yPos + 2;
                isValid = CheckOverlapValidation(container, [[yPos + 2, xPos], [yPos + 1, xPos], [yPos + 1, xPos - 1], [yPos + 1, xPos + 1]]);
                break;
            case 0:
            default:
                x = xPos - 1; x1 = xPos + 1; y = yPos; y1 = yPos + 1;
                isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos + 1, xPos], [yPos + 1, xPos - 1], [yPos + 1, xPos + 1]]);
                break;
        }

        return (x >= xMin && x1 >= xMin && x <= xMax && x1 <= xMax && y >= yMin && y1 >= yMin && y <= yMax && y1 <= yMax) && isValid;
    };

    this.moveLeft = function () {
        if (self.checkValidation(self.xPos - 1, self.yPos, self.angle)) {
            self.xPos--;
            self.draw();
        }
    };

    this.moveRight = function () {
        if (self.checkValidation(self.xPos + 1, self.yPos, self.angle)) {
            self.xPos++;
            self.draw();
        }
    };

    this.moveUp = function () {
        if (self.checkValidation(self.xPos, self.yPos - 1, self.angle)) {
            self.yPos--;
            self.draw();
        }
    };

    this.moveDown = function () {
        if (self.checkValidation(self.xPos, self.yPos + 1, self.angle)) {
            self.yPos++;
            self.draw();
        }
    };

    this.rotate = function () {

        var newAngle = (((self.angle + 90) / 90) % 4) * 90;

        if (self.checkValidation(self.xPos, self.yPos, newAngle)) {
            self.angle = newAngle;
            self.draw();
        }
    };

    self.draw();
};

var MedFixerObject = function (xPos, yPos, angle, cntnr) {
    var self = this;
    var container = $(cntnr);

    this.xPos = xPos;
    this.yPos = yPos;

    this.angle = angle;

    this.draw = function () {

        switch (self.angle) {

            case 90:
            case 270:
                DrawObject(container, [[self.yPos, self.xPos], [self.yPos + 1, self.xPos], [self.yPos + 1, self.xPos - 1], [self.yPos + 2, self.xPos - 1]], "clsMedFixer");
                break;
            case 180:
            case 0:
            default:
                DrawObject(container, [[self.yPos, self.xPos], [self.yPos, self.xPos - 1], [self.yPos + 1, self.xPos], [self.yPos + 1, self.xPos + 1]], "clsMedFixer");
                break;
        }

    };

    this.checkValidation = function (xPos, yPos, angle) {

        var xMin = 1, xMax = 10, yMin = 1, yMax = 15;
        var x = xPos, y = yPos, x1 = xPos, y1 = yPos;
        var isValid = true;

        switch (angle) {
            //horizontal
            case 90:
            case 270:
                x = xPos - 1; x1 = xPos; y = yPos; y1 = yPos + 2;
                isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos + 1, xPos], [yPos + 1, xPos - 1], [yPos + 2, xPos - 1]]);
                break;
                //vertical
            case 180:
            case 0:
            default:
                x = xPos - 1; x1 = xPos + 1; y = yPos; y1 = yPos + 1;
                isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos, xPos - 1], [yPos + 1, xPos], [yPos + 1, xPos + 1]]);
                break;
        }

        return (x >= xMin && x1 >= xMin && x <= xMax && x1 <= xMax && y >= yMin && y1 >= yMin && y <= yMax && y1 <= yMax) && isValid;
    };

    this.moveLeft = function () {
        if (self.checkValidation(self.xPos - 1, self.yPos, self.angle)) {
            self.xPos--;
            self.draw();
        }
    };

    this.moveRight = function () {
        if (self.checkValidation(self.xPos + 1, self.yPos, self.angle)) {
            self.xPos++;
            self.draw();
        }
    };

    this.moveUp = function () {
        if (self.checkValidation(self.xPos, self.yPos - 1, self.angle)) {
            self.yPos--;
            self.draw();
        }
    };

    this.moveDown = function () {
        if (self.checkValidation(self.xPos, self.yPos + 1, self.angle)) {
            self.yPos++;
            self.draw();
        }
    };

    this.rotate = function () {

        var newAngle = (((self.angle + 90) / 90) % 4) * 90;

        if (self.checkValidation(self.xPos, self.yPos, newAngle)) {
            self.angle = newAngle;
            self.draw();
        }
    };

    self.draw();
};

var MedRevFixerObject = function (xPos, yPos, angle, cntnr) {
    var self = this;
    var container = $(cntnr);

    this.xPos = xPos;
    this.yPos = yPos;

    this.angle = angle;

    this.draw = function () {

        switch (self.angle) {

            case 90:
            case 270:
                DrawObject(container, [[self.yPos, self.xPos], [self.yPos + 1, self.xPos], [self.yPos, self.xPos - 1], [self.yPos - 1, self.xPos - 1]], "clsMedRevFixer");
                break;
            case 180:
            case 0:
            default:
                DrawObject(container, [[self.yPos, self.xPos], [self.yPos, self.xPos + 1], [self.yPos + 1, self.xPos], [self.yPos + 1, self.xPos - 1]], "clsMedRevFixer");
                break;
        }

    };

    this.checkValidation = function (xPos, yPos, angle) {

        var xMin = 1, xMax = 10, yMin = 1, yMax = 15;
        var x = xPos, y = yPos, x1 = xPos, y1 = yPos;
        var isValid = true;

        switch (angle) {
            //horizontal
            case 90:
            case 270:
                x = xPos - 1; x1 = xPos; y = yPos - 1; y1 = yPos + 1;
                isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos + 1, xPos], [yPos, xPos - 1], [yPos - 1, xPos - 1]]);
                break;
                //vertical
            case 180:
            case 0:
            default:
                x = xPos - 1; x1 = xPos + 1; y = yPos; y1 = yPos + 1;
                isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos, xPos + 1], [yPos + 1, xPos], [yPos + 1, xPos - 1]]);
                break;
        }

        return (x >= xMin && x1 >= xMin && x <= xMax && x1 <= xMax && y >= yMin && y1 >= yMin && y <= yMax && y1 <= yMax) && isValid;
    };

    this.moveLeft = function () {
        if (self.checkValidation(self.xPos - 1, self.yPos, self.angle)) {
            self.xPos--;
            self.draw();
        }
    };

    this.moveRight = function () {
        if (self.checkValidation(self.xPos + 1, self.yPos, self.angle)) {
            self.xPos++;
            self.draw();
        }
    };

    this.moveUp = function () {
        if (self.checkValidation(self.xPos, self.yPos - 1, self.angle)) {
            self.yPos--;
            self.draw();
        }
    };

    this.moveDown = function () {
        if (self.checkValidation(self.xPos, self.yPos + 1, self.angle)) {
            self.yPos++;
            self.draw();
        }
    };

    this.rotate = function () {

        var newAngle = (((self.angle + 90) / 90) % 4) * 90;

        if (self.checkValidation(self.xPos, self.yPos, newAngle)) {
            self.angle = newAngle;
            self.draw();
        }
    };

    self.draw();
};

var LongFixerObject = function (xPos, yPos, angle, cntnr) {
    var self = this;
    var container = $(cntnr);

    this.xPos = xPos;
    this.yPos = yPos;

    this.angle = angle;

    this.draw = function () {

        switch (self.angle) {

            case 90:
                DrawObject(container, [[self.yPos, self.xPos], [self.yPos + 1, self.xPos], [self.yPos + 2, self.xPos], [self.yPos, self.xPos + 1]], "clsLongFixer");
                break;
            case 180:
                DrawObject(container, [[self.yPos, self.xPos], [self.yPos, self.xPos + 1], [self.yPos, self.xPos - 1], [self.yPos + 1, self.xPos + 1]], "clsLongFixer");
                break;
            case 270:
                DrawObject(container, [[self.yPos, self.xPos + 1], [self.yPos - 1, self.xPos + 1], [self.yPos + 1, self.xPos + 1], [self.yPos + 1, self.xPos]], "clsLongFixer");
                break;
            case 0:
            default:
                DrawObject(container, [[self.yPos, self.xPos], [self.yPos + 1, self.xPos], [self.yPos + 1, self.xPos + 1], [self.yPos + 1, self.xPos + 2]], "clsLongFixer");
                break;
        }

    };

    this.checkValidation = function (xPos, yPos, angle) {

        var xMin = 1, xMax = 10, yMin = 1, yMax = 15;

        var x = xPos, y = yPos, x1 = xPos, y1 = yPos;
        var isValid = true;

        switch (angle) {
            case 90:
                x = xPos; x1 = xPos + 1; y = yPos; y1 = yPos + 2;
                isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos + 1, xPos], [yPos + 2, xPos], [yPos, xPos + 1]]);
                break;
            case 180:
                x = xPos - 1; x1 = xPos + 1; y = yPos; y1 = yPos + 1;
                isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos, xPos + 1], [yPos, xPos - 1], [yPos + 1, xPos + 1]]);
                break;
            case 270:
                x = xPos; x1 = xPos + 1; y = yPos - 1; y1 = yPos + 1;
                isValid = CheckOverlapValidation(container, [[yPos, xPos + 1], [yPos - 1, xPos + 1], [yPos + 1, xPos + 1], [yPos + 1, xPos]]);
                break;
            case 0:
            default:
                x = xPos; x1 = xPos + 2; y = yPos; y1 = yPos + 1;
                isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos + 1, xPos], [yPos + 1, xPos + 1], [yPos + 1, xPos + 2]]);
                break;
        }

        return (x >= xMin && x1 >= xMin && x <= xMax && x1 <= xMax && y >= yMin && y1 >= yMin && y <= yMax && y1 <= yMax) && isValid;
    };

    this.moveLeft = function () {
        if (self.checkValidation(self.xPos - 1, self.yPos, self.angle)) {
            self.xPos--;
            self.draw();
        }
    };

    this.moveRight = function () {
        if (self.checkValidation(self.xPos + 1, self.yPos, self.angle)) {
            self.xPos++;
            self.draw();
        }
    };

    this.moveUp = function () {
        if (self.checkValidation(self.xPos, self.yPos - 1, self.angle)) {
            self.yPos--;
            self.draw();
        }
    };

    this.moveDown = function () {
        if (self.checkValidation(self.xPos, self.yPos + 1, self.angle)) {
            self.yPos++;
            self.draw();
        }
    };

    this.rotate = function () {

        var newAngle = (((self.angle + 90) / 90) % 4) * 90;

        if (self.checkValidation(self.xPos, self.yPos, newAngle)) {
            self.angle = newAngle;
            self.draw();
        }
    };

    self.draw();
};

var LongRevFixerObject = function (xPos, yPos, angle, cntnr) {
    var self = this;
    var container = $(cntnr);

    this.xPos = xPos;
    this.yPos = yPos;

    this.angle = angle;

    this.draw = function () {

        switch (self.angle) {
            case 90:
                DrawObject(container, [[self.yPos + 1, self.xPos], [self.yPos + 1, self.xPos - 1], [self.yPos, self.xPos - 1], [self.yPos - 1, self.xPos - 1]], "clsLongRevFixer");
                break;
            case 180:
                DrawObject(container, [[self.yPos, self.xPos], [self.yPos, self.xPos + 1], [self.yPos, self.xPos - 1], [self.yPos + 1, self.xPos - 1]], "clsLongRevFixer");
                break;
            case 270:
                DrawObject(container, [[self.yPos, self.xPos], [self.yPos, self.xPos - 1], [self.yPos + 1, self.xPos], [self.yPos + 2, self.xPos]], "clsLongRevFixer");
                break;
            case 0:
            default:
                DrawObject(container, [[self.yPos, self.xPos], [self.yPos + 1, self.xPos], [self.yPos + 1, self.xPos - 1], [self.yPos + 1, self.xPos - 2]], "clsLongRevFixer");
                break;
        }

    };

    this.checkValidation = function (xPos, yPos, angle) {

        var xMin = 1, xMax = 10, yMin = 1, yMax = 15;

        var x = xPos, y = yPos, x1 = xPos, y1 = yPos;
        var isValid = true;

        switch (angle) {
            case 90:
                x = xPos - 1; x1 = xPos; y = yPos - 1; y1 = yPos + 1;
                isValid = CheckOverlapValidation(container, [[yPos + 1, xPos], [yPos + 1, xPos - 1], [yPos, xPos - 1], [yPos - 1, xPos - 1]]);
                break;
            case 180:
                x = xPos - 1; x1 = xPos + 1; y = yPos; y1 = yPos + 1;
                isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos, xPos + 1], [yPos, xPos - 1], [yPos + 1, xPos - 1]]);
                break;
            case 270:
                x = xPos - 1; x1 = xPos; y = yPos; y1 = yPos + 2;
                isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos, xPos - 1], [yPos + 1, xPos], [yPos + 2, xPos]]);
                break;
            case 0:
            default:
                x = xPos - 2; x1 = xPos; y = yPos; y1 = yPos + 1;
                isValid = CheckOverlapValidation(container, [[yPos, xPos], [yPos + 1, xPos], [yPos + 1, xPos - 1], [yPos + 1, xPos - 2]]);
                break;
        }

        return (x >= xMin && x1 >= xMin && x <= xMax && x1 <= xMax && y >= yMin && y1 >= yMin && y <= yMax && y1 <= yMax) && isValid;
    };

    this.moveLeft = function () {
        if (self.checkValidation(self.xPos - 1, self.yPos, self.angle)) {
            self.xPos--;
            self.draw();
        }
    };

    this.moveRight = function () {
        if (self.checkValidation(self.xPos + 1, self.yPos, self.angle)) {
            self.xPos++;
            self.draw();
        }
    };

    this.moveUp = function () {
        if (self.checkValidation(self.xPos, self.yPos - 1, self.angle)) {
            self.yPos--;
            self.draw();
        }
    };

    this.moveDown = function () {
        if (self.checkValidation(self.xPos, self.yPos + 1, self.angle)) {
            self.yPos++;
            self.draw();
        }
    };

    this.rotate = function () {

        var newAngle = (((self.angle + 90) / 90) % 4) * 90;

        if (self.checkValidation(self.xPos, self.yPos, newAngle)) {
            self.angle = newAngle;
            self.draw();
        }
    };

    self.draw();
};

var ScriptShapes = function (shape, xPos, yPos, angle, cntnr) {

    var self = this;

    switch (shape) {

        case "stick":
            return new StickObject(xPos, yPos, angle, cntnr);
            break;

        case "square":
            return new SquareObject(xPos, yPos, angle, cntnr);
            break;

        case "fixer":
            return new FixerObject(xPos, yPos, angle, cntnr);
            break;

        case "medFixer":
            return new MedFixerObject(xPos, yPos, angle, cntnr);
            break;

        case "medRevFixer":
            return new MedRevFixerObject(xPos, yPos, angle, cntnr);
            break;

        case "longFixer":
            return new LongFixerObject(xPos, yPos, angle, cntnr);
            break;

        case "longRevFixer":
            return new LongRevFixerObject(xPos, yPos, angle, cntnr)
            break;
    }

};
