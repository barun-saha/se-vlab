# README #


Scripts folder is meant for scripts that help automate the build and deployment process of this lab. This folder must have labspec.json in the specified format (template link to be published later).

## Intialization ##

1. OS packages are read from `labspec.json` and installed
2. `configure.sh` creates user account, directories and required symlinks
3. `init_database.sh` is invoked by the above script to create the database

