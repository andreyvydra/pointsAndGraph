import * as constants from './constants'
import WarningNotify from "./notifications/warningNotify"
import errorNotifies from "./error"
import * as graph from './graph'
import $ from "jquery";

class App {
    form = document.getElementById("form");

    xInputs = document.getElementsByName("x");
    yInput = document.getElementById("y-input");
    rInput = document.getElementById("r-input");
    tableBody = document.getElementById("table-body");
    clearButton = document.getElementsByClassName("clear-table-button")[0]

    xValues = [];
    yValue = null;
    rValue = null;

    constructor() {
        this.init();
    }

    init() {
        this.initEventListeners()
        let formData = JSON.parse(window.sessionStorage.getItem("formData")) ?? {};
        this.initX(formData["xValues"] ?? []);
        this.initY(formData["yValue"])
        this.initR(formData["rValue"]);
        this.addPoints();
    }

    addPoints() {
        for (let i of this.tableBody.children) {
            this.addPoint(parseFloat(i.children[0].innerText), parseFloat(i.children[1].innerText));
        }
    }

    addPoint(x, y) {
        graph.addPoint(x, y);
    }

    initEventListeners() {
        this.form.addEventListener("submit", this.addNewPointForm.bind(this));
        this.clearButton.addEventListener("click", this.clearTable.bind(this));

        for (let x = 0; x < this.xInputs.length; x++) {
            this.xInputs[x].addEventListener("click", this.changeX.bind(this));
        }

        this.yInput.addEventListener("input", this.changeY.bind(this));
        this.rInput.addEventListener("input", this.changeR.bind(this));
        graph.canvas.addEventListener("click", this.sendPoint.bind(this));

    }

    sendPoint(event) {
        try {
            this.checkR(parseFloat(this.rValue));
            let x = -6 + event.layerX / 25;
            x = x.toFixed(6);
            let y = 6 - event.layerY / 25;
            y = y.toFixed(6);
            $.ajax("app", {
                type: "GET",
                data: {
                    "action": "click",
                    "parsedX": x,
                    "parsedY": y,
                    "parsedR": this.rValue.replace(",", ".")
                },
                success: (response) => {
                    let json = JSON.parse(response);
                    for (let i = 0; i < json.length; i++) {
                        this.addToBodyTable(json[i]);
                        this.addPoint(json[i][constants.xField], json[i][constants.yField]);
                    }
                },
                error: (xhr, ajaxOptions, thrownError) => {
                    errorNotifies(xhr);
                }
            })
        } catch (err) {
            new WarningNotify("Поле R", "Поле R некорректно");
        }
    }

    initX(xValues) {
        this.xValues = xValues;
        let nxs = [];
        let flag = false;
        for (let x = 0; x < this.xInputs.length; x++) {
            if (this.xValues.includes(this.xInputs[x].value)) {
                this.xInputs[x].checked = true;
                nxs.push(this.xInputs[x].value);
                flag = true;
            }
        }
        this.xValues = nxs;
        if (!flag) {
            this.xInputs[0].checked = true;
            this.xValues.push(this.xInputs[0].value);
        }
    }

    initY(yValue) {
        this.yValue = yValue;
        if (yValue != null) {
            this.yInput.value = this.yValue;
            return;
        }
        this.yValue = "1";
        this.yInput.value = "1";
    }

    setCustomErrorMessageY() {
        if (this.yInput.valid){
            this.yInput.setCustomValidity("");
        } else {
            this.yInput.setCustomValidity("Введите число с точностью до 6 знаков после запятой");
        }
    }

    initR(rValue) {
        this.rValue = rValue;
        if (rValue != null) {
            this.rInput.value = this.rValue;
            graph.updateGraph(parseFloat(this.rValue));
            return;
        }
        this.rValue = "2";
        this.rInput.value = "2";
        graph.updateGraph(2)
    }

    changeX(event) {
        if (this.xValues.indexOf(event.currentTarget.value) === -1) {
            this.xValues.push(event.currentTarget.value);
        } else {
            this.xValues.splice(this.xValues.indexOf(event.currentTarget.value), 1);
        }
        let formData = JSON.parse(window.sessionStorage.getItem("formData")) ?? {};
        formData["xValues"] = this.xValues;
        window.sessionStorage.setItem("formData", JSON.stringify(formData));
    }

    changeY(event) {
        this.yValue = event.currentTarget.value;
        let formData = JSON.parse(window.sessionStorage.getItem("formData")) ?? {};
        formData["yValue"] = this.yValue;
        window.sessionStorage.setItem("formData", JSON.stringify(formData));
    }

    changeR(event) {
        this.rValue = event.currentTarget.value;
        let formData = JSON.parse(window.sessionStorage.getItem("formData")) ?? {};
        formData["rValue"] = this.rValue;
        window.sessionStorage.setItem("formData", JSON.stringify(formData));
        graph.updateGraph(parseFloat(this.rValue));
        try {
            this.checkR(parseFloat(this.rValue));
            console.log(parseFloat(this.rValue));
            this.addPoints();
        } catch (err) {}
    }

    addNewPointForm(event) {
        event.preventDefault();
        try {
            let x = this.xValues;
            let y = this.yValue;
            let r = this.rValue;
            const params = this.parseAndValidate(x, y, r);
            this.doRequest(params);
        } catch (err) {
            new WarningNotify("Ошибка валидации", err.message);
        }
    }

    clearTable(event) {
        $.ajax("app", {
           type: "GET",
           data: {
                "action": "clear"
           },
           success: (response) => {
                let json = JSON.parse(response);
                if (json["result"] == "cleaned") {
                    this.tableBody.innerHTML = "";
                    graph.updateGraph(parseFloat(this.rValue));
                }
           },
           error: (xhr, ajaxOptions, thrownError) => {
               errorNotifies(xhr);
           }
       });
    }

    doRequest(params) {
        let path = window.location.href + "/app?action=form&parsedX=";
        path += params[0].join(';')
        window.location.href = path + "&parsedY=" + params[1] + "&parsedR=" + params[2];
    }

    parseAndValidate(xs, y, r) {
        let pxs = []
        if (xs.length == 0) {
            throw new Error("X не выбран.");
        }
        for (let i = 0; i < xs.length; i++) {
            const px = parseFloat(xs[i]);
            pxs.push(px);
            if (px == null || px != xs[i] || !constants.xValues.includes(px)) {
                throw new Error("X не был выбран или не лежит в диапазоне допустимых значений.");
            }
        }
        y = y.replace(",", ".");
        let ny = y.substring(0, y.indexOf(".") + 6);
        const py = parseFloat(ny);
        this.checkY(py);

        r = r.replace(",", ".");
        let nr = r.substring(0, r.indexOf(".") + 6);
        const pr = parseFloat(nr);
        this.checkR(pr);
        return [pxs, y, r];
    }

    checkY(y) {
        if (y == null || isNaN(y) || y <= constants.yMin || y >= constants.yMax) {
            throw new Error("Y не введён или не лежит в диапазоне допустимых значений (-5, 3).");
        }
    }

    checkR(r) {
        if (r == null || isNaN(r) || r <= constants.rMin || r >= constants.rMax) {
            throw new Error("R не введён или не лежит в диапазоне допустимых значений (1, 4).");
        }
    }

    addToBodyTable(values) {
        this.tableBody.insertAdjacentHTML(
            'afterbegin',
            "<tr><td>" + values[constants.xField] +
            "</td><td>" + values[constants.yField] +
            "</td><td>" + values[constants.rField] +
            "</td><td>" + values[constants.inAreaField] +
            "</td><td>" + values[constants.calcTimeField] +
            "</td><td>" + values[constants.dateTimeField] + "</td></tr>"
        );
    }
}

export const app = new App();
