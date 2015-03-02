#!/bin/bash

#
# Replace a given string with another string. Useful if required to switch the
# $MEDIA_URL$ string in the JS files to the actual URL, and reverse.
#
# Barun Saha [13 March 2013]
#

OLD_STRING='\$MEDIA_URL\$'
NEW_STRING='/isad/v_media/'

for file in $(find ../../media/js \( -name '*.js' -a ! -name '*-min.js' \) )
do
    sed -ri 's|'"$OLD_STRING"'|'"$NEW_STRING"'|g' "$file"
done

sed -ri 's|'"$OLD_STRING"'|'"$NEW_STRING"'|g' ../../media/lib/editarea_0_8_2/edit_area/edit_area_full.js
