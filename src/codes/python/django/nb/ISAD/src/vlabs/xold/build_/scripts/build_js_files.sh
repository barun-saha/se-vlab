#!/bin/bash

#
# Build the JS files for the app.
# Original file: sample.js
#
# Step 1: sample.js => sample-min.js
#       Create a minified JS file; original file is retained.
# Step 2: sample-min.js: Replace $MEDIA_URL$ with the original URL.
#
# Barun Saha [13 March 2013]
#


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



# URLs in the JS files contain the identifier $MEDIA_URL$ to indicate the
# beginning of the media url, as defined in the settings.py file. For example,
# $MEDIA_URL$images/self.png actually points to /isad/v_media/images/self.png
# image file.

URL_STRING='\$MEDIA_URL\$'
ACTUAL_URL='/isad/v_media/'

##for file in $(find ../../media/js -name '*.js')
##do
##    sed -ri.orig 's|'"$URL_STRING"'|'"$ACTUAL_URL"'|g' "$file"
##done

for file in $(find ../../media/js -name '*-min.js')
do
    sed -ri 's|'"$URL_STRING"'|'"$ACTUAL_URL"'|g' "$file"
done

sed -ri.orig 's|'"$URL_STRING"'|'"$ACTUAL_URL"'|g' ../../media/lib/editarea_0_8_2/edit_area/edit_area_full.js
