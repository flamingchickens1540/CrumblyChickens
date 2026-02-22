import os
import psycopg
from dotenv import load_dotenv

load_dotenv()

# Connect to database
test = os.environ['DATABASE_URL']
password = os.environ['PGPASSWORD']
user = os.environ['PGUSER']
dbname = os.environ['PGDATABASE']
port = os.environ['PGPORT']
host = os.environ['PGHOST']

conn = psycopg.connect(
    dbname=dbname,
    user=user,
    password=password,
    host=host,
    port=port
)
cur = conn.cursor()

teams = [
    "1540",
    "1359",
    "997",
    "955",
    "957",
    "2521",
    "2898",
    "2374",
]

for team in teams:
    cur.execute("INSERT INTO team (teamKey, name) VALUES: (%s, %s) ON CONFLICT DO NOTHING;", (team, ""))

cur.close()
conn.close()
