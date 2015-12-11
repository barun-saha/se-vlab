import json
from django.http import HttpResponse, HttpResponseRedirect

def test():
    return True

def remove_duplicates(l=[]):
    lu = []
    if len(l) > 0:
        for item in l:
            if item not in lu:
                lu.append(item)

    return lu

def sort_nodes(node1, node2):
    try:
        return (int(node1['label']) - int(node2['label']))
    except ValueError:
        return 0

def sort_edges(edge1, edge2):
    try:
        if int(edge1['src']['moduleId']) == int(edge2['src']['moduleId']):
            return (int(edge1['tgt']['moduleId']) - int(edge2['tgt']['moduleId']))
        else:
            return (int(edge1['src']['moduleId']) - int(edge2['src']['moduleId']))
    except ValueError:
        return 0

# Used to compare CFGs in exp # 9
def compare_graphs(graph1, graph2):
    # graph1: Correct graph (JSON string)
    # graph2: User's graph (JSON string)

    g_obj1 = json.loads(graph1)
    g_obj2 = json.loads(graph2)

    g1_nodes = json.loads(g_obj1['nodes'])
    g2_nodes = json.loads(g_obj2['nodes'])

    g1_nodes.sort(sort_nodes)
    g2_nodes.sort(sort_nodes)

    g1_edges = json.loads(g_obj1['edges'])
    g2_edges = json.loads(g_obj2['edges'])

    g1_edges.sort(sort_edges)
    g2_edges.sort(sort_edges)

    err_reason = ''           
    
    if len(g1_nodes) != len(g2_nodes):
        err_reason = 'No. of nodes not correct!'
        return (False, err_reason,)

    if len(g1_edges) != len(g2_edges):
        err_reason = 'No. of edges not correct!'
        return (False, err_reason,)
    
    # Compare the nodes
    for i in range(len(g1_nodes)):
        if g1_nodes[i]['label'] != g2_nodes[i]['label']:
            err_reason = 'Nodes different'
            return (False, err_reason,)

    # Compare the edges
    for i in range(len(g1_edges)):
        if ((g1_edges[i]['src']['moduleId'] == g2_edges[i]['src']['moduleId']) and (g1_edges[i]['tgt']['moduleId'] == g2_edges[i]['tgt']['moduleId'])):
            pass
        else:
            err_reason = 'Edges different'
            return (False, err_reason,)

    return (True,)


def compare_use_case(ucase1, ucase2):
    '''
    Compare two use case diagrams to see if they are similar
    '''
    # ucase1: Correct use case (JSON string)
    # ucase2: User drawn use case (JSON string)

    '''
    1. No. of actors should be same
    2. No. of use cases should be same
    3. No. of edges should be same
    4. Labels of the actors should be same
    5. Labels of the use cases should be same
    6. Labels of edges (if any) should be same
    '''

    u_obj1 = json.loads(ucase1)
    u_obj2 = json.loads(ucase2)
    
    u1_nodes = json.loads(u_obj1['nodes'])
    u2_nodes = json.loads(u_obj2['nodes'])
    
    u1_edges = json.loads(u_obj1['edges'])
    u2_edges = json.loads(u_obj2['edges'])
    
    # Remove duplicate nodes and edges -- Is it required ???
#    u1_nodes = remove_duplicates(u1_nodes)
#    u2_nodes = remove_duplicates(u2_nodes)
#    u1_edges = remove_duplicates(u1_edges)
#    u2_edges = remove_duplicates(u2_edges)

    u1_nodes.sort()
    u2_nodes.sort()
    u1_edges.sort()
    u2_edges.sort()

    #return u2_edges #[0]['label'].strip() == ''

    err_reason = ''
    ret_val = (True,)
    
#    if len(u1_nodes) != len(u2_nodes):
#        err_reason = 'No. of nodes (actors and use cases) are different'
#        ret_val = (False, err_reason,)
#        return ret_val
    
    # Check if all the actors are present
    u1_actors = [ item for item in u1_nodes if item['config']['category'] == 'Actor' ]
    u2_actors = [ item for item in u2_nodes if item['config']['category'] == 'Actor' ]
        
    extra = [ item for item in u1_actors if item not in u2_actors ]    
    if len(extra) > 0:
        err_reason = 'You seem to have missed some actor(s)'
        ret_val = (False, err_reason,)
        return ret_val

    extra = [ item for item in u2_actors if item not in u1_actors ]    
    if len(extra) > 0:
        err_reason = 'You seem to have some extra actor(s)'
        ret_val = (False, err_reason,)
        return ret_val

#    # Compare the actors
#    for i in range(len(u1_actors)):
#        if u1_actors[i]['label'] != u2_actors[i]['label']:
#            err_reason = 'Actors different'
#            return (False, err_reason,)

    # Check if all the use cases are present
    u1_usecases = [ item for item in u1_nodes if item['config']['category'] == 'UseCase' ]
    u2_usecases = [ item for item in u2_nodes if item['config']['category'] == 'UseCase' ]

    extra = [ item for item in u1_usecases if item not in u2_usecases ]
    if len(extra) > 0:
        err_reason = 'You seem to have missed some use case(s)'
        ret_val = (False, err_reason,)
        return ret_val

    extra = [ item for item in u2_usecases if item not in u1_usecases ]
    if len(extra) > 0:
        err_reason = 'You seem to have some extra use case(s)'
        ret_val = (False, err_reason,)
        return ret_val


    # Check if all the relationships between actors and use cases have been shown
    if len(u1_edges) > len(u2_edges):
        err_reason = 'One or more relationship(s) has been missed out'
        ret_val = (False, err_reason,)
        return ret_val

    if len(u1_edges) < len(u2_edges):
        err_reason = 'Seems one or more extra relationship(s) has been added'
        ret_val = (False, err_reason,)
        return ret_val

    # Compare the edges
    # 1. Edges representing include or extend will have labels (stereotypes)
    #    Stereotypes won't have the '<' or '>' symbols here
    #
    # 2. Edge representing association or generalization won't have any label
    #
    # 3. Edges with label will be of the form (node1, node2)
    # 4. Association could be of the form (node1, node2) or (node2, node1)
    # 5. Generalization will of the form (node1, node2)
    #
    # 6. Association is between an actor and a use case
    # 7. Generalization, include, extend is between two use cases
    #
    for i in xrange(len(u1_edges)):
        if u1_edges[i]['label'].strip() != ' ':
            if ((u1_edges[i]['src']['moduleId'] == u2_edges[i]['src']['moduleId'])
            and (u1_edges[i]['tgt']['moduleId'] == u2_edges[i]['tgt']['moduleId'])
            and (u1_edges[i]['label'] == u2_edges[i]['label'])):
                pass
            elif ((u1_edges[i]['tgt']['moduleId'] == u2_edges[i]['src']['moduleId'])
            and (u1_edges[i]['src']['moduleId'] == u2_edges[i]['tgt']['moduleId'])
            and (u1_edges[i]['label'] == u2_edges[i]['label'])):
                pass
            else:
                if u2_edges[i]['label'] == 'extend':
                    err_reason = 'A wrong &lt;&lt;extend&gt;&gt; relationship between '
                elif u2_edges[i]['label'] == 'include':
                    err_reason = 'A wrong &lt;&lt;include&gt;&gt; relationship between '
                else:
                    if ((u1_edges[i]['src']['moduleId'] == u2_edges[i]['tgt']['moduleId'])
                    and (u1_edges[i]['tgt']['moduleId'] == u2_edges[i]['src']['moduleId'])):    # Condition # 4
                        pass
                    else:
                        err_reason = 'A wrong relationship between -'
                    
                err_reason += u2_edges[i]['src']['moduleId'] + ' and ' + u2_edges[i]['tgt']['moduleId']
                return (False, err_reason,)
        
#    for i in range(len(u1_edges)):
#        if u1_edges[i]['label'].strip() == '':
#            if ((u1_edges[i]['src']['moduleId'] == u2_edges[i]['src']['moduleId'])
#            and (u1_edges[i]['tgt']['moduleId'] == u2_edges[i]['tgt']['moduleId'])):
#                pass
#            elif ((u1_edges[i]['src']['moduleId'] == u2_edges[i]['tgt']['moduleId'])
#            and (u1_edges[i]['tgt']['moduleId'] == u2_edges[i]['src']['moduleId'])):
#                pass
#            else:
#                err_reason = 'A wrong association'
#                return (False, err_reason,)

    return ret_val