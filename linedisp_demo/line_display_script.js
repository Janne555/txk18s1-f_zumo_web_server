const memoize = (fn) => {
    let cache = {};
    return (...args) => {
        let n = args[0];
        if (n in cache) {
            return cache[n];
        } else {
            let result = fn(n);
            cache[n] = result;
            return result;
        }
    }
}

//get an object of the display element
const linereader_display = document.getElementById("line_reader_display");
//get context for the display element
const context = linereader_display.getContext("2d");

const plusB = document.getElementById("plus");
const minusB = document.getElementById("minus");
const pauseB = document.getElementById("pause");

var lowerLimit = 800;
var upperLimit = lowerLimit + 60;

/* converts a value between from one scale to another */
var scaleData = (value, min, max, newMin, newMax) => {
    return (value / (max - min)) * (newMax - newMin);
};

/* a special conveter for conversion from scale 0->24000 to 0->255 */
var scaleRefData = (x) => {
    return scaleData(x, 0, 24000, 0, 255);
};

/* scales a value using the special converter and inverts it */
var sclAndInvRefData = memoize(
     (x) => {
    return Math.round(255 - scaleRefData(x));
});

/* takes a datapoint, scales its values and returns a vector */
var vectorizeRefDatapoint = (x) => {
    return [sclAndInvRefData(x.l3),
        sclAndInvRefData(x.l2),
        sclAndInvRefData(x.l1),
        sclAndInvRefData(x.r1),
        sclAndInvRefData(x.r2),
        sclAndInvRefData(x.r3)
    ];
};

/* creates a vector of locations for colorstops */
var indexVector = memoize(
    (size) => {
    let s = 1 / size;
    let sum = 0;
    return [...Array(size).keys()].map(x => {
        return (s * x).toFixed(3);
    }).filter((y, i) => {
        if ((i - 1) % 3 == 0) {
            return false;
        } else {
            return true;
        }
    });
});

function updateLineDisplay(json) {
    let indexVectorDone = indexVector(16);
    json.forEach((a, i) => {
        let grd = context.createLinearGradient(0, 0, 150, 0);
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
        vector.pop();

        vector.forEach((c, i) => {
            grd.addColorStop(indexVectorDone[i], c);
        });

        context.fillStyle = grd;
        let pos = 590 - i * 10;
        context.fillRect(0, pos, 150, 10);
    });
}

var isInterval = false;
var intervalId = setInterval(() => {
    updateLineDisplay(linedata.slice(lowerLimit, upperLimit));
    lowerLimit += 2;
    upperLimit += 2;
    isInterval = true;
}, 100);

plusB.addEventListener("click", function () {
    lowerLimit = upperLimit;
    upperLimit += 60;
    updateLineDisplay(linedata.slice(lowerLimit, upperLimit));
});

minusB.addEventListener("click", function () {
    upperLimit = lowerLimit;
    lowerLimit -= 60;
    updateLineDisplay(linedata.slice(lowerLimit, upperLimit));
});

pauseB.addEventListener('click', () => {
    if (isInterval) {
        clearInterval(intervalId);
        isInterval = false;
    } else {
        intervalId = setInterval(() => {
            updateLineDisplay(linedata.slice(lowerLimit, upperLimit));
            lowerLimit += 2;
            upperLimit += 2;
            isInterval = true;
        }, 100);
    }
});