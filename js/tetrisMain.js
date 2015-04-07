
var ScriptNavigator = function (oShape) {

    var self = this;

    this.initializePlugin = function () {

        document.onkeydown = function (event) {
            if (!event)
                event = window.event;
            var code = event.keyCode;
            if (event.charCode && code == 0)
                code = event.charCode;
            switch (code) {
                //left
                case 37:

                    $("#aLeft").addClass("leftbuttonSelect");
                    oShape.moveLeft();
                    break;

                    //up
                    //case 38:
                    //    oShape.moveUp();
                    //    break;

                    //right
                case 39:
                    $("#aRight").addClass("leftbuttonSelect");
                    oShape.moveRight();
                    break;

                    //down
                case 40:
                    $("#aDown").addClass("leftbuttonSelect");
                    oShape.moveDown();
                    break;

                    //enter
                case 13:
                    $("#aEnter").addClass("enterbuttonSelect");
                    oShape.rotate()
                    break;
            }
            event.preventDefault();
        };

        document.onkeyup = function (event) {
            $("#divNavigation a").removeClass("leftbuttonSelect enterbuttonSelect");
        }

        //$("#divNavigation a").mousedown(
        //    function () {
        //        switch ($(this).attr("id")) {

        //            case "aLeft":
        //                $("#aLeft").addClass("leftbuttonSelect");
        //                oShape.moveLeft();
        //                break;

        //            case "aDown":
        //                $("#aDown").addClass("leftbuttonSelect");
        //                oShape.moveDown();
        //                break;

        //            case "aRight":
        //                $("#aRight").addClass("leftbuttonSelect");
        //                oShape.moveRight();
        //                break;

        //            case "aEnter":
        //                $("#aEnter").addClass("enterbuttonSelect");
        //                oShape.rotate()
        //                break;

        //        }
        //    }
        //);

        //$("#divNavigation a").mouseup(function () {
        //    $("#divNavigation a").removeClass("leftbuttonSelect enterbuttonSelect");
        //});

    };

    self.initializePlugin();

};

var ScriptGamer = function () {

    var self = this;
    var container = document.getElementById('tblMain');
    var oShapeArray = ["stick", "square", "fixer", "medFixer", "medRevFixer", "longFixer", "longRevFixer"];
    var oAngleArray = [0, 90, 180, 270];
    var scoreContainer = $("#spnScore");
    var iScore = 0;


    var oScriptNavigator, oShape, oTimer, cShape, iAngle;

    this.start = function () {

        oShape = self.getRandomShapeObject();
        oScriptNavigator = new ScriptNavigator(oShape);

        oTimer = setInterval(self.gameInterval, 1000);
    };

    this.gameInterval = function () {

        if (self.checkObjectFixed()) {

            //check game over
            if ($(container.rows[0].cells).hasClass("clsSolid")) {
                self.gameOver();
                return;
            }

            //tblNext

            oShape = self.getRandomShapeObject();
            oScriptNavigator = new ScriptNavigator(oShape);
        }
        else {
            oShape.moveDown();
        }

    };

    this.checkObjectFixed = function () {

        var oObjectPos = $(".clsStick,.clsSquare,.clsFixer,.clsMedFixer,.clsMedRevFixer,.clsLongFixer,.clsLongRevFixer");

        var isPosFixed = false;

        //Check validation
        for (var i = 0; i < oObjectPos.length; i++) {

            var column = $(oObjectPos[i]).parent().children().index(oObjectPos[i]);
            var row = $(oObjectPos[i]).parent().parent().children().index(oObjectPos[i].parentNode);

            if (container.rows.length == (row + 1) || $(container.rows[row + 1].cells[column]).hasClass("clsSolid")) {
                isPosFixed = true;
            }
        }

        //Fix position
        if (isPosFixed == true) {
            for (var i = 0; i < oObjectPos.length; i++) {
                $(oObjectPos[i]).attr("class", "clsSolid");
            }

            self.checkUpdateScore();
        }

        return isPosFixed;
    }

    this.checkUpdateScore = function () {

        var totalCells = container.rows[0].cells.length;
        var DelRow = [];

        for (var i = 0; i < container.rows.length; i++) {

            if ($(container.rows[i].cells).filter(function () { return $(this).hasClass("clsSolid"); }).length == totalCells) {

                iScore++;
                scoreContainer.html(iScore * 10);

                $(container.rows[i]).remove();
                $(container).prepend("<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>");

                i = 0;
            }

        }

        return;

    };

    this.gameOver = function () {

        //Clears game interval
        clearInterval(oTimer);
        isGameOver = true;

        $("#divGameOver").show().addClass("blink");


    };

    this.getRandomShapeObject = function () {

        oShapeDisplayArray[0] = oShapeDisplayArray[1];
        oShapeDisplayArray[1] = [self.getRandomNumber(7), self.getRandomNumber(4)];

        cShape = oShapeArray[oShapeDisplayArray[0][0]];
        iAngle = oAngleArray[oShapeDisplayArray[0][1]];

        self.drawNextObject();

        return new ScriptShapes(cShape, 5, 1, iAngle, "#tblMain");
    }

    this.getRandomNumber = function (seed) {
        return Math.floor(Math.random() * 10) % seed;
    }

    this.drawNextObject = function () {

        $("#tblNext td").attr("class", '');

        return new ScriptShapes(oShapeArray[oShapeDisplayArray[1][0]], 3, 2, oAngleArray[oShapeDisplayArray[0][1]], "#tblNext");

    };

    var oShapeDisplayArray = [[self.getRandomNumber(7), self.getRandomNumber(4)], [self.getRandomNumber(7), self.getRandomNumber(4)]];


};