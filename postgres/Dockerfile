FROM postgres:12.2

# add local file to new folder(built in container)
ADD /tables/ /docker-entrypoint-initdb.d/tables/
ADD /seed/ /docker-entrypoint-initdb.d/seed/
ADD deploy_schemas.sql /docker-entrypoint-initdb.d/

# /docker-entrypoint-initdb.d/ - excuted when docker starts postgresql server 