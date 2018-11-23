<!DOCTYPE html>
<html>
<body>
<h1>connect</h1>
    <?php
    echo "trying to connect";
    $servername = "localhost";
    $username = "dbuser";
    $password = "salis";

    $conn = new mysqli($servername, $username, $password);

    if ($conn->connect_error) {
	echo "connection failed";
        die("connection failed: " . $conn->connect_error);
    }
    echo "Connected succesfully";

    $result = $conn->query("SELECT * FROM zumo.gyro");
    while ($row = $result->fetch_assoc()) {
        echo $row["timestamp"];
    }
    ?>
</body>
</html>
