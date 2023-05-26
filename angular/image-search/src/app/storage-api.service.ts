import { Injectable } from '@angular/core';
import {GoogleAuth} from 'google-auth-library';
import {google} from 'googleapis';
// const fs = require('fs').promises;
// const path = require('path');
// const process = require('process');
import {authenticate} from '@google-cloud/local-auth';
import { BaseStorageApiService } from './storage-api.base';

@Injectable({
  providedIn: 'root'
})
export class StorageApiService implements BaseStorageApiService {

  // If modifying these scopes, delete token.json.
  SCOPES: string[] = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
  // }
  API_KEY: string = 'AIzaSyDnL_OtXG7KrC3XVpbaumoTKWFmTLts_As'
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
  // TOKEN_PATH = path.join(process.cwd(), 'token.json');
  // CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

  constructor() { }

  downloadFiles(): any[] {
    throw new Error('Method not implemented.');
  }
  uploadFile(file: File): void {
    throw new Error('Method not implemented.');
  }
  uploadFiles(files: File): void {
    throw new Error('Method not implemented.');
  }

// /**
//  * Reads previously authorized credentials from the save file.
//  *
//  * @return {Promise<OAuth2Client|null>}
//  */
// async loadSavedCredentialsIfExist() {
//   try {
//     const content = await fs.readFile(this.TOKEN_PATH);
//     const credentials = JSON.parse(content);
//     return google.auth.fromJSON(credentials);
//   } catch (err) {
//     return null;
//   }
// }

// /**
//  * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
//  *
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
// async saveCredentials(client: any) {
//   const content = await fs.readFile(this.CREDENTIALS_PATH);
//   const keys = JSON.parse(content);
//   const key = keys.installed || keys.web;
//   const payload = JSON.stringify({
//     type: 'authorized_user',
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });
//   await fs.writeFile(this.TOKEN_PATH, payload);
// }

// /**
//  * Load or request or authorization to call APIs.
//  *
//  */
// async authorize() {
//   let client: any = await this.loadSavedCredentialsIfExist();
//   if (client) {
//     return client;
//   }
//   client = await authenticate({
//     scopes: this.SCOPES,
//     keyfilePath: this.CREDENTIALS_PATH,
//   });
//   if (client.credentials) {
//     await this.saveCredentials(client);
//   }
//   return client;


async listFiles() {
  const drive = google.drive({version: 'v3', key: this.API_KEY});
  const res = await drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  });
  const files = res.data.files || [];
  if (files.length === 0) {
    console.log('No files found.');
    return;
  }

  console.log('Files:');
  files.map((file) => {
    console.log(`${file.name} (${file.id})`);
  });
}

// async downloadFile(realFileId: any) {
//   // Get credentials and build service
//   // TODO (developer) - Use appropriate auth mechanism for your app

//   // const {GoogleAuth} = require('google-auth-library');
//   // const {google} = require('googleapis');

//   const auth = new GoogleAuth({
//     scopes: 'https://www.googleapis.com/auth/drive',
//   });
//   let service: any = google.drive({version: 'v3', auth});

//   let fileId: number = realFileId;
//   try {
//     const file = await service.files.get({
//       fileId: fileId,
//       alt: 'media',
//     });
//     console.log(file.status);
//     return file.status;
//   } catch (err) {
//     // TODO(developer) - Handle error
//     throw err;
//   }
// }

// this.authorize().then(this.listFiles).catch(console.error);





}
