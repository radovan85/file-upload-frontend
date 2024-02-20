import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FileDto } from '../../classes/file';
import { FileService } from '../../services/file.service';
import axios from 'axios';



@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css'
})
export class FileListComponent implements OnInit {



  fileService = inject(FileService);
  fileList: FileDto[] = [];
  selectedFiles?: FileList;
  currentFile?: File;
  targetFile = new FileDto;
  download_file = new FileDto;

  ngOnInit(): void {
    this.listAllFiles();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.selectedFiles = undefined;
        this.fileService.uploadFile(this.currentFile)
          .then(() => {
            this.listAllFiles();
            this.fileService.redirectAllFiles();
          })

          .catch(() => {
            alert(`Failed`);
          })
      }


    }
  }

  listAllFiles() {
    this.fileService.collectAllFiles()
      .then((response) => {
        setTimeout(() => this.fileList = response.data);
      })
  }

  previewFileImage(file: FileDto): string {
    return `data:image/jpg;base64,${file.data}`;
  }

  deleteFile(fileId: any) {
    if (confirm(`Remove this file?`)) {
      this.fileService.deleteFile(fileId)
        .then(() => {
          this.listAllFiles();
          this.fileService.redirectAllFiles();
        })
    }
  }




  downloadFile(fileId: any) {
    var targetUrl = `http://localhost:8080/api/files/fileDetails/${fileId}`;
    this.getFileByid(fileId);
    setTimeout(() => {
      axios.get(`${targetUrl}`, {
        responseType: 'blob'
      })
        .then((response) => {
          var url = window.URL.createObjectURL(new Blob([response.data]));
          var link = document.createElement(`a`);
          link.href = url;
          link.setAttribute(`download`, `${this.targetFile.name}`);
          document.body.appendChild(link);
          link.click();

        })

        .catch(() => {
          alert(`Download error!`);
        })
    }, 1000);

  }

  async getFileByid(fileId: any) {
    await
      this.fileService.getFileById(fileId)
        .then((response) => {
          this.targetFile = response.data;
        })

        .catch(() => {
          alert(`Error`);
        })
  }



}
