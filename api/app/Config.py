from app.RangeColor import rangeColor

monitoredFilesystemsRoot = '/media'

def driveTempRanges():
    return [{
        rangeColor.LOW: (0, 24),
        rangeColor.NORM: (25, 50),
        rangeColor.WARN: (51, 70),
        rangeColor.CRIT: (71, 1000)
    }]

def cpuTempRanges():
    return [{
        rangeColor.LOW: (0, 24),
        rangeColor.NORM: (25, 60),
        rangeColor.WARN: (61, 80),
        rangeColor.CRIT: (81, 1000)
    }]

def freeSpaceRanges():
    return [{
        rangeColor.LOW: (0, 24),
        rangeColor.NORM: (25, 70),
        rangeColor.WARN: (71, 90),
        rangeColor.CRIT: (91, 1000)
    }]