# Google Sheets Wrapper Library:
# https://inside.catlin.edu/site/compsci/resources/python/google/sheets.html
from googleSheets import GoogleSheets
import os
import psycopg

# Connect to the sheet
docID = '1rewhzFg4lzrm22D2ItMwvJBw2x2Fxnx_JfWCUeb-yZQ'
# Note: When running this from `export/`, change the credentials folder
sheets = GoogleSheets(docID, sheet="Data Export Testing", credentials_folder="export/google_credentials", service_account=True)

# Connect to database
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

# Query DB and write team matches to sheets
cur.execute("SELECT * FROM team_match;")

rows = cur.fetchall()
print(rows)
# TODO Figure out if we want to just append new team_matches (faster, more difficult) or write the entire table each time
sheets.update_cells('A2', rows)
# sheets.append_rows('A2', rows)

cur.close()
conn.close()
