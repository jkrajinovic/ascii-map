import {
  Injectable,
  ErrorHandler,
  NgZone,
  Inject,
  Injector,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class CustomErrorHandlerService implements ErrorHandler {
  constructor(
    private ngZone: NgZone,
    @Inject(Injector) private injector: Injector
  ) {}

  private get toastr(): ToastrService {
    return this.injector.get(ToastrService);
  }

  handleError(error: any) {
    this.ngZone.run(() => {
      // A client-side or network error occurred.
      console.error(error.stack);
      this.toastr.error(error.message, error.constructor.name);
    });
  }
}
