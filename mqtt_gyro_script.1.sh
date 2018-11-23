#!/bin/bash
mosquitto_sub -R -v -h localhost -t 'Zumo035/#' | while read RAW_DATA
do
axis_x=$( echo $RAW_DATA | cut -d ' ' -f2 | cut -d '/' -f1)
axis_y=$( echo $RAW_DATA | cut -d '/' -f3)
axis_z=$( echo $RAW_DATA | cut -d '/' -f4)

echo "inserted data"
mysql -h localhost -u dbuser -ppassword -e "insert into zumo.gyro(timestamp, x, y, z) VALUES('now()','$axis_x','$axis_y', '$axis_z');"

done