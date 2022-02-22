# /sys/class/hwmon/hwmon3/name drivetemp
# /sys/class/hwmon/hwmon3/temp1_crit 70000
# /sys/class/hwmon/hwmon3/temp1_input 36000
# /sys/class/hwmon/hwmon3/device/model Samsung SSD 870

from pathlib import Path

def driveTemp():
    p = Path('/sys/class/hwmon')
    driveMons = [Path(p, x) 
        for x in p.iterdir() if x.is_dir() 
        and Path(p, x, 'name').open().read().rstrip('\n')=='drivetemp']
    temps = [{ 
            'name': Path(x, 'device/model').open().read().rstrip('\n'),
            'temp': Path(x, 'temp1_input').open().read().rstrip('\n')
        } for x in driveMons ]
    return temps

print(driveTemp())