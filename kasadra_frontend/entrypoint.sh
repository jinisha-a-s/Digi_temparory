#!/bin/sh
set -e


echo "Creating config.js with VITE_API_URL=$VITE_API_URL"

cat <<EOF > /app/kasadra_frontend/dist/config.js
window._env_ = {
  VITE_API_URL: "${VITE_API_URL}"
};
EOF

# Pass control to CMD (serve)
exec "$@"



#!/bin/sh
# set -e

# Generate config.js from template
# if [ -f /app/kasadra_frontend/dist/config.js.template ]; then
#   envsubst < /app/kasadra_frontend/dist/config.js.template > /app/kasadra_frontend/dist/config.js
#   echo "✅ Generated config.js with VITE_API_URL=$VITE_API_URL"
# else
#   echo "⚠️ No config.js.template found in dist!"
# fi

# Start the server (serve command from CMD)
# exec "$@"
