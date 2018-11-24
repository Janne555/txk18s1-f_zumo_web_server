<?php
    header('Content-type: application/json');
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
            $result = $conn->query("SELECT * FROM zumo.gyro ORDER BY id DESC LIMIT 1");
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            print json_encode($rows);
            break;
        case "acc":
            $result = $conn->query("SELECT * FROM zumo.acc ORDER BY id DESC LIMIT 1");
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            print json_encode($rows);
            break;
        case "line":
            $result = $conn->query("SELECT * FROM zumo.line ORDER BY id DESC LIMIT 1");
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            print json_encode($rows);
            break;
        case "log":
            $result = $conn->query("SELECT * FROM zumo.log ORDER BY id DESC LIMIT 10");
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            print json_encode($rows);
            break;
        case "gyro_latest":
            $result = $conn->query("SELECT * FROM zumo.gyro ORDER BY id DESC LIMIT 15");
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            print json_encode($rows);
            break;
        case "acc_latest":
            $result = $conn->query("SELECT * FROM zumo.acc ORDER BY id DESC LIMIT 15");
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            print json_encode($rows);
            break;
        case "line_latest":
            $result = $conn->query("SELECT * FROM zumo.line ORDER BY id DESC LIMIT 60");
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            print json_encode($rows);
            break;
        default:
            echo "unrecognized";
    }

?>