import json

# Experiment #2, exercise #2
def check_answer_2_2(correct_solution, user_solution):
    #print type(user_solution)
    #print user_solution

    u_soln = json.loads(user_solution)
    c_soln = json.loads(correct_solution)

    u_operands = u_soln['operands']
    u_operators = u_soln['operators']

    c_operands = c_soln['operands']
    c_operators = c_soln['operators']

    # Generate list of operands
    ul_operands = [ oprnd for oprnd in u_operands.split(',') if oprnd.strip() ]
    cl_operands = [ oprnd for oprnd in c_operands.split(',') if oprnd.strip() ]

    # Generate list of operators
    ul_operators = [ oprtr for oprtr in u_operators.split(',') if oprtr.strip() ]
    cl_operators = [ oprtr for oprtr in c_operators.split(',') if oprtr.strip() ]

    # Check if all the operators have been specified
    l_operators = [ oprtr for oprtr in cl_operators if oprtr not in ul_operators ]
    if l_operators:
        return (False, 'One or more operator is missing! ',)

    # Check for the operands
    l_operands = [ oprnd for oprnd in cl_operands if oprnd not in ul_operands ]
    if l_operands:
        return (False, 'One or more operand is missing! ',)

    return (True, '',)

# Experiment #4
def just_show_solution():
    return (False, '',)