export interface BaseStorageApiService {

  downloadFiles(): any[]
  uploadFile(file: File): void
  uploadFiles(files: File): void

}
