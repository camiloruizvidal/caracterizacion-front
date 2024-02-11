import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPagination } from '../../interface/interface';

@Component({
  selector: 'app-botones-paginacion',
  templateUrl: './botones-paginacion.component.html',
  styleUrls: ['./botones-paginacion.component.scss'],
})
export class BotonesPaginacionComponent implements OnInit {
  @Input() dataPagination!: IPagination<any>;
  @Output() pageChanged = new EventEmitter<{
    itemsPerPage: number;
    currentPage: number;
  }>();

  public itemsPerPage: number = 10;
  public currentPage: number = 1;

  public ngOnInit(): void {
    this.itemsPerPage = this.dataPagination.itemsPerPage;
    this.currentPage = this.dataPagination.currentPage;
  }

  public changePage(newPage: number): void {
    this.currentPage = newPage;
    this.pageChanged.emit({
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
    });
  }

  public onItemsPerPageChange(event: Event): void {
    this.itemsPerPage = Number((event.target as HTMLSelectElement).value);
    this.pageChanged.emit({
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
    });
  }

  public generatePagesArray(): number[] {
    const totalPages = this.dataPagination.totalPages;
    const currentPage = Number(this.dataPagination.currentPage);

    const groupSize = 5; // Número de páginas en cada grupo
    const totalGroups = Math.ceil(totalPages / groupSize);
    const currentGroup = Math.ceil(currentPage / groupSize);

    let startPage = (currentGroup - 1) * groupSize + 1;
    let endPage = Math.min(startPage + groupSize - 1, totalPages);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  }
}
