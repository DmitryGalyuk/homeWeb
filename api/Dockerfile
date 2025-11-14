# /api/Dockerfile

# Use the base image
FROM tiangolo/uwsgi-nginx-flask:python3.8

# Step 1: Redirect repositories to Debian archive mirrors.
# This is necessary because Debian Buster is old, and its standard repos are closed,
# causing the apt-get update to fail with 404 errors.
RUN sed -i 's/deb.debian.org/archive.debian.org/g' /etc/apt/sources.list \
    && sed -i 's/security.debian.org/archive.debian.org/g' /etc/apt/sources.list \
    # Remove the security archive line to prevent duplicates/issues
    && sed -i '/^deb http:\/\/archive\.debian\.org\/debian-security/d' /etc/apt/sources.list

# Step 2: Install netifaces and its build dependencies
RUN apt-get update \
    # Install necessary packages for netifaces compilation (python3-dev, gcc, libc-dev)
    && apt-get install -y --no-install-recommends python3-dev gcc libc-dev \
    # Install netifaces
    && pip install netifaces \
    # Remove build dependencies to keep the image small
    && apt-get remove -y python3-dev gcc libc-dev \
    && apt-get autoremove -y \
    # Clean up APT lists
    && rm -rf /var/lib/apt/lists/*