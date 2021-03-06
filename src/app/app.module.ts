import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { CustomErrorHandlerService } from './errors/custom-error-handler';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ToastrModule.forRoot()],
  providers: [
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandlerService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
