<!DOCTYPE html>
<html>
<body>
    <?php
    $type = $_GET["type"];
    switch ($type) {
        case "gyro":
            echo "selected gyro";
            break;
        case "acc":
            echo "selected accelerometer";
            break;
        case "line":
            echo "selected line sensor";
            break;
        default:
            echo "unrecognized";
    }

    ?>
</body>
</html>