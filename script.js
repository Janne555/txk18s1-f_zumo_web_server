fetch("./connection.php?type=gyro")
.then(
    function(reply) {
        return reply.json();
    }
)
.then(function (json) {
    console.log(json);
})
.catch(function(error) {
    console.log(error);
})