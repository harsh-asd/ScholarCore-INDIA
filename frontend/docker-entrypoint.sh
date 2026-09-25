#!/bin/sh
set -e

# Default backend URL if not provided
export BACKEND_API_URL=${BACKEND_API_URL:-http://localhost:5000}

# Substitute environment variables in the Nginx template and output to the conf.d directory
envsubst '${BACKEND_API_URL}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf

# Execute the main container command (start nginx)
exec "$@"
