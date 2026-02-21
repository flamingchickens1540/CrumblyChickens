######################################################################
# Google Spreadsheets Library for Python
# Author: Andrew Merrill
# Version 4.4
#
# Documentation: http://inside.catlin.edu/site/compsci/resources/python/google/sheets.html
#
# Prerequisite:
#
#   You must follow Step 1 and Step 2 on https://developers.google.com/sheets/quickstart/python
#   For OAuth, rename your downloaded client secret file to              client_secret.json 
#   For a Service Account, renamed your downloaded private key file to   private_key.json
#   Your Python program, this file (googleSheets.py) and your json file must all be in the same folder
#
# Example Library Usage:
#
#  from googleSheets import GoogleSheets
#  sheet = GoogleSheets(sheet_document_id)
#  print sheet.get_cells('A1:C4')
#  sheet.update_cells('A1:C2', [[1,2,3],[4,5,6]])
#
#
#  Google Sheets REST API v4: https://developers.google.com/sheets/api/guides/concepts
#  Google Sheets Python API v4: https://developers.google.com/resources/api-libraries/documentation/sheets/v4/python/latest/
#
#
###################################################################

# import shutil
# import httplib2, 
import os, os.path, time, datetime
# import apiclient.discovery
# import oauth2client
# import oauth2client.file
# import oauth2client.tools

# import argparse
# from oauth2client.service_account import ServiceAccountCredentials
import googleapiclient
import google.oauth2.service_account
# import google.oauth2.credentials
# import google_auth_oauthlib.flow

import googleapiclient.discovery


class GoogleSheets:
	
	# document is the document ID of the spreadsheet document
	#    document can be omitted if you want to create or specify the document ID later
	# sheet is the name of the sheet (tab) within the spreadsheet that you want to use
	#    sheet can be omitted if you want to use the first sheet, or you want to specify it later
	# credentials_folder is the folder that holds the google credentials files	
	# edit should be True if you want permission to edit the spreadsheet, and False for read-only permissions
	# service_account is be True if using service account authentication, and False for OAuth authentication
	def __init__(self, document=None, sheet=None, credentials_folder="", edit=True, service_account=True):
		# try:
			self.document = document
			self.sheet = sheet
			self.credentialsFolder = credentials_folder	
			self.defaultBackoffTime = 5  # seconds to pause when Quota Exceeded exception occurs
			self.backoffTime = self.defaultBackoffTime
	
			if edit:
				self.scopes = ['https://www.googleapis.com/auth/spreadsheets']
			else:
				self.scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly']
	
			if service_account:
				credentials = self._get_credentials_serviceaccount()
			else:
				# credentials = self._get_credentials_oauth()
				raise Exception("not supported, go use a service account")
	
			# http = credentials.authorize(httplib2.Http())
			# discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4'
			# service = apiclient.discovery.build('sheets', 'v4', http=http, discoveryServiceUrl=discoveryUrl)
			service = googleapiclient.discovery.build('sheets', 'v4', credentials=credentials)
			self.spreadsheetsResource = service.spreadsheets()
			self.valuesResource = self.spreadsheetsResource.values()
			self.sheetIDs = dict()
		
		# except httplib2.ServerNotFoundError:
		# 	raise self.ServerNotFoundError("unable to connect to google sheets")

	class GoogleSheetsError(Exception): pass
	class ServerNotFoundError(GoogleSheetsError): pass
	class BadDocumentIDError(GoogleSheetsError): pass
	class BadSheetError(GoogleSheetsError): pass
	class BadClientSecretsError(GoogleSheetsError): pass
	class BadPrivateKeyError(GoogleSheetsError): pass
	class BadFormatTypeError(GoogleSheetsError): pass



	#########################################################################################################
	# you only need to use this to switch to different spreadsheet document
	def change_document(self, document):
		self.document = document
		
	# you only need to use this to switch to different sheet within current document
	def change_sheet(self, sheet):
		self.sheet = sheet
	
	
	###################################################################################################
	# use this function to retrieve cell values from the spreadsheet
	# cell_range is in the form 'A2:B5' or 'R1C2:R2C5'
	# if transpose is False (the deault), this returns a list of rows, each of which is a list of values across the columns in that row.
	#   if transpose is True, then it returns a list of columns, each of which is a list of values across the rows in that column.
	# if format is False (the default), then values will be retuned without formatting (and numbers will be numbers, not Strings)
	#   if format is True, then every value is a String, formatted as the values look on the web
	# you don't have to specify the document or sheet if you supplied them already
	# this always returns a list of lists
	def get_cells(self, cell_range, transpose=False, format=False, document=None, sheet=None):
		(document, sheet) = self._handle_document_sheet(document, sheet)
		cell_range = sheet + cell_range
		if transpose:
			majorDimension = 'COLUMNS'
		else:
			majorDimension = 'ROWS'
		if format:
			valueRenderOption = 'FORMATTED_VALUE'
		else:
			valueRenderOption = 'UNFORMATTED_VALUE'
		result = self.execute(self.valuesResource.get(spreadsheetId=document, range=cell_range, 
		                                 majorDimension=majorDimension, valueRenderOption=valueRenderOption))
		result_values = result.get('values', [[]])
		return result_values
	
	
	# use this function to retrieve a single cell value from the spreadsheet
	# column is alphabetic (like 'A' or 'AA') or numeric (like 1 or 27)
	# row is the row number
	# returns the value in that cell, or None if the cell is empty
	def get_cell(self, column, row, format=False, document=None, sheet=None):
		if str(column).isalpha():
			cell = column + str(row)
		else:
			cell = 'R' + str(row) + 'C' + str(column)
		result_values = self.get_cells(cell, transpose=False, format=format, document=document, sheet=sheet)
		if result_values == [[]]:
			return None
		else:
			return result_values[0][0]


	# use this function to retrieve a single row from the spreadsheet
	# row is the number of the row you want to return
	# returns a list of values 
	def get_row(self, row, format=False, document=None, sheet=None):
		cell_range = str(row) + ':' + str(row)
		result_values = self.get_cells(cell_range, transpose=False, format=format, document=document, sheet=sheet)
		return result_values[0]


	# use this function to retrieve a single column from the spreadsheet
	# column is the label ('A') or number (1) of the column you want to return
	# returns a list of values 
	def get_column(self, column, format=False, document=None, sheet=None):
		if str(column).isalpha():
			cell_range = column + ':' + column
		else:
			cell_range = 'R1C' + str(column) + ':C' + str(column)
		result_values = self.get_cells(cell_range, transpose=True, format=format, document=document, sheet=sheet)
		return result_values[0]


	# use this function to retrieve all cells from the spreadsheet
	def get_all_cells(self, transpose=False, format=False, document=None, sheet=None):
		(rows, cols) = self.get_sheet_size(document, sheet)
		cell_range = 'R1C1:R' + str(rows) + 'C' + str(cols)
		return self.get_cells(cell_range, transpose, format, document, sheet)
		
	
	###################################################################################################
	# use this function to alter cell values in the spreadsheet
	# cell_range is in the form 'A2' or 'A2:B5' or 'R1C2' or 'R1C2:R2C5'
	#  if cell_range is a single cell, then it is the upper left corner of the range to update
	#  if cell_range is a range of cells, then it must match the dimensions of the provided data
	# data must be a list of lists
	# if convert is True,  then it will convert strings that look like numbers to numbers, dates to dates, etc.
	#   if convert is False, then the data will be placed in the spreadsheet as-is, with no type conversions
	# if transpose is False (the deault), this expects a list of rows, each of which is a list of values across the columns in that row.
	#   if transpose is True, then it expects a list of columns, each of which is a list of values across the rows in that column.
	# you don't have to specify the document or sheet if you supplied them already
	
	def update_cells(self, cell_range, data, convert=True, transpose=False, document=None, sheet=None):
		(document, sheet) = self._handle_document_sheet(document, sheet)
		cell_range = sheet + cell_range
		if transpose:
			majorDimension = 'COLUMNS'
		else:
			majorDimension = 'ROWS'
		body = {
		        'range': cell_range,
		        'values': data,
		        'majorDimension' : majorDimension
		        }
		if convert:
			valueInputOption = 'USER_ENTERED'
		else:
			valueInputOption = 'RAW'
		result = self.execute(self.valuesResource.update(spreadsheetId=document, range=cell_range, body=body, valueInputOption=valueInputOption))

	
	# use this function to alter a single cell in the spreadsheet
	# column is alphabetic (like 'A' or 'AA') or numeric (like 1 or 27)
	# row is the row number
	# data must be a single value (not a list or list of lists)
	# raw means the same as in update_cells
	def update_cell(self, column, row, data, convert=True, document=None, sheet=None):
		if str(column).isalpha():
			cell = column + str(row)
		else:
			cell = 'R' + str(row) + 'C' + str(column)
		self.update_cells(cell, [[data]], convert=convert, transpose=False, document=document, sheet=sheet)
	
	
	# use this function to alter a single row in the spreadsheet
	# row is the row number
	# data must be a list of values
	def update_row(self, row, data, convert=True, document=None, sheet=None):
		cell_range = str(row) + ':' + str(row)
		self.update_cells(cell_range, [data], convert=convert, transpose=False, document=document, sheet=sheet)


	# use this function to alter a single column in the spreadsheet
	# column is the label ('A') or number (1) of the column you want to alter
	# data must be a list of values
	def update_column(self, column, data, convert=True, document=None, sheet=None):
		if str(column).isalpha():
			cell_range = column + ':' + column
		else:
			cell_range = 'R1C' + str(column) + ':C' + str(column)
		self.update_cells(cell_range, [data], convert=convert, transpose=True, document=document, sheet=sheet)
	
	
	########################################################################################################
	#use this to append one row of data to the end of a "table" in a spreadsheet
	# refer to https://developers.google.com/sheets/guides/values#appending_values for examples of a "table"
	# search_range is in the form 'A2:B5' or 'R1C2:R2C5'
	#   search_range specifies the region of the spreadsheet in which to search for a "table"
	# data is a list of values that will be added after the last row in the "table"
	# if convert is True,  then it will convert strings that look like numbers to numbers, dates to dates, etc.
	#   if convert is False, then the data will be placed in the spreadsheet as-is, with no type conversions
	# if insert is True, then a new row will be inserted into the spreadsheet for the new data
	#   if insert is False, then the new data will overwrite the blank cells after the existing "table"
	def append_row(self, search_range, data, convert=True, insert=False, document=None, sheet=None):
		self.append_rows(search_range, [data], convert, insert, document, sheet)

	# use this to append multiple rows of data to the end of a "table" in a spreadsheet
	# data must be a list of lists, where each inner list is one row of new values
	def append_rows(self, search_range, data, convert=True, insert=False, document=None, sheet=None):
		(document, sheet) = self._handle_document_sheet(document, sheet)
		search_range = sheet + search_range
		body = {
		        'range': search_range,
		        'values': data,
		        }
		if convert:
			valueInputOption = 'USER_ENTERED'
		else:
			valueInputOption = 'RAW'
		if insert:
			insertDataOption = 'INSERT_ROWS'
		else:
			insertDataOption = 'OVERWRITE'
		result = self.execute(self.valuesResource.append(spreadsheetId=document, range=search_range, body=body,
		                                    valueInputOption=valueInputOption, insertDataOption=insertDataOption))
		
		
	####################################################################################################
		
	def clear_cells(self, cell_range, document=None, sheet=None):
		(document, sheet) = self._handle_document_sheet(document, sheet)
		cell_range = sheet + cell_range

		result = self.execute(self.valuesResource.clear(spreadsheetId=document, range=cell_range, body={}))

			
		
		
	####################################################################################################
	# use this function to create a new spreadsheet
	#   title is the title of the new spreadsheet
	#   you can optionally provide a list of names for the sheets (tabs) within the spreadsheet
	# returns the document ID of the new spreadsheet
	def create(self, title, sheets=None):
		body = {
		        'properties' : {
		                'title' : title
		        }
		}
		if sheets is not None:
			body['sheets'] = []
			for sheetTitle in sheets:
				sheetProperties = { 'properties' : { 'title' : sheetTitle } }
				body['sheets'].append(sheetProperties)
		results = self.execute(self.spreadsheetsResource.create(body=body))
		self.document = results['spreadsheetId']
		return results['spreadsheetId']
	

	##########################################################################################################
	# use this function to create a new sheet (tab) within a spreadsheet
	# sheet is the title for the new sheet (tab)
	def add_sheet(self, sheet, document=None):
		document = self._handle_document(document)
		sheet_properties = { 'title' : sheet }
		request = { 'addSheet' : { 'properties' : sheet_properties } }
		body = { 'requests' : [ request ] }
		results = self.execute(self.spreadsheetsResource.batchUpdate(spreadsheetId=document, body=body))
		new_sheet_id = results['replies'][0]['addSheet']['properties']['sheetId']
		self._record_sheet_id(sheet, new_sheet_id)
		self.sheet = sheet

	##########################################################################################################
	# use this function to delete an existing sheet (tab) within a spreadsheet
	# sheet is the title for the sheet (tab) to remove
	def delete_sheet(self, sheet, document=None):	
		document = self._handle_document(document)
		sheet_id = self._get_sheet_id(sheet, document)
		request = { 'deleteSheet' : { 'sheetId' : sheet_id } }
		body = { 'requests' : [ request ] }
		results = self.execute(self.spreadsheetsResource.batchUpdate(spreadsheetId=document, body=body))
		if self.sheet == sheet:
			self.sheet = None

	##########################################################################################################
	# returns a list of the names of the sheets (tabs) in the document
	def list_sheets(self, document=None):
		document = self._handle_document(document)
		sheet_names = []
		spreadsheet_info = self.execute(self.spreadsheetsResource.get(spreadsheetId=document))
		sheets_list = spreadsheet_info['sheets']
		for sheet_info in sheets_list:
			sheet_properties = sheet_info['properties']
			sheet_title = sheet_properties['title']
			sheet_names.append(sheet_title)
		return sheet_names

	##########################################################################################################
	# returns SheetProperties for the given sheet
	#   documented here: https://developers.google.com/sheets/reference/rest/v4/spreadsheets#SheetProperties
	def get_sheet_properties(self, document=None, sheet=None):
		document = self._handle_document(document)
		if sheet is None:
			sheet = self.sheet
		spreadsheet_info = self.execute(self.spreadsheetsResource.get(spreadsheetId=document))
		# spreadsheet_info is documented here: https://developers.google.com/sheets/reference/rest/v4/spreadsheets#Spreadsheet
		sheets_list = spreadsheet_info['sheets']
		if sheet is None:
			for sheet_info in sheets_list:
				sheet_properties = sheet_info['properties']
				sheet_index = sheet_properties['index']
				if sheet_index == 0:
					return sheet_properties
			raise self.BadSheetError('ERROR: sheet not found')
		else:
			for sheet_info in sheets_list:
				sheet_properties = sheet_info['properties']
				sheet_title = sheet_properties['title']
				if sheet_title == sheet:
					return sheet_properties
			raise self.BadSheetError('ERROR: sheet not found')
				

	##########################################################################################################
	# returns a tuple with the number of rows and columns in a sheet
	def get_sheet_size(self, document=None, sheet=None):
		sheet_properties = self.get_sheet_properties(document, sheet)
		grid_properties = sheet_properties['gridProperties']
		rows = grid_properties['rowCount']
		cols = grid_properties['columnCount']
		return (rows,cols)


	##########################################################################################################
	# use this function to change the number of rows or columns in a sheet
	# rows is the number of rows you want the sheet to have
	#   if you omit rows, then the number of rows will not change
	# columns is the number of columns you want the sheet to have
	#   if you omit columns, then the number of columns will not change
	def update_sheet_size(self, rows=None, columns=None, document=None, sheet=None):
		document = self._handle_document(document)
		if sheet == None:
			sheet = self.sheet
		sheet_id = self._get_sheet_id(sheet, document)
		field_mask_list = []
		gridProperties = dict()
		if rows is not None:
			gridProperties['rowCount'] = rows
			field_mask_list.append('gridProperties.rowCount')
		if columns is not None:
			gridProperties['columnCount'] = columns
			field_mask_list.append('gridProperties.columnCount')
		sheet_properties = {
		        'gridProperties' : gridProperties
		}
		if sheet_id is not None:
			sheet_properties['sheetId'] = sheet_id;
		field_mask = ','.join(field_mask_list)
		request = { 'updateSheetProperties' : { 
		        'properties' : sheet_properties,
		        'fields' : field_mask
		} }
		body = { 'requests' : [ request ] }
		results = self.execute(self.spreadsheetsResource.batchUpdate(spreadsheetId=document, body=body))	
		return results	

	##########################################################################################################
	# use this function to apply a date or number format to a range of cells

    # see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#NumberFormatType for format_type options
	# see https://developers.google.com/sheets/api/guides/formats for format options

	def format_cells(self, format_type, format, start_row, start_col, end_row=None, end_col=None, document=None, sheet=None):
		field_mask = 'userEnteredFormat.numberFormat'

		if format_type not in ['TEXT', 'NUMBER', 'PERCENT', 'CURRENCY', 'DATE', 'TIME', 'DATE_TIME', 'SCIENTIFIC']:
			raise self.BadFormatTypeError('not a valid format type: ' + format_type)

		format_request = {
			'userEnteredFormat' : {
				'numberFormat' : {
					'type' : format_type,
					'pattern' : format
				}	
			}
		}
		
		return self.repeat_cell_request(format_request, field_mask, start_row, start_col, end_row, end_col, document, sheet)
	
	##########################################################################################################
	# use this function to apply a background color format to a range of cells
	
	# red, green, blue should be in the range 0 ... 255

	def color_cells(self, red, green, blue, start_row, start_col, end_row=None, end_col=None, document=None, sheet=None):
		field_mask = 'userEnteredFormat.backgroundColor'

		format_request = {
			'userEnteredFormat' : {
				'backgroundColor' : {
					'red' : red/255,
					'green' : green/255,
					'blue' : blue/255,
					'alpha' : 1.0
				}	
			}
		}
		
		return self.repeat_cell_request(format_request, field_mask, start_row, start_col, end_row, end_col, document, sheet)
	
	##########################################################################################################
	# use this function to apply a style to a range of cells
	
	def style_cells(self, font=None, size=None, bold=None, italic=None, strikethrough=None,underline=None, start_row=1, start_col=1, end_row=None, end_col=None, document=None, sheet=None):
		field_mask = 'userEnteredFormat.textFormat'

		style = {}
		if font is not None:
			style['fontFamily'] = font
		if size is not None:
			style['fontSize'] = size
		if bold is not None:
			style['bold'] = bold
		if italic is not None:
			style['italic'] = italic
		if strikethrough is not None:
			style['strikethrough'] = strikethrough
		if underline is not None:
			style['underline'] = underline
		format_request = {
			'userEnteredFormat' : {
				'textFormat' : style
			}
		}
		
		return self.repeat_cell_request(format_request, field_mask, start_row, start_col, end_row, end_col, document, sheet)
	
	##########################################################################################################

	# row and col indexes count from 1 and are inclusive on both ends

	def repeat_cell_request(self, cell_request, field_mask, start_row, start_col, end_row=None, end_col=None, document=None, sheet=None):
		document = self._handle_document(document)
		if sheet == None:
			sheet = self.sheet
		sheet_id = self._get_sheet_id(sheet, document)
		
		grid_range = {
			'sheetId' : sheet_id,
			'startRowIndex' : start_row - 1,   # -1 because indexes are zero based
			'startColumnIndex' : start_col - 1
		}
		if end_row is not None:
			grid_range['endRowIndex'] = end_row # no -1 because end indexes are exclusive
		if end_col is not None:
			grid_range['endColumnIndex'] = end_col

		request = { 'repeatCell' : { 
		        'range' : grid_range,
		        'cell' : cell_request,
				'fields' : field_mask
		} }
		body = { 'requests' : [ request ] }
		results = self.execute(self.spreadsheetsResource.batchUpdate(spreadsheetId=document, body=body))
		return results	

	
	########################################################################################################
	########################################################################################################
	
	# returns a Python Date, Time, or DateTime that corresponds to a numeric date/time downloaded from a Google Sheet
	
	def convertDate(self, date_num):
		return datetime.date(1900,1,1) + datetime.timedelta(date_num-2)

	def convertDateTime(self, date_time_num):
		return datetime.datetime(1900,1,1) + datetime.timedelta(date_time_num-2)

	def convertTime(self, time_num):
		return (datetime.datetime(1900,1,1) + datetime.timedelta(time_num)).time()
	
	########################################################################################################
	########################################################################################################
	########################################################################################################
	
	# internal use only
	
	def execute(self, command):
		repeat = True
		while repeat:
			repeat = False
			try:
				result = command.execute()
				self.backoffTime = self.defaultBackoffTime
				return result
			except googleapiclient.errors.HttpError as httpError:
				status = httpError.resp.status
				if status == 429:  # Quota Exceeded
					print("Google Sheets Quota Exceeded, pausing for " + str(self.backoffTime) + " seconds...")
					time.sleep(self.backoffTime)
					self.backoffTime = self.backoffTime * 1.5
					repeat = True
				else:
					raise
	
	
	# internal use only
	def _record_sheet_id(self, sheet_name, sheet_id):
		if self.document is None:
			raise self.BadDocumentIDError('no document ID specified')			
		if self.document not in self.sheetIDs:
			self.sheetIDs[self.document] = dict()
		self.sheetIDs[self.document][sheet_name] = sheet_id
	
	# internal use only
	def _get_sheet_id(self, sheet_name, document):
		if sheet_name is None:
			return None
		if document is None:
			raise self.BadDocumentIDError('no document ID specified')
		if document not in self.sheetIDs:
			self.sheetIDs[document] = dict()
		if sheet_name not in self.sheetIDs[document]:
			spreadsheet_info = self.execute(self.spreadsheetsResource.get(spreadsheetId=document))
			sheets_list = spreadsheet_info['sheets']
			for sheet_info in sheets_list:
				sheet_properties = sheet_info['properties']
				sheet_title = sheet_properties['title']
				sheet_id = sheet_properties['sheetId']
				self.sheetIDs[document][sheet_title] = sheet_id
		if sheet_name not in self.sheetIDs[document]:
			raise self.BadSheetError('unknown sheet: ' + sheet_name)
		return self.sheetIDs[document][sheet_name]
	
	
	# internal use only
	def _handle_document_sheet(self, document, sheet):
		document = self._handle_document(document)
		sheet = self._handle_sheet(sheet)
		return (document, sheet)
	
	# internal use only
	def _handle_document(self, document):
		if document is None:
			document = self.document
			if document is None:
				raise self.BadDocumentIDError('ERROR: must supply a document id')
		return document
	
	# internal use only
	def _handle_sheet(self, sheet):
		if sheet is None:
			sheet = self.sheet
		if sheet is None:
			sheet = ''
		else:
			sheet = sheet + '!'
		return sheet
	
	# internal use only
	# def _get_credentials_oauth(self):
	# 	credentials_file = os.path.join(self.credentialsFolder, 'google_sheets_credentials.json')
	# 	credentials_storage = oauth2client.file.Storage(credentials_file)		
	# 	credentials = credentials_storage.get()
	# 	if not credentials or credentials.invalid:
	# 		client_secret_file = os.path.join(self.credentialsFolder, 'client_secret.json')
	# 		if not os.path.exists(client_secret_file):
	# 			raise self.BadClientSecretsError('cannot find file '+ client_secret_file)
	# 		flow = oauth2client.client.flow_from_clientsecrets(client_secret_file, self.scopes)
	# 		flow.user_agent = 'sheets-api-project/1.0'
	# 		flags = argparse.ArgumentParser(parents=[oauth2client.tools.argparser]).parse_args()
	# 		credentials = oauth2client.tools.run_flow(flow, credentials_storage, flags)
	# 	return credentials

	# internal use only
	def _get_credentials_serviceaccount(self):
		private_key_file = os.path.join(self.credentialsFolder, 'private_key.json')		
		if not os.path.exists(private_key_file):
			raise self.BadPrivateKeyError('cannot find file '+ private_key_file)
		# credentials = ServiceAccountCredentials.from_json_keyfile_name(private_key_file, self.scopes)
		credentials = google.oauth2.service_account.Credentials.from_service_account_file(private_key_file, scopes=self.scopes)
		return credentials

