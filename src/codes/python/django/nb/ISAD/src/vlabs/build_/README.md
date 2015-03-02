build_js_files.sh
====================

Execute this script whenever you make any change to the existing JS files, or
add any new JS file. This script replaces the $MEDIA_URL$ string with the
actual value, and generates the minified JS files.


css_url_resolve.sh
=====================

Replace the URL string in CSS files with the actual URLs. CSS files are not
compressed (although could be done similar to JS files). Also, this script does
not provide (as of now) many features unlike the previous one.


string_replace.sh
====================

This script can replace any arbitrary string in a given set of files.


update_html_js.sh
====================

This script replaces all the script tags in the HTML pages to include the
minified JS files. Provides a "reverse" option to reverse the effect.


NOTE: Uncompressed versions of the JS files contain the $MEDIA_URL$ string.
So, if you want to use any uncompressed JS file (for testing, perhaps), you 
should substitute the string manually, and restore it back once the testing is
done. Also, you might want to clear the browser cache if you are testing
modififed JS code.
