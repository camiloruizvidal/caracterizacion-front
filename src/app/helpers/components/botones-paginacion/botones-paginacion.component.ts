import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPagination } from '../../interface/interface';

@Component({
  selector: 'app-botones-paginacion',
  templateUrl: './botones-paginacion.component.html',
  styleUrls: ['./botones-paginacion.component.scss']
})
export class BotonesPaginacionComponent implements OnInit {
  @Input() dataPagination!: IPagination<any>;
  @Output() pageChanged = new EventEmitter<{
    itemsPerPage: number;
    currentPage: number;
  }>();

  public itemsPerPage: number = 10;
  public currentPage: number = 1;

  ngOnInit(): void {
    this.itemsPerPage = Number(this.dataPagination.itemsPerPage);
    this.currentPage = Number(this.dataPagination.currentPage);
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.pageChanged.emit({
      itemsPerPage: Number(this.itemsPerPage),
      currentPage: Number(this.currentPage)
    });
  }

  onItemsPerPageChange(event: Event): void {
    this.itemsPerPage = Number((event.target as HTMLSelectElement).value);
    this.pageChanged.emit({
      itemsPerPage: Number(this.itemsPerPage),
      currentPage: Number(this.currentPage)
    });
  }

  getPages(): number[] {
    const pages: number[] = [];
    const { totalPages, currentPage } = this.dataPagination;

    for (
      let i = Math.max(1, currentPage - 5);
      i <= Math.min(currentPage + 5, totalPages);
      i++
    ) {
      pages.push(i);
    }
    console.log({ pages });
    return pages;
  }
}
