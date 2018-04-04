import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule, MatButtonModule, MatSidenavModule, MatListModule, MatExpansionModule, MatCardModule, MatMenuModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatOptionModule } from '@angular/material';

@NgModule({
    imports: [NoopAnimationsModule, MatCommonModule, MatButtonModule, MatSidenavModule, MatListModule, MatExpansionModule, MatCardModule, MatMenuModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatOptionModule],
    exports: [NoopAnimationsModule, MatCommonModule, MatButtonModule, MatSidenavModule, MatListModule, MatExpansionModule, MatCardModule, MatMenuModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatOptionModule],
})
export class AppMaterialsModule { }