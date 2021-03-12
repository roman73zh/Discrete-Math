<?php
$shortest = 0;
$matrix = json_decode($_POST['matrix'], true);
$from = $_POST['from'];
$to = $_POST['to'];
$size = $_POST['size'];
for($i = 0; $i < $size; $i++){
    for($j = 0; $j < $size; $j++){
        $result[$i][$j] = ($i + 1)." ";
    }
}
for($k = 0; $k < $size; $k++){
    for($i = 0; $i < $size; $i++){
        for($j = 0; $j < $size; $j++){
            if($i != $j && $matrix[$i][$k] != 0 && $matrix[$k][$j] != 0){
                if($matrix[$i][$j] == 0){
                    $matrix[$i][$j] = $matrix[$i][$k] + $matrix[$k][$j];
                    $result[$i][$j] = " ".$result[$i][$k]." ".$result[$k][$j];
                } else{
                    $matrix[$i][$j] = min($matrix[$i][$j], $matrix[$i][$k] + $matrix[$k][$j]);
                    if($matrix[$i][$j] < $matrix[$i][$k] + $matrix[$k][$j]){
                        $result[$i][$j] = " ".$result[$i][$j];
                    } else {
                        $result[$i][$j] = " ".$result[$i][$k]." ".$result[$k][$j];
                    }
                }
            }
        }
    }
}
$shortest = $matrix[$from - 1][$to - 1];
$short = $result[$from - 1][$to - 1].$to;
if($shortest > 0){
    echo "Длина кратчайшего пути: ".$shortest." (путь через вершины ".$short.")";
} else{
    echo "Пути нет";
}
?>