#!/bin/bash

#
# Update the JS includes in HTML pages. By default, change the *.js to *-min.js.
# When the `reverse' option is specified, convert *-min.js to *.js.
#
# Barun Saha [05 March 2013]
#

# The task to be performed by this script
task=default

if [[ $# -eq 1 ]]
then
    arg=$(echo $1 | tr 'A-Z' 'a-z')
    if [[ "$arg"x == "reversex" ]]
    then
        task=reverse
    fi
fi
#echo $task

PATH1=../../templates
EXCLUDE_PATH=../../templates/admin

for file in $(find "$PATH1" \( -type d -name admin -prune \) -o \( -type f -name '*.html' -print \))
do
    echo $file
    if [[ "$task" == "default" ]]
    then
        # Only minify the scripts that are located inside js/ directory.
        sed -e 's/\(js\/.*\)\.js/\1-min\.js/' "$file" > "$file".tmp
        #sed -e 's/js\/*\.js/-min\.js/g' "$file" > "$file".tmp
    else
        sed -e 's/-min\.js/\.js/g' "$file" > "$file".tmp
    fi
    mv "$file".tmp "$file"
done
