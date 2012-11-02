LampLightOnlineSharp
====================

Lamp Light Online for HTML using the Saltarelle compiler for static typing



TODO: 
=====



Sever structure
===============
each region has G gateway servers
  a player is roundrobin assigned to a gateway
  each gateway is connected to each game server
each region has M game servers
  each game server executes for only P players 
  the product of the game servers execution is sent to each other game server to update their game state