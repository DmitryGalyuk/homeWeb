from app.Config import monitoredFilesystemsRoot
import shutil
from pathlib import Path

def freeSpace():
    return [{
            ** {'name': Path(x).absolute().parts[-1]},  
            ** (shutil.disk_usage(x)._asdict())
        }     
        for x in Path(monitoredFilesystemsRoot).iterdir() ]

