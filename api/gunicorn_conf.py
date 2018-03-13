# Gunicorn configuration file

bind = '0.0.0.0:8000'

timeout = 5

loglevel = 'info'
errorlog = '-'
accesslog = '-'
