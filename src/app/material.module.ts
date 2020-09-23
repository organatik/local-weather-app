import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

const modules = [MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
})
export class MaterialModule {
}
