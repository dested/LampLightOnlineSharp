#!/bin/sh
echo .starting servers.
node MM.HeadServer.js &
node MM.GatewayServer.js &
node MM.GameServer.js &
node MM.ChatServer.js &
