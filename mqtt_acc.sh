#!/bin/bash
mosquitto_sub -R -v -h localhost -t 'Zumo035/acc' | while read RAW_DATA
do
DATA=$( echo $RAW_DATA | cut -d ' ' -f2)
ARRAY=(${DATA//:/ })

for i in "${ARRAY[@]}"
do
    axis_x=$( echo $i | cut -d '/' -f1 )
    axis_y=$( echo $i | cut -d '/' -f2 )
    axis_z=$( echo $i | cut -d '/' -f3 )
    #mysql -h localhost -u dbuser -psalis -e "insert into zumo.acc(timestamp, x, y, z) VALUES(now(),'$axis_x','$axis_y', '$axis_z');"

done
done