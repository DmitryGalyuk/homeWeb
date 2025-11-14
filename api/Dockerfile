FROM tiangolo/uwsgi-nginx-flask:python3.8
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3-dev gcc libc-dev \
    && pip install netifaces \
    && apt-get remove -y python3-dev gcc libc-dev \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*
