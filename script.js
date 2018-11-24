const log_list = document.getElementById("log_list");
const linereader_display = document.getElementById("line_reader_display");
const context = linereader_display.getContext("2d");
var latestLogId = -1;

var scaleData = (value, min, max, mult) => {
    return (value / (max - min)) * mult;
}

var scaleRefData = (x) => {
    return scaleData(x, 0, 24000, 255);
}

var sclAndInvRefData = (x) => {
    return Math.round(255 - scaleRefData(x));
}

var vectorizeRefDatapoint = (x) => {
    return [sclAndInvRefData(x.l3),
        sclAndInvRefData(x.l2),
        sclAndInvRefData(x.l1),
        sclAndInvRefData(x.r1),
        sclAndInvRefData(x.r2),
        sclAndInvRefData(x.r3)
    ];
}

var indexVector = (size) => {
    let s = 1 / size;
    return [...Array(size).keys()].map(x => {
        return (s * x).toFixed(3);
    });
}

function updateDisplay() {
    fetch("./connection.php?type=line_latest")
    .then(
        function(reply) {
            return reply.json();
        }
    )
    .then(function (json) {
        let indexVectorDone = indexVector(12);
        json.forEach((a, i) => {
            let grd = context.createLinearGradient(0, 0, 600, 0);
            //create vector from the datapoint
            //map the datapoints to rgbstrings
            //for each of the strings, add a color stop
            //duplicate each element
            let vector = vectorizeRefDatapoint(a)
                .map((b) => {
                    return "rgb(" + b + "," + b + "," + b + ")";
            }).reduce((res, current) => {
                return res.concat([current, current]);
            }, []);

            vector.forEach((c, i) => {
                grd.addColorStop(indexVectorDone[i], c);
            });

            context.fillStyle = grd;
            let pos = 590 - i * 10;
            context.fillRect(0, pos, 600, 10);
        });
    })
    .catch(function(error) {
        console.log(error);
    });
}

setInterval(updateDisplay, 1000);

// var indexVectorDone = indexVector(50, 600, 100);
// console.log(indexVectorDone);
// data.reverse();
// data.forEach((a, i) => {
//     let grd = context.createLinearGradient(0, 0, 600, 0);
//     //create vector from the datapoint
//     //map the datapoints to rgbstrings
//     //for each of the strings 
//     vectorizeRefDatapoint(a)
//         .map((b) => {
//             return "rgb(" + b + "," + b + "," + b + ")";
//         })
//         .forEach((c, i) => {
//             grd.addColorStop(indexVectorDone[i], c);
//         });

//     context.fillStyle = grd;
//     let pos = 550 - i * 25;
//     context.fillRect(0, pos, 600, 25);
// });

function fetchLog() {
    fetch("./connection.php?type=log")
    .then(
        function(reply) {
            return reply.json();
        }
    )
    .then(function (json) {
        updateLog(json);
    })
    .catch(function(error) {
        console.log(error);
    });
}

function updateLog(jsonArr) {
    if (latestLogId != jsonArr[0].id) {
        for (let i = jsonArr.length - 1; i >= 0; i--) {
            if (jsonArr[i].id <= latestLogId) {
                continue;
            }
            let li = document.createElement("li");
            li.innerHTML = jsonArr[i].timestamp.slice(11) + " " + jsonArr[i].message;
            log_list.prepend(li);
            latestLogId = jsonArr[i].id;
        }
    }
}

