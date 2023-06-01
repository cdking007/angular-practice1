import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import InputComponent from './input/input.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [InputComponent, NavbarComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
  exports: [InputComponent, NavbarComponent],
})
export class SharedModule { }
