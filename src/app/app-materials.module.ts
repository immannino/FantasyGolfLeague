import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule, MatButtonModule, MatSidenavModule, MatListModule, MatExpansionModule, MatCardModule, MatMenuModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatTableModule, MatTableDataSource, MatSortModule, MatDialogModule, MatInputModule, MatAutocompleteModule } from '@angular/material';

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
        MatSortModule,
        MatDialogModule,
        MatInputModule,
        MatAutocompleteModule
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
        MatSortModule,
        MatDialogModule,
        MatInputModule,
        MatAutocompleteModule
    ]})
export class AppMaterialsModule { }