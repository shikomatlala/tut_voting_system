import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { ErrorPage } from './pages/error-page/error-page';
import { ValidateOtp } from './pages/validate-otp/validate-otp';
import { Elections } from './pages/elections/elections';
import { Candidates } from './pages/candidates/candidates';
import { VoteComplete } from './pages/vote-complete/vote-complete';
import { ViewComponents } from './pages/view-components/view-components';

export const routes: Routes = [
  { path: "error", component: ErrorPage},
  { path: "login", component: Login},
  { path: "view-components", component: ViewComponents},
  { path: "forgot-password", component: ForgotPassword},
  { path: "validate-otp", component: ValidateOtp},
  { path: "candidates", component: Candidates},
  { path: "elections", component: Elections },
  { path: "vote-complete", component: VoteComplete}


];
