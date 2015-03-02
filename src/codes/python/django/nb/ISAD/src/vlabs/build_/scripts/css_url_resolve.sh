#!/bin/bash

#
# URLs in the CSS files contain the identifier $MEDIA_URL$ to indicate the
# beginning of the media url, as defined in the settings.py file. For example,
# $MEDIA_URL$images/self.png actually points to /isad/v_media/images/self.png
# image file.
#
# Replace all such identifiers with the actual URL
#
# Barun Saha [12 March 2013]
#

URL_STRING='\$MEDIA_URL\$'
ACTUAL_URL='/isad/v_media/'

URL_STRING='/cse08/isad/v_media/'
ACTUAL_URL='/isad/v_media/'



for file in $(find ../../media/css -name '*.css')
do
    sed -ri.orig 's|'"$URL_STRING"'|'"$ACTUAL_URL"'|g' "$file"
done
