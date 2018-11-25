var data = [{"id":"905","timestamp":"2018-11-25 13:22:04","x":"10000","y":"-10031","z":"13339"},{"id":"904","timestamp":"2018-11-25 13:22:04","x":"-3427","y":"-5905","z":"15372"},{"id":"903","timestamp":"2018-11-25 13:22:04","x":"-6823","y":"-3099","z":"16062"},{"id":"902","timestamp":"2018-11-25 13:22:04","x":"-7670","y":"-3288","z":"17039"},{"id":"901","timestamp":"2018-11-25 13:22:04","x":"-4358","y":"-2963","z":"16185"},{"id":"900","timestamp":"2018-11-25 13:22:04","x":"1736","y":"-4200","z":"16288"},{"id":"899","timestamp":"2018-11-25 13:22:04","x":"-439","y":"-5004","z":"15830"},{"id":"898","timestamp":"2018-11-25 13:22:04","x":"-463","y":"-5845","z":"16442"},{"id":"897","timestamp":"2018-11-25 13:22:04","x":"-2176","y":"-5618","z":"16035"},{"id":"896","timestamp":"2018-11-25 13:22:04","x":"-2312","y":"-5723","z":"16184"},{"id":"895","timestamp":"2018-11-25 13:22:03","x":"-484","y":"-5010","z":"15511"},{"id":"894","timestamp":"2018-11-25 13:22:03","x":"403","y":"-5134","z":"16675"},{"id":"893","timestamp":"2018-11-25 13:22:03","x":"2286","y":"-4205","z":"15706"},{"id":"892","timestamp":"2018-11-25 13:22:03","x":"5397","y":"-1749","z":"15814"},{"id":"891","timestamp":"2018-11-25 13:22:03","x":"4005","y":"-2400","z":"17225"}];
data = data.map((a, i) => {
    return Math.atan(a.y / a.x) * (180 / Math.PI);
});

console.log(data);

var acc_display = document.getElementById("acc_display");
var acc_ctx = acc_display.getContext("2d");
var center = acc_display.height / 2;


acc_ctx.rotate(-90);
acc_ctx.beginPath();
acc_ctx.moveTo(center, center);
acc_ctx.lineTo(center, 0);
acc_ctx.stroke();
acc_ctx.moveTo(center, 0);
acc_ctx.lineTo(center-10, 10);
acc_ctx.stroke();
acc_ctx.moveTo(center, 0);
acc_ctx.lineTo(center+10, 10);
acc_ctx.stroke();