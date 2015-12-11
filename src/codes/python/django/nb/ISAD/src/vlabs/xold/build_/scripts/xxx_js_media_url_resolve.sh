#!/bin/bash

#
# URLs in the JS files contain the identifier $MEDIA_URL$ to indicate the
# beginning of the media url, as defined in the settings.py file. For example,
# $MEDIA_URL$images/self.png actually points to /isad/v_media/images/self.png
# image file.
#
# Replace all such identifiers with the actual URL. Works on BOTH the 
# non-minified and the minified files, but keeps a backup of only the
# non-minified files.
#
# Barun Saha [12 March 2013]
#

URL_STRING='\$MEDIA_URL\$'
ACTUAL_URL='/isad/v_media/'

for file in $(find ../../media/js -name '*.js')
do
    sed -ri.orig 's|'"$URL_STRING"'|'"$ACTUAL_URL"'|g' "$file"
done

for file in $(find ../../media/js -name '*-min.js')
do
    sed -ri 's|'"$URL_STRING"'|'"$ACTUAL_URL"'|g' "$file"
done

sed -ri.orig 's|'"$URL_STRING"'|'"$ACTUAL_URL"'|g' ../../media/lib/editarea_0_8_2/edit_area/edit_area_full.js
