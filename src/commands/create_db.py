from urllib.request import Request, urlopen, HTTPError
import os

COUCH_DB_URL = os.getenv("COUCH_DB_URL", "http://127.0.0.1:5984")
DB_NAME = os.getenv("DB_NAME", "com")

try:
    req = Request(url=COUCH_DB_URL+"/"+DB_NAME, method="PUT")
    f = urlopen(req)
    print(f.status)
    print(f.reason)
except HTTPError as e:
    if e.code == 412:
        print("May '"+DB_NAME+"' have been already made")
