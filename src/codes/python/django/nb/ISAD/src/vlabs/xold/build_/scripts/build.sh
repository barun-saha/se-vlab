#!/bin/bash

#
# Build the project:
#   Replace $MEDIA_URL$ in the JS and CSS files
#   Minify the JS files
#   Revert HTML files from including -min.js to .js
#   Update the HTML files to include the -min.js files
#
# Barun Saha [21 March 2013]
#

python ../../manage.py js_urls

bash build_js_files.sh
bash css_url_resolve.sh
bash update_html_js.sh reverse
bash update_html_js.sh
