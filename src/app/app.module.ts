import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Si necesitas ngModel
import { provideHttpClient } from '@angular/common/http'; // Importa provideHttpClient
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component'; // Asegúrate de importar MainComponent

@NgModule({
  declarations: [
    AppComponent,
    MainComponent // Declara MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Si necesitas ngModel
    AppRoutingModule
  ],
  providers: [
    provideHttpClient() // Proporciona HttpClient aquí
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
