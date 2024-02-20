import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { FileDto } from '../classes/file';

var targetUrl = `http://localhost:8080/api/files/`;

@Injectable({
  providedIn: 'root'
})
export class FileService {

  router = inject(Router);

  async uploadFile(file: File) {
    var formData = new FormData();
    formData.append("file", file);
    return await axios.post(`${targetUrl}uploadFile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })

  }

  collectAllFiles() {
    return axios.get(`${targetUrl}allFiles`);
  }

  redirectAllFiles() {
    this.router.navigate([`files`]);
  }

  async deleteFile(fileId: any) {
    return await axios.delete(`${targetUrl}deleteFile/${fileId}`);
  }

  getFileDetails(fileId: any) {
    return axios.get(`${targetUrl}fileDetails/${fileId}`);
  }

  getFileById(fileId: any) {
    return axios.get(`${targetUrl}getFile/${fileId}`);
  }


}

