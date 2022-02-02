from enum import Enum

class rangeColor(str, Enum):
        LOW = 'low'
        NORM = 'norm'
        WARN = 'warn'
        CRIT = 'crit'
