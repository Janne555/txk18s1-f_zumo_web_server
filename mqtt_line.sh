#!/bin/bash
mosquitto_sub -R -v -h localhost -t 'Zumo035/lp' | while read RAW_DATA
do
DATA=$( echo $RAW_DATA | cut -d ' ' -f2)
ARRAY=($( echo $DATA | cut -d '-' -f1) $( echo $DATA | cut -d '-' -f2) $( echo $DATA | cut -d '-' -f3) $( echo $DATA | cut -d '-' -f4) $( echo $DATA | cut -d '-' -f5))

for i in "${ARRAY[@]}"
do
    l3=$( echo $i | cut -d '/' -f1 )
    l2=$( echo $i | cut -d '/' -f2 )
    l1=$( echo $i | cut -d '/' -f3 )
    r1=$( echo $i | cut -d '/' -f4 )
    r2=$( echo $i | cut -d '/' -f5 )
    r3=$( echo $i | cut -d '/' -f6 )
    mysql -h localhost -u dbuser -psalis -e "insert into zumo.line(timestamp, l3, l2, l1, r1, r2, r3) VALUES(now(),'$l3','$l2', '$l1', '$r1', '$r2', '$r3');"
done
done