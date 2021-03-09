function check(){
    var matrix = [], lowFlag, highFlag = false, summ = false;
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
                if (isNaN(matrix[i][j]) || matrix[i][j] < 0 || matrix[i][j] > 1){
                    alert ("Ошибка во вводе: матрица не является бинарной, обратите внимание на " + (+j + 1) + " элемент " + (+i + 1) + " строки");
                    return false;
                }
            }
        }
        for (var i = 0; i < matrix.length; i++){
            summ = 0;
            for (var j = 0; j < matrix[i].length; j++){
                summ+= +matrix[i][j];
            }
            if (summ == 0){
                lowFlag = true;
            }
            if (summ > 1){
                highFlag = true;
            }
        }
        if (lowFlag && highFlag){
            document.getElementById('result').innerHTML = "Отношение не является функцией так как есть элементы первого множества, которым сопоставлено больше одного элемента из второго, а также элементы первого множества, которым не сопоставлено ни одного элемента из второго.";
            return false;
        }
        if (lowFlag){
            document.getElementById('result').innerHTML = "Отношение не является функцией так как есть элементы первого множества, которым не сопоставлено ни одного элемента из второго.";
            return false;
        }
        if (highFlag){
            document.getElementById('result').innerHTML = "Отношение не является функцией так как есть элементы первого множества, которым сопоставлено больше одного элемента из второго.";
            return false;
        }
        document.getElementById('result').innerHTML = "Отношение является функцией.";
        return false;
    }
    document.getElementById('result').innerHTML = "Вы ничего не ввели";
    return false;
}