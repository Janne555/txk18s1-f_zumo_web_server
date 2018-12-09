const log_list = document.getElementById("log_list");

function printLog(json) {
    json.rows.forEach((a, i) => {
            let message = a.message.split(" ");
            let type = message[0].split("/")[1];
            message = message[1];
            let li = document.createElement("li");
            li.innerHTML = a.timestamp.slice(11) + " " + type + " " + message;
            log_list.prepend(li);
            latestLogId = a.id;
    });
}

printLog(log_data);