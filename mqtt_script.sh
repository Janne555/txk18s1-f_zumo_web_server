#!/bin/bash
mosquitto_sub -R -v -h localhost -t 'Zumo035/#' | while read RAW_DATA
do

echo $RAW_DATA
mysql -h localhost -u dbuser -psalis -e "insert into zumo.log(timestamp, message) VALUES(now(),"$RAW_DATA");"

type=$( echo $RAW_DATA | cut -d '/' -f2 | cut -d ' ' -f1)

case "$type" in 
"gyro")
    axis_x=$( echo $RAW_DATA | cut -d ' ' -f2 | cut -d '/' -f1 )
    axis_y=$( echo $RAW_DATA | cut -d '/' -f3 )
    axis_z=$( echo $RAW_DATA | cut -d '/' -f4 )
    mysql -h localhost -u dbuser -psalis -e "insert into zumo.gyro(timestamp, x, y, z) VALUES(now(),'$axis_x','$axis_y', '$axis_z');"
    echo "stored gyroscope data"
    ;;
"acc")
    axis_x=$( echo $RAW_DATA | cut -d ' ' -f2 | cut -d '/' -f1 )
    axis_y=$( echo $RAW_DATA | cut -d '/' -f3 )
    axis_z=$( echo $RAW_DATA | cut -d '/' -f4 )
    mysql -h localhost -u dbuser -psalis -e "insert into zumo.acc(timestamp, x, y, z) VALUES(now(),'$axis_x','$axis_y', '$axis_z');"
    echo "stored accelerometer data"
    ;;
"line")
    l3=$( echo $RAW_DATA | cut -d ' ' -f2 | cut -d '/' -f1 )
    l2=$( echo $RAW_DATA | cut -d '/' -f3 )
    l1=$( echo $RAW_DATA | cut -d '/' -f4 )
    r1=$( echo $RAW_DATA | cut -d '/' -f5 )
    r2=$( echo $RAW_DATA | cut -d '/' -f6 )
    r3=$( echo $RAW_DATA | cut -d '/' -f7 )
    mysql -h localhost -u dbuser -psalis -e "insert into zumo.line(timestamp, l3, l2, l1, r1, r2, r3) VALUES(now(),'$l3','$l2', '$l1', '$r1', '$r2', '$r3');"
    echo "stored line sensor data"
    ;;
*)
    echo "Unexpected message, can't parse"
    ;;
esac
done