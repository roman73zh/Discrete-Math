var redraw;
var height = 400;
var width = 600;

function build() {
    
    $("#paper").empty();
    var matrix = [];
    var g = new Graph();
    matrix = document.getElementById('elements').value;
    if (matrix.length > 0){
        matrix = matrix.split('\n');
        for (var i = 0; i < matrix.length; i++){
            matrix[i] = matrix[i].split(' ');
        }
        for (var i = 0; i < matrix.length; i++){
            if (matrix[i].length != matrix[0].length){
                alert ("Ошибка во вводе: количество элементов " + (+i + 1) + " строки отлично от первой");
                return false;
            }
            for (var j = 0; j < matrix[i].length; j++){
                if (isNaN(matrix[i][j])){
                    alert ("Ошибка во вводе: матрица содержит недопустимые символы, обратите внимание на " + (+j + 1) + " элемент " + (+i + 1) + " строки");
                    return false;
                }
            }
        }
        if (matrix[0].length != matrix.length){
            alert ("Ошибка во вводе: количество строк и столбцов различно" + matrix[0].length);
            return false;
        }
    }
    for (var i = 0; i < matrix.length; i++){
        g.addNode("id" + i, { label: "Вершина " + (i + 1) });
    }
    var dir = false, forward = 0, backward = 0;
    for (var i = 0; i < matrix.length; i++){
        for (var j = 0; j < i; j++){
            forward = +matrix[i][j];
            backward = +matrix[j][i];
            if (!((forward == 0 && backward == 0)||(i == j))){
                if (forward > 0 && backward > 0){
                    g.addEdge("id" + i, "id" + j, {directed: false, stroke: "#fff", fill: "#5a5"});
                } else if (forward > backward){
                    g.addEdge("id" + i, "id" + j, {directed: true, stroke: "#fff", fill: "#5a5"});
                } else {
                    g.addEdge("id" + j, "id" + i, {directed: true, stroke: "#fff", fill: "#5a5"});
                }
            }
        }
    }
    var layouter = new Graph.Layout.Spring(g);
    layouter.layout();
    var renderer = new Graph.Renderer.Raphael('paper', g, width, height);
    renderer.draw();

    
    
    const matrixToSend = JSON.stringify(matrix);
    (async () => {
    let answer = await fetch('api.php',{
      method: 'POST',
      headers: {'Content-type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
      body: 'matrix=' + matrixToSend + "&size=" + matrix.length
    }),
    data = await answer.text();
    data = JSON.parse(data);
    result = "";
    for(var i = 0; i < data.length; i++){
        for(var j = 0; j < data.length; j++){
            result+= data[i][j] + "   ";
        }
        result+= "\n";
    }
    document.getElementById('result').innerHTML = result;
    console.log(data);
    })();
}