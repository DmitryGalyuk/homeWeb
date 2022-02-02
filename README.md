## /freeSpace
Since api is designed to be run in container it does not have the access to host filesystems. Thus it is required to mount all the filesystems to be tracked as volumes into one parent foolder
In Config.py the variable **monitoredFilesystemsRoot = '/media'** defines the folder where tracked filesystems are mounted. 
API returns the JSON of the following format:
```
[
    {
        MOUNTED_FOLDER_NAME: {
            'free': value,
            'total': value,
            'used': value
        }
    }
]
```