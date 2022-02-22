from pathlib import Path

def cpuTemp():
    p = Path('/sys/class/hwmon')
    boardMons = [Path(p, x) 
        for x in p.iterdir() if x.is_dir() 
        and Path(p, x, 'name').open().read().rstrip('\n')!='drivetemp']

    temp = max( [int (Path(x, 'temp1_input').open().read().rstrip('\n'))
        for x in boardMons
        if Path(x, 'temp1_input').is_file() ])
    return temp/1000

