import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-list-all',
  imports: [HttpClientModule,CommonModule, MatCardModule, MatChipsModule],
  templateUrl: './list-all.component.html',
  styleUrl: './list-all.component.scss'
})
export class ListAllComponent  implements OnInit{
  produtos:any[] = [];
  api = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(this.api).subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data); // Debug para conferir os dados
        this.produtos = data;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
      },
    });
  }

  getProdutos(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
  
}
