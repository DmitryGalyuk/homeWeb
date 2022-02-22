from app.RangeColor import rangeColor

monitoredFilesystemsRoot = '/media'

def driveTempRanges():
    return [
        {"name": rangeColor.LOW, "range": (0, 24)},
        {"name": rangeColor.NORM, "range": (25, 50)},
        {"name": rangeColor.WARN, "range": (51, 70)},
        {"name": rangeColor.CRIT, "range": (71, 1000)}
    ]

def cpuTempRanges():
    return [
        {"name": rangeColor.LOW, "range": (0, 39)},
        {"name": rangeColor.NORM, "range": (40, 59)},
        {"name": rangeColor.WARN, "range": (60, 79)},
        {"name": rangeColor.CRIT, "range": (80, 1000)}
    ]

def freeSpaceRanges():
    return [
        {"name": rangeColor.LOW, "range": (0, 5)},
        {"name": rangeColor.NORM, "range": (6, 50)},
        {"name": rangeColor.WARN, "range": (51, 70)},
        {"name": rangeColor.CRIT, "range": (71, 100)}
    ]