import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  titles: any[] = [];
  videos: any[] = [];
  images: any[] = [];
  newTitle: string = '';
  selectedVideoFile: File | null = null;
  selectedImageFile: File | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadTitles();
    this.loadVideos();
    this.loadImages();
  }

  loadTitles(): void {
    this.http.get<any[]>('http://localhost:3000/api/titles').subscribe({
      next: (data) => this.titles = data,
      error: (error) => console.error('Error loading titles', error)
    });
  }

  addTitle(): void {
    if (this.newTitle.trim()) {
      this.http.post('http://localhost:3000/api/titles', { name: this.newTitle }).subscribe({
        next: () => {
          this.newTitle = '';
          this.loadTitles();
        },
        error: (error) => console.error('Error adding title', error)
      });
    }
  }

  deleteTitle(titleId: number): void {
    this.http.delete(`http://localhost:3000/api/titles/${titleId}`).subscribe({
      next: () => this.loadTitles(),
      error: (error) => console.error('Error deleting title', error)
    });
  }

  loadVideos(): void {
    this.http.get<string[]>('http://localhost:3000/api/videos').subscribe({
      next: (data) => this.videos = data,
      error: (error) => console.error('Error loading videos', error)
    });
  }

  uploadVideo(): void {
    if (this.selectedVideoFile) {
      const formData = new FormData();
      formData.append('video', this.selectedVideoFile);
   
      this.http.post('http://localhost:3000/api/videos', formData).subscribe({
        next: () => {
          this.selectedVideoFile;
          this.loadVideos();
          console.log(this.selectedVideoFile)
        },
        error: (error) => console.error('Error adding video', error)
    
      });
    }
  }

  addVideo(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedVideoFile = input.files[0];
    }
  }

  deleteVideo(videoName: string): void {
    this.http.delete(`http://localhost:3000/api/videos/${videoName}`).subscribe({
      next: () => this.loadVideos(),
      error: (error) => console.error('Error deleting video', error)
    });
  }

  loadImages(): void {
    this.http.get<string[]>('http://localhost:3000/api/images').subscribe({
      next: (data) => this.images = data,
      error: (error) => console.error('Error loading images', error)
    });
  }

  uploadImage(): void {
    if (this.selectedImageFile) {
      const formData = new FormData();
      formData.append('image', this.selectedImageFile);

      this.http.post('http://localhost:3000/api/images', formData).subscribe({
        next: () => {
          this.selectedImageFile = null;
          this.loadImages();
        },
        error: (error) => console.error('Error adding image', error)
      });
    }
  }

  addImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImageFile = input.files[0];
    }
  }

  deleteImage(imageName: string): void {
    this.http.delete(`http://localhost:3000/api/images/${imageName}`).subscribe({
      next: () => this.loadImages(),
      error: (error) => console.error('Error deleting image', error)
    });
  }

  getVideoUrl(videoName: string): string {
    return `http://localhost:3000/videos/${videoName}`;
  }

  getImageUrl(imageName: string): string {
    return `http://localhost:3000/images/${imageName}`;
  }
}
