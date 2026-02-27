A quick script to export the `team_match` table our spreadsheet.

To setup:

1. Setup [Google Cloud Console](https://console.cloud.google.com/) with a project
2. enable the [Google Sheets API](https://console.cloud.google.com/marketplace/product/google/sheets.googleapis.com)
3. Create a [Service Account](https://console.cloud.google.com/iam-admin/serviceaccounts)
4. Give that account access to your spreadsheet
5. Get a private key for that Service Account (press the 3 dots by the S.A. name, then press `Manage Keys`)
6. Put the downloaded key file in `google_credentials/private_key.json`
7. Enter the virtual environment in this folder `source .venv/activate/bin`
8. `python3 data_export.py`
