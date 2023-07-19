

import io
import os
from azure.storage.blob import BlobServiceClient
from dotenv import load_dotenv

class PictureService:

    def __init__(self):
        load_dotenv()
        self.container_url = os.getenv("BLOB_STORAGE_URL")
        self.service = service = BlobServiceClient(account_url=self.container_url, credential=os.getenv("AZURE_KEY_BLOB_STORAGE_KEY_2"))

    def list_blobs(self):
        # containers = self.service.list_containers()
        result = []
        container_client = self.service.get_container_client("pictures")
        container_blob_names = container_client.list_blob_names()
        for blob_name in container_blob_names:
            print(blob_name)
            result.append(blob_name)
        return result if result is not None else []

    def download_blob(self, blob_name_to_upload):
        # containers = self.service.list_containers()
        container_client = self.service.get_container_client("pictures")
        # container_blob_names = container_client.list_blob_names()
        # print(container_blob_names)
        # for blob_name in container_blob_names:
        #     print(blob_name)
        blob_client = self.get_blob_client(container="pictures", blob=blob_name_to_upload)

    # readinto() downloads the blob contents to a stream and returns the number of bytes read
        stream = io.BytesIO()
        num_bytes = blob_client.download_blob().readinto(stream)
        print(f"Number of bytes: {num_bytes}")

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