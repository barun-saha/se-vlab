The `scripts` folder contains scripts that help to automate the build and deployment process of this lab. This folder must have `labspec.json` in the specified format (template link to be published later).

## Intialization ##

The following steps are performed to initialize the OS for hosting this lab.

1. OS packages are read from `labspec.json` and installed
2. `configure.sh` creates user account, directories and required symlinks
3. `init_database.sh` is invoked by the above script to create the database

