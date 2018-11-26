const log_list = document.getElementById("log_list");
var latestLogId = -1;

function fetchLog() {
    fetch("./connection.php?type=log")
    .then(
        function(reply) {
            return reply.json();
        }
    )
    .then(function (jsonArr) {
        if (jsonArr.length == 0) {
            return;
        }
        if (latestLogId != jsonArr[0].id) {
            jsonArr.reverse().forEach((a, i) => {
                if (a.id >= latestLogId) {
                    let message = a.message.split(" ");
                    let type = message[0].split("/")[1];
                    message = message[1];
                    let li = document.createElement("li");
                    li.innerHTML = a.timestamp.slice(11) + " " + type + " " + message;
                    log_list.prepend(li);
                    latestLogId = a.id;
                }
            });
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

fetchLog();
setInterval(() => {
    fetchLog();
}, 1000);