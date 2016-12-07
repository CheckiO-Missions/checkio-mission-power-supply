"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {
            "input": [
              [['p1', 'c1'], ['c1', 'c2']], {'p1': 1}
            ],
            "answer": ['c2'],
            "explanation": "one blackout"
        },
        {
            "input": [
              [['c0', 'c1'], ['c1', 'p1'], ['c1', 'c3'], ['p1', 'c4']], {'p1': 1}
            ],
            "answer": ['c0', 'c3'],
            "explanation": "two blackout"
        },
        {
            "input": [
              [['p1', 'c1'], ['c1', 'c2'], ['c2', 'c3']], {'p1': 3}
            ],
            "answer": [],
            "explanation": "no blackout"
        },
        {
            "input": [
              [['c0', 'p1'], ['p1', 'c2']], {'p1': 0}
            ],
            "answer": ['c0', 'c2'],
            "explanation": "weak power-plant"
        },
        {
            "input": [
              [['p0', 'c1'], ['p0', 'c2'], ['c2', 'c3'], ['c3', 'p4'], ['p4', 'c5']], {'p0': 1, 'p4': 1}
            ],
            "answer": [],
            "explanation": "cooperation"
        },
        {
            "input": [
              [['c0', 'p1'], ['p1', 'c2'], ['c2', 'c3'], ['c2', 'c4'], ['c4', 'c5'],
               ['c5', 'c6'], ['c5', 'p7']],
              {'p1': 1, 'p7': 1}
            ],
            "answer": ['c3', 'c4', 'c6'],
            "explanation": "complex cities 1"
        },
        {
            "input": [
              [['p0', 'c1'], ['p0', 'c2'], ['p0', 'c3'],
               ['p0', 'c4'], ['c4', 'c9'], ['c4', 'c10'],
               ['c10', 'c11'], ['c11', 'p12'], ['c2', 'c5'],
               ['c2', 'c6'], ['c5', 'c7'], ['c5', 'p8']],
              {'p0': 1, 'p12': 4, 'p8': 1}
            ],
            "answer": ['c6', 'c7'],
            "explanation": "complex cities 2"
        },
        {
            "input": [
              [['c1', 'c2'], ['c2', 'c3']], {}
            ],
            "answer": ['c1', 'c2', 'c3'],
            "explanation": "no power plants"
        },
        {
            "input": [
              [['p1', 'c2'], ['p1', 'c4'], ['c4', 'c3'], ['c2', 'c3']], {'p1': 1}
            ],
            "answer": ['c3'],
            "explanation": "circle"
        },
        {
            "input": [
              [['p1', 'c2'], ['p1', 'c4'], ['c2', 'c3']], {'p1': 4}
            ],
            "answer": [],
            "explanation": "more than enough"
        }
    ],
    "Extra": [
        {
            "input": [
              [['c1', 'c2'], ['c2', 'c1']], {}
            ],
            "answer": ['c1', 'c2'],
            "explanation": "no power plants"
        },
        {
            "input": [
              [['c1', 'p1'], ['p1', 'p2']], {'c1': 1}
            ],
            "answer": ['p2'],
            "explanation": "switch letters"
        },
        {
            "input": [
              [['p1', 'c2'], ['c2', 'c3'], ['c3', 'c4'], ['c4', 'p5'],
               ['c6', 'c7'], ['c7', 'c8'], ['c8', 'c9'], ['c9', 'c10'],
               ['c11', 'c12'], ['c12', 'c13'], ['c13', 'c14'], ['c14', 'c15'],
               ['c16', 'c17'], ['c17', 'c18'], ['c18', 'c19'], ['c19', 'c20'],
               ['p21', 'c22'], ['c22', 'c23'], ['c23', 'c24'], ['c24', 'p25'],
               ['p1', 'c6'], ['c2', 'c7'], ['c3', 'c8'], ['c4', 'c9'], ['p5', 'c10'],
               ['c6', 'c11'], ['c7', 'c12'], ['c8', 'c13'], ['c9', 'c14'], ['c10', 'c15'],
               ['c11', 'c16'], ['c12', 'c17'], ['c13', 'c18'], ['c14', 'c19'], ['c15', 'c20'],
               ['c16', 'p21'], ['c17', 'c22'], ['c18', 'c23'], ['c19', 'c24'], ['c20', 'p25']],
              {'p1': 3, 'p5': 3, 'p21': 3, 'p25': 3}
            ],
            "answer": ['c13'],
            "explanation": "grid: 5x5"
        },
    ]
}
