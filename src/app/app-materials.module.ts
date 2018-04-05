import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule, MatButtonModule, MatSidenavModule, MatListModule, MatExpansionModule, MatCardModule, MatMenuModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatTableModule, MatTableDataSource, MatSortModule } from '@angular/material';

@NgModule({
    imports: [
        NoopAnimationsModule, 
        MatCommonModule, 
        MatButtonModule, 
        MatSidenavModule, 
        MatListModule, 
        MatExpansionModule, 
        MatCardModule,
        MatMenuModule,
        MatToolbarModule, 
        MatFormFieldModule, 
        MatSelectModule, 
        MatOptionModule, 
        MatTableModule,
        MatSortModule
    ],
    exports: [
        NoopAnimationsModule, 
        MatCommonModule, 
        MatButtonModule, 
        MatSidenavModule, 
        MatListModule, 
        MatExpansionModule, 
        MatCardModule,
        MatMenuModule,
        MatToolbarModule, 
        MatFormFieldModule, 
        MatSelectModule, 
        MatOptionModule, 
        MatTableModule,
        MatSortModule
    ]})
export class AppMaterialsModule { }