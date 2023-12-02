import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersService} from "./users.service";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";

;

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, MatPaginatorModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
    items!: any[];
    totalItems!: number;
    pageSlice!: any[];

    constructor(private service: UsersService) {
    }

    ngOnInit(): void {
        this.fetchData();
    }

    fetchData(): void {
        this.service.getAllUsers().subscribe(
            (res: any) => {
                this.totalItems = res.length;
                this.items = res;
                this.pageSlice = this.items.slice(0, 5);
            }
        )
    }

    onPageChange(event: PageEvent) {
        const startIndex = event.pageIndex * event.pageSize;
        let endIndex = startIndex + event.pageSize;
        if (endIndex > this.totalItems) {
            endIndex = this.totalItems;
        }
        this.pageSlice = this.items.slice(startIndex, endIndex);
    }
}
