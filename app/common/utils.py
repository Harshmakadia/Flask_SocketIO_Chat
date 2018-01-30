import uuid
from datetime import datetime

import pytz
from dateutil import tz

UTC_TIMESTAMP_FORMAT = '%Y-%m-%d %H:%M:%S'


def get_utc_timestamp():
    return datetime.now(tz=pytz.utc).strftime(UTC_TIMESTAMP_FORMAT)


def get_ist_timestamp():
    utc_timestamp = get_utc_timestamp()
    from_zone = tz.gettz('UTC')
    to_zone = tz.gettz('Asia/Kolkata')
    utc = datetime.strptime(utc_timestamp, UTC_TIMESTAMP_FORMAT)
    utc = utc.replace(tzinfo=from_zone)
    return utc.astimezone(to_zone).strftime('%Y-%m-%d %I:%M:%S %p')
