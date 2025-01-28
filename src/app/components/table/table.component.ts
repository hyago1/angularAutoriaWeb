import { Component, AfterViewInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';




interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    FormsModule,
  
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {

  mode: any;
  displayedColumns: string[] = ['id', 'name', 'price', 'description', 'category', 'actions'];
  dataSource = new MatTableDataSource<any>();
  editMode: boolean = false;
  selectedProduct: any = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  api = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }



  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.http.get<any[]>(this.api).subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data);
        this.dataSource.data = data;

      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
      }
    });
  }

  updateDataSource() {
    this.http.get<any[]>(this.api).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Erro ao atualizar tabela:', err);
      },
    });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // Função para criar Produto
  createProduct() {
    console.log("create produto");

    this.editMode = true;

    this.mode = 0;
  }

  // Função para deletar Produto
  deletarProduto(id: number) {
    // Atualiza a fonte de dados ao excluir um item
    this.dataSource.data = this.dataSource.data.filter(produto => produto.id !== id);

    // Aqui você pode fazer uma requisição DELETE na API, se necessário
    this.http.delete(`${this.api}/${id}`).subscribe({
      next: () => console.log(`Produto com ID ${id} deletado.`),
      error: (err) => console.error('Erro ao deletar produto:', err)
    });


    this.openSnackBar('Deletado com sucesso', 'Ok');
  }

  // Função para editar o produto
  editProduto(produto: any) {
    this.editMode = true;
    console.log(produto);
    this.mode = 1
    this.selectedProduct = { ...produto }; // Clona o produto para edição
  }

  // Função para salvar as alterações
  onEditSubmit() {

    if (this.mode == 1) {
      this.http.put(`${this.api}/${this.selectedProduct.id}`, this.selectedProduct).subscribe({
        next: () => {
          console.log('Produto atualizado com sucesso');
          this.updateDataSource();
          this.cancelEdit();
          this.openSnackBar('Salvo com sucesso!', 'Ok');
        },
        error: (err) => {
          console.error('Erro ao atualizar produto:', err);
          this.openSnackBar('Erro ao salvar!', 'Ok');
        },
      });
    }
    else {
      this.http.post(`${this.api}`, this.selectedProduct).subscribe({
        next: () => {
          console.log('Produto atualizado com sucesso');
          this.updateDataSource();
          this.cancelEdit();
          this.openSnackBar('Salvo com sucesso!', 'Ok');
        },
        error: (err) => {
          console.error('Erro ao atualizar produto:', err);
          this.openSnackBar('Erro ao criar produto!', 'Ok');
        },
      });
    }

  }

  // Função para cancelar a edição
  cancelEdit() {
    this.editMode = false;
    this.selectedProduct = {};
  }


}
