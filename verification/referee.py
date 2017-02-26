from checkio.signals import ON_CONNECT
from checkio import api
from checkio.referees.io import CheckiOReferee
from checkio.referees import cover_codes

from tests import TESTS

def unordered_unique_list(val1, val2):
    return set(val1) == set(val2), 'checked'

cover = """def cover(func, data):
    return list(func(*data))
"""

api.add_listener(
    ON_CONNECT,
    CheckiOReferee(
        tests=TESTS,
        checker=unordered_unique_list,
        function_name={
            "python": "power_supply",
            "js": "powerSupply"
        },
        cover_code={
            'python-27': cover,
            'python-3': cover,
            'js-node': cover_codes.js_unwrap_args
        }
    ).on_ready)