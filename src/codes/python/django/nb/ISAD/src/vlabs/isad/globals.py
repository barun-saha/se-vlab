# globals.py
# Define global constants
# (Rev #14: #1)

from django.conf import settings

# Tool tips for experiments
TOOL_TIP_PATTERN = r'<(h2|h3)>(?P<header>.*?)</\1>'

# Path to the java executable (Sun JDK)
#JAVA_PATH = '/opt/jdk1.6.0_23/bin/java'
JAVA_PATH='/usr/bin/java'

#if settings.__ENV_PROD__:
VAR_TARGET = 'var/vlabs/isad'
VAR_LINK = '/' + VAR_TARGET
# ER diagram
ERD_STORAGE_PATH = VAR_LINK

# UML diagrams
UML_DIAGRAMS_STORAGE_PATH = VAR_LINK + '/uml'
UML_DIAGRAMS_ACCESS_PATH = settings.STATIC_URL + 'vlabs/isad/uml'
DYN_IMAGE_ACCESS_PATH = settings.STATIC_URL + 'vlabs/isad'

# Store uploaded files -- for post2mentor
UPLOAD_STORAGE_ROOT = VAR_TARGET + 'uploads/'
UPLOAD_BASE_URL = settings.STATIC_URL + 'uploads/yyy'   # --- Doesn't seem to be used in anyway
UPLOAD_TO = 'image_uploads'

# (Rev #68: #1)
# C programs
C_PROGRAM_STORAGE_PATH = VAR_LINK + '/cfg'
CFG_ACCESS_PATH = settings.STATIC_URL + 'vlabs/isad/cfg'
#else:
#    # ER diagram
#    ERD_STORAGE_PATH = '/var/vlabs_demo/isad'

#    # UML diagrams
#    UML_DIAGRAMS_STORAGE_PATH = '/var/vlabs_demo/isad/uml'
#    UML_DIAGRAMS_ACCESS_PATH = '/cse08/isad/v_media/vlabs_demo/isad/uml'
#    DYN_IMAGE_ACCESS_PATH = '/cse08/isad/v_media/vlabs_demo/isad'

#    # Store uploaded files -- for post2mentor
#    UPLOAD_STORAGE_ROOT = '/var/vlabs_demo/isad/uploads/'
#    UPLOAD_BASE_URL = '/cse08/isad/v_media/uploads_demo/yyy'   # --- Doesn't seem to be used in anyway
#    UPLOAD_TO = 'image_uploads'

#    # (Rev #68: #1)
#    # C programs
#    C_PROGRAM_STORAGE_PATH = '/var/vlabs_demo/isad/cfg'
#    CFG_ACCESS_PATH = '/cse08/isad/v_media/vlabs_demo/isad/cfg'


# For drawing sequence diagrams
SEQ_PIC_PATH = '/usr/local/lib/umlgraph-5.4/lib/sequence.pic'

# Change #27: #1
PLANT_UML_JAR = settings.STATIC_ROOT + 'isad/lib/jar/plantuml.jar'

