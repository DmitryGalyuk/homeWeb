# app.py
from netifaces import AF_INET, gateway, gateways


def get_default_gateway_ip():
    gws = gateways()
    gateway_ip = gws[gateway][AF_INET][0] 
    return gateway_ip
