# paste <(cat /sys/class/thermal/thermal_zone*/type) <(cat /sys/class/thermal/thermal_zone*/temp) | column -s $'\t' -t | sed 's/\(.\)..$/.\1°C/'
# acpitz        27.8°C
# acpitz        29.8°C
# pch_haswell   37.5°C
# x86_pkg_temp  40.0°C

from pathlib import Path

def cpuTemp():
    p = Path('/sys/class/hwmon')
    boardMons = [Path(p, x) 
        for x in p.iterdir() if x.is_dir() 
        and Path(p, x, 'name').open().read().rstrip('\n')!='drivetemp']

    temp = max( [int (Path(x, 'temp1_input').open().read().rstrip('\n'))
        for x in boardMons ])
    return temp/1000

