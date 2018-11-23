<!DOCTYPE html>
<html>
<body>
    <?php
    $servername = "localhost";
    $username = "dbuser";
    $password = "salis";
    $dbname = "zumo";
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("connection failed: " . $conn->connect_error);
    }

    $type = $_GET["type"];
    switch ($type) {
        case "gyro":
            $result = $conn->query("SELECT * FROM zumo.gyro");
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            print json_encode($rows);
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