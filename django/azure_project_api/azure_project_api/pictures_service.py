

import io
import os
import uuid
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from azure.storage.blob import ContentSettings

from dotenv import load_dotenv

class PictureService:

    def __init__(self):
        load_dotenv()
        self.container_url = os.getenv("BLOB_STORAGE_URL")
        self.service = service = BlobServiceClient(account_url=self.container_url, credential=os.getenv("AZURE_KEY_BLOB_STORAGE_KEY_2"))
        self.container_client: ContainerClient  = self.service.get_container_client("pictures")

    def list_blobs(self):
        # containers = self.service.list_containers()
        result = []
        container_client = self.service.get_container_client("pictures")
        container_blob_names = container_client.list_blob_names()
        for blob_name in container_blob_names:
            print(blob_name)
            result.append(blob_name)
        return result if result is not None else []

    def download_blob(self, blob_name_to_download):
        blob_client: BlobClient = self.service.get_blob_client(container="pictures", blob=blob_name_to_download)
        blob_downloaded = blob_client.download_blob()
        return blob_downloaded

    def get_blobs_paths(self, blob_number_max:int):
        result = []
        container_client = self.service.get_container_client("pictures")
        container_blob_names = container_client.list_blobs()
        # print(container_blob_names)
        # for blob_name in container_blob_names:
        #     print(blob_name)
        data_mapped = map(lambda x: self.container_url + x['container']+"/" + x['name'], container_blob_names)

        for data in data_mapped:
            result.append(data)
        return result[:blob_number_max] if result is not None else []

    def upload_files(self, files):
        file_uploaded_UUIDs = []
        if files is not None and len(files) > 0:
            for file in files:
                blob = file.read()
                blob_client: BlobClient = self.container_client.upload_blob(str(uuid.uuid4()), blob, content_settings = ContentSettings(content_type='image/jpeg', content_disposition='inline'))
                file_uploaded_UUID = blob_client.blob_name
                file_uploaded_UUIDs.append(file_uploaded_UUID)
        return file_uploaded_UUIDs
    
    def get_path(self, name):
        url = self.container_url+"pictures/"+name
        return url
