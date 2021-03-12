<?php
$shortest = 0;
$matrix = json_decode($_POST['matrix'], true);
$size = $_POST['size'];
for($k = 0; $k < $size; $k++){
    for($i = 0; $i < $size; $i++){
        for($j = 0; $j < $size; $j++){
            if($i != $j && $matrix[$i][$k] != 0 && $matrix[$k][$j] != 0){
                if($matrix[$i][$j] == 0){
                    $matrix[$i][$j] = $matrix[$i][$k] + $matrix[$k][$j];
                } else{
                    $matrix[$i][$j] = min($matrix[$i][$j], $matrix[$i][$k] + $matrix[$k][$j]);
                }
            }
        }
    }
}
for($i = 0; $i < $size; $i++){
    for($j = 0; $j < $size; $j++){
        if($matrix[$i][$j] > 0 || $i == $j){
            $matrix[$i][$j] = 1;
        } else{
            $matrix[$i][$j] = 0;
        }
    }
}
for($i = 0; $i < $size; $i++){
    $matrix[$i][$i] = 1;
}
echo json_encode($matrix);
?>