#!/bin/sh 
container_id=`docker ps -aqf "name=keycloak"`
docker exec -u root -t -i $container_id /bin/bash /opt/keycloak/bin/kc.sh export --users realm_file --file /opt/keycloak/data/import/realms.json
#/otp/keycloak/bin/kc.sh export --file realm.json
