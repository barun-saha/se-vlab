#!/bin/sh

# Compress the JS files.
# Given a file sample.js, the minified file would be named sample.min.js. The
# source file (sample.js) would remain unaffected.

PATH1=../../media/js
PATH2=../../media/js/exercises
PATH3=../../media/js/_django
PATH4=../../media/js/tipsy-0.1.7/src/javascripts

rm  "$PATH1"/*min.js "$PATH2"/*min.js "$PATH3"/*min.js "$PATH4"/*min.js -f

## Check if any *.orig.js file already exists. This means that those files have
## been minified at least in the past.
#orig_count=$(find ../../media/js -maxdepth 1 -name '*.orig.js' | wc -l)
#if [[ $count_orig -eq 0 ]];
#then
#    for file in "$PATH1";
#    do
#        echo "$file".orig 
#    done
#fi

#find ../../media/js -maxdepth 1 -name '*.js'

yuicompressor -v --line-break 200 --nomunge --preserve-semi --disable-optimizations -o '.js$:-min.js' "$PATH1"/*.js "$PATH2"/*.js "$PATH3"/*.js "$PATH4"/*.js 
