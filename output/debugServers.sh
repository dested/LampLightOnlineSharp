#!/bin/sh
echo .debugging servers.
node-inspector
node --debug=4000 MM.HeadServer.js &
node --debug=4100 MM.GatewayServer.js &
node --debug=4200 MM.GameServer.js &
node --debug=4300 MM.ChatServer.js &
