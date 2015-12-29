# For diagrams
from isad.models import *
from django.core.context_processors import request
from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings
from django.shortcuts import render_to_response, get_object_or_404, get_list_or_404
from django.template import RequestContext

import subprocess as sp
import os
import re
import json
import pygraphviz as pgv

import globals
import vlabs.settings

JAVA = globals.JAVA_PATH

def uml_diagram(request):
    if request.method == 'POST':
        dia_string = request.POST.get('diagram')
        #print dia_string
        output_file_name = 'filenametemplate "%s/%%j-%%1c.eps";' % (globals.UML_DIAGRAMS_STORAGE_PATH, )
        dia_string = ' '.join(('prologues := 2;',
                               output_file_name,
                               request.POST.get('diagram'),)
        )
        #print dia_string

        if not dia_string:
            return HttpResponse('/isad/v_media/images/ajax/8_8_transparent.png')

        image_size = request.POST.get('size')

        session_id = request.session.session_key
        fname = session_id # + str(time.time())
        file_name = ''.join((globals.UML_DIAGRAMS_STORAGE_PATH, '/', fname, '.mp',))
        image_file_name = ''.join((globals.UML_DIAGRAMS_STORAGE_PATH, '/', fname, '.png',))

        is_error = False
        error_mesg = ''

        # 1. Store the diagram string into a file named by <the session key>.mp
        try:
            mpost_file = open(file_name, 'w')
            mpost_file.write(dia_string)
            mpost_file.close()
        except IOError, ioe:
            is_error = True
            error_mesg = str(ioe)
        finally:
            if mpost_file:
                mpost_file.close()
            if is_error:
                return HttpResponse('<p class="error">Error: ' + error_mesg + '</p>')

        is_error = False

        # 2. Generate EPS from that file
        args = ('/usr/local/texlive/2010/bin/i386-linux/mpost', file_name,)
        # (Rev #15: #1)
        os.chdir(globals.UML_DIAGRAMS_STORAGE_PATH) # IMPORTANT to work with mpost
        process = sp.Popen(args, shell=False, stdout=sp.PIPE, stderr=sp.PIPE)
        result, error = process.communicate()

        if process.returncode != 0:
            error_mesg = 'An error occured while generating EPS!'
            is_error = True
        else:
            # 3. Convert EPS to PNG
            eps_file_name = ''.join((globals.UML_DIAGRAMS_STORAGE_PATH, '/', fname, '-1.eps',))
            args = ('/usr/bin/convert', '-trim', '+repage', '-density',  image_size, eps_file_name, image_file_name,)

            process2 = sp.Popen(args, shell=False, stdout=sp.PIPE, stderr=sp.PIPE)
            result2, error2 = process2.communicate()

            if process2.returncode != 0:
                error_mesg += 'An error occured while converting PDF!'
                is_error = True

        # 4. Return PNG file path
        output = {}

        if is_error:
            output['error'] = error_mesg
            output['diagram_url'] = '/isad/v_media/images/ajax/8_8_transparent.png'
        else:
            output['diagram_url'] = ''.join((globals.UML_DIAGRAMS_ACCESS_PATH, '/', fname, '.png',))

        return HttpResponse(json.dumps(output), content_type="application/json")
    else:
        return HttpResponse('/isad/v_media/images/ajax/8_8_transparent.png')

# (Rev #18: #1)
# Using UMLGraph; uses JAVA source code to generate class diagram
def class_diagram(request):
    is_error = False
    error_mesg = ''
    output = {}
    
    if request.POST:
        # 1. Save the source code in <session>_class.java file
        dia_string  = request.POST.get('diagram')        

        src_file_name   = '%s_class' % (request.session.session_key, )
        src_file_name_java  = '%s.java' % (src_file_name, )
        src_file_storage_path = '%s/%s' % (globals.UML_DIAGRAMS_STORAGE_PATH, src_file_name, )
        src_file_storage_path_java = '%s/%s' % (globals.UML_DIAGRAMS_STORAGE_PATH, src_file_name_java, )

        img_file_storage_path = '%s/%s.jpg' % (globals.UML_DIAGRAMS_ACCESS_PATH, src_file_name, )

        try:
            src_file = open(src_file_storage_path_java, 'w')
            src_file.write(dia_string)
        except IOError, ioe:
#            print 'An IO error has occured!'
#            print str(ioe)
            output['error'] = str(ioe)
            return HttpResponse(json.dumps(output), content_type="application/json")
        finally:
            if src_file:
                src_file.close()

        # 2. umlgraph <session>_class jpg
        args = ('umlgraph', src_file_storage_path, 'jpg',)
        #print 'Args ', args
        process = sp.Popen(args, shell=False, stdout=sp.PIPE, stderr=sp.PIPE)
        result, error = process.communicate()

#        print 'Result: ', result
#        print 'Error: ', error
#        print process.returncode
        # (Change: #34: #1)
        output['output'] = error
        
        # 3. Return path of <session>_class.jpg
        # Note: After executing umlgraph it is difficult to detect error -- no
        # error code is returned
        if process.returncode != 0:
            #print 'Sub process failed!'
            #print error
            output['error'] = ''.join('Sub process failed!', error,)
            return HttpResponse(json.dumps(output), content_type="application/json")
        else:
            output['diagram_url'] = img_file_storage_path
            #print output
            return HttpResponse(json.dumps(output), content_type="application/json")

# (Rev #18: #1)
def sequence_diagram(request):
    output = {}

    if request.POST:
        dia_string = request.POST.get('diagram')

        src_file_name = '%s_seq' % (request.session.session_key, )
        src_file_path = '%s/%s.pic' % (globals.UML_DIAGRAMS_STORAGE_PATH, src_file_name,)
        img_file_path = '%s/%s.gif' % (globals.UML_DIAGRAMS_STORAGE_PATH, src_file_name,)

        img_file_storage_path = '%s/%s.gif' % (globals.UML_DIAGRAMS_ACCESS_PATH, src_file_name, )

        try:
            src_file = open(src_file_path, 'w')
            dia_string = '\n '.join(('.PS', ' copy "' + globals.SEQ_PIC_PATH + '"; ', dia_string,))
            #print dia_string
            src_file.write(dia_string)
        except IOError, ioe:
            #print 'An IO error has occured!'
            #print str(ioe)
            output['error'] = str(ioe)
            return HttpResponse(json.dumps(output), content_type="application/json")
        finally:
            if src_file:
                src_file.close()
                #print 'File closed'

        args = ('pic2plot', '-Tgif', '-f 0.025', src_file_path,)
        #print args
        try:
            #print 'Image file path: ', img_file_path
            img_file = open(img_file_path, 'w+b')
            process = sp.Popen(args, shell=False, stdout=img_file, stderr=sp.PIPE)
            result, error = process.communicate()
        except IOError, ioe:
            #print 'Failed to create diagram'
            #print str(ioe)
            output['error'] = ': '.join(('Failed to create diagram', str(ioe),))
            return HttpResponse(json.dumps(output), content_type="application/json")
        finally:
            if img_file:
                img_file.close()

        if process.returncode != 0:
            #print 'Sub process failed!'
            #print error
            output['error'] = ''.join(('Sub process failed!', error,))
            return HttpResponse(json.dumps(output), content_type="application/json")
        else:
            output['diagram_url'] = img_file_storage_path
            return HttpResponse(json.dumps(output), content_type="application/json")


# (Changes #27: #1)
# Draw UML diagrams uding plantuml
# Reads diagram specification from POST body of the request
# Returns a dictionary containing
#   - URL of the generated image (if successful)
#   - Error message (on failure)
def plantuml_diagram(request):
    output = {}

    if request.POST:
        diagram_string = request.POST.get('diagram')

        src_file_name = '%s_uml.txt' % (request.session.session_key, )
        src_file_path = '%s/%s' % (globals.UML_DIAGRAMS_STORAGE_PATH, src_file_name,)
        image_file_name = '%s_uml.png' % (request.session.session_key, )
        img_file_path = '%s/%s' % (globals.UML_DIAGRAMS_STORAGE_PATH, image_file_name,)
        img_file_access_path = '%s/%s' % (globals.UML_DIAGRAMS_ACCESS_PATH, image_file_name,)

        src_file = None

        try:
            src_file = open(src_file_path, 'w')
            src_file.write(diagram_string)
        except IOError, ioe:
            #print 'Failed to create diagram'
            #print str(ioe)
            output['error'] = ': '.join(('Failed to create temp diagram file', str(ioe), 'Please report this back to us.',))
            return HttpResponse(json.dumps(output), content_type="application/json")
        except Exception, err:
            #print 'Failed to create temp diagram file for some unknown reason'
            #print str(ioe)
            output['error'] = ': '.join(('Failed to create temp diagram file for some unknown reason', str(err), 'Please report this back to us.',))
            return HttpResponse(json.dumps(output), content_type="application/json")
        finally:
            if src_file:
                src_file.close()

        #args = ('/usr/bin/java', '"-Djava.awt.headless=true"', '-jar', globals.PLANT_UML_JAR, src_file_path, '-o', globals.UML_DIAGRAMS_STORAGE_PATH,)
        #args = ('java', '-classpath', '"/home/barun/codes/python/django/nb/ISAD/src/vlabs/media/lib/jar/plantuml.jar:/usr/lib/jvm/java-6-openjdk/lib/tools.jar"', '-Djava.awt.headless=true', 'net.sourceforge.plantuml.Run', src_file_path, '-o', globals.UML_DIAGRAMS_STORAGE_PATH,)
        #process = sp.Popen(args, shell=False, stderr=sp.PIPE)
        #args = ('java', '-classpath', '/home/barun/codes/svn_chkout/isad/11May2011/trunk/vlabs/media/lib/jar/plantuml.jar', '-Djava.awt.headless=true', 'net.sourceforge.plantuml.Run', '/home/barun/Downloads/Softwares/UML/PlantUML/class.uml')

        #args = ('java', '-classpath', globals.PLANT_UML_JAR, '-Djava.awt.headless=true', 'net.sourceforge.plantuml.Run', src_file_path)
        args = (JAVA, '-jar', globals.PLANT_UML_JAR, src_file_path)
	#return HttpResponse(''.join( args), img_file_access_path)
        try:
	    #print args
            process = sp.Popen(args, shell=False)
            process.communicate()
            output['diagram_url'] = img_file_access_path
        except OSError, ose:
            output['error'] = ''.join(('Sub process failed due to OS error!', str(ose), 'Please report this back to us.',))
        except Exception, xcptn:
            output['error'] = ''.join(('Sub process failed!', str(xcptn), 'Please report this back to us.',))

        return HttpResponse(json.dumps(output), content_type="application/json")

    else:
        return render_to_response(
            'isad/workspace/plantuml.html',
            {},
            context_instance=RequestContext(request)
        )


# (Rev #68: #1)
# Generate CFG of a simple C program by providing suitable flags to gcc
# Example: gcc -c -fdump-tree-vcg -fdump-tree-cfg test.c
def generate_cfg(request):
    output = {}
    is_error = False

    if request.POST:
        program = request.POST.get('program')
        #print program

        # 1. Store the program in a temp file with name as <session_id>.c
        program_file_name = '%s.c' % (request.session.session_key,)
        program_file_path = '%s/%s' % (globals.C_PROGRAM_STORAGE_PATH, program_file_name,)
        #print program_file_path

        program_file = None
        
        try:
            program_file = open(program_file_path, 'w')
            program_file.write(program)
        except IOError, ioe:
            #print 'Failed to create diagram'
            #print str(ioe)
            output['error'] = ': '.join(('Failed to create temp program file: \n', str(ioe), '\nPlease report this back to us.\n',))
            is_error = True            
        except Exception, err:
            #print 'Failed to create temp diagram file for some unknown reason'
            #print str(ioe)
            output['error'] = ': '.join(('Failed to create temp program file for some unknown reason: \n', str(err), '\nPlease report this back to us.\n',))
            is_error = True            
        finally:
            if program_file:
                program_file.close()       

        if is_error:
            return HttpResponse(json.dumps(output), content_type="application/json")
            is_error = False
                        
        # 2. Compile the program
        gcc_args = '-c -fdump-tree-vcg -fdump-tree-cfg'
        args = ('gcc', '-c', '-fdump-tree-vcg', '-fdump-tree-cfg', program_file_path,)
        #print ' '.join(args)
        #print os.getcwd()        
        try:
            #os.chdir(globals.C_PROGRAM_STORAGE_PATH)
            #print os.getcwd()
            process = sp.Popen(args, shell=False, stdout=sp.PIPE, stderr=sp.PIPE, cwd=globals.C_PROGRAM_STORAGE_PATH)
            result, error = process.communicate()            
            output['status'] = '%s\n%s' % (result, error,)
            output['status'] = re.sub(globals.C_PROGRAM_STORAGE_PATH, '', output['status'])
            #print output['status']
            #print 'Return code', process.returncode
        except OSError, ose:             
            output['error'] = ''.join(('Compilation failed: ', str(ose), '\nPlease report this back to us.\n',))
            #print output['error']
            is_error = True
        except Exception, xcptn:
            output['error'] = ''.join(('Compilation failed! ', str(xcptn), '\nPlease report this back to us.\n',))
            #print output['error']
            is_error = True

        if is_error:
            return HttpResponse(json.dumps(output), content_type="application/json")

        #print 'This is disgusting'                                
        
        # 3. Collect the output and contents of <session_id>*.cfg files, and
        #    send back to the client
        vcg_file_name = '%s.c.006t.vcg' % (request.session.session_key,)
        cfg_file_name = '%s.c.013t.cfg' % (request.session.session_key,)
        cfg_file_path = globals.C_PROGRAM_STORAGE_PATH + '/' + cfg_file_name
        #print cfg_file_path

        cfg_file = None
        try:
            cfg_file = open(globals.C_PROGRAM_STORAGE_PATH + '/' + cfg_file_name, 'r')
            output['basic_blocks'] = cfg_file.read()
        except OSError, ose:
            output['error'] = ''.join(('Reading from cfg file failed due to OS error! ', str(ose), '\nPlease report this back to us.\n',))
            #print output['error']
            is_error = True
        except Exception, xcptn:            
            output['error'] = ''.join(('Reading from cfg file failed! ', str(xcptn), '\nPlease report this back to us.\n',))
            #print output['error']  
            is_error = True      
        finally:
            if cfg_file:
                cfg_file.close()    

        if is_error:
            return HttpResponse(json.dumps(output), content_type="application/json")
        
        # 4. Generate .png file from the <session_id>*.vcg file
#        ps_file_name = '%s.ps' % (request.session.session_key,)
#        ps_file_path = '%s/%s' % (globals.C_PROGRAM_STORAGE_PATH, ps_file_name,)

#        # Remove the PS file -- xvcg can't overwrite
#        try:
#            os.remove(ps_file_path)
#        except OSError:
#            # Raised when file doesn't exists
#            pass
            
        #args = ('xvcg', '-silent', '-color', '-scale', '99', '-psoutput', ps_file_path,  globals.C_PROGRAM_STORAGE_PATH + '/' + vcg_file_name,)
        args = ('graph-easy', globals.C_PROGRAM_STORAGE_PATH + '/' + vcg_file_name, '--png',)
        #print ' '.join(args)
        try:
            process = sp.Popen(args, shell=False, cwd=globals.C_PROGRAM_STORAGE_PATH)
            process.communicate()
            png_file_name = '%s.c.006t.png' % (request.session.session_key,)
            png_file_path = '%s/%s' % (globals.C_PROGRAM_STORAGE_PATH, png_file_name,)
            output['cfg_url'] = '%s/%s' % (globals.CFG_ACCESS_PATH, png_file_name,)
        except OSError, ose:
            output['error'] = ''.join(('graph-easy failed due to OS error!', str(ose), '\n Please report this back to us.',))
            #print output['error']
            is_error = True
        except Exception, xcptn:
            output['error'] = ''.join(('graph-easy failed!', str(xcptn), '\n Please report this back to us.',))
            #print output['error']
            is_error = True

        if is_error:
            return HttpResponse(json.dumps(output), content_type="application/json")
            
#        # 5. Convert PS to PNG, and send back the URL
#        png_file_name = '%s.png' % (request.session.session_key,)
#        png_file_path = '%s/%s' % (globals.C_PROGRAM_STORAGE_PATH, png_file_name,)

#        args = ('convert', ps_file_path, png_file_path)
#        #print ' '.join(args)
#        try:
#            process = sp.Popen(args, shell=False)
#            process.communicate()
#            output['cfg_url'] = '%s/%s' % (globals.CFG_ACCESS_PATH, png_file_name,)
#            #print output['cfg_url']
#        except OSError, ose:            
#            output['error'] = ''.join(('Failed to create image file!', str(ose), '\nPlease report this back to us.',))
#            #print output['error']
#            is_error = True
#        except Exception, xcptn:
#            output['error'] = ''.join(('Failed to create image file!', str(xcptn), '\nPlease report this back to us.',))
#            #print output['error']
#            is_error = True

        #if is_error:
            #return HttpResponse(json.dumps(output))                                    
            
    return HttpResponse(json.dumps(output), content_type="application/json")


# 29 Dec 2012
def graphviz_diagram(request):
    output = {}

    if request.method == 'POST':
        graph_string = request.POST.get('graphString')
        #print graph_string

        # DFD specific setting -- replace _LIB_IMAGE_GRAPHVIZ_ with 
        # /isad/v_media/images/exercise/data_store_shape.png
        graph_string = graph_string.replace('_LIB_IMAGE_GRAPHVIZ_', settings.MEDIA_ROOT + 'images/exercise/')

        
        if not graph_string:
            return HttpResponse('/isad/v_media/images/ajax/8_8_transparent.png')

        session_id = request.session.session_key
        fname = session_id # + str(time.time())
        file_name = globals.UML_DIAGRAMS_STORAGE_PATH + '/' + fname + '.png'

        graph = pgv.AGraph()
        graph.from_string(graph_string)
        graph.draw(file_name, prog='dot')

#        f = open('/var/vlabs/isad/erd.log', 'a')
#        import os
#        f.write('Path:')
#        f.write(os.getcwd())
#        f.close()

	image_file_name = globals.UML_DIAGRAMS_ACCESS_PATH + '/' + fname + '.png'
	output['diagram'] = image_file_name
    else:
	output['diagram'] = image_file_name
	image_file_name = '/isad/v_media/images/ajax/8_8_transparent.png'
        
    return HttpResponse(json.dumps(output), content_type="application/json")
