import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {Error404} from "./pages/404/404.component";
import {HomeComponent} from "./pages/home/home.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {UsersComponent} from "./pages/users/users.component";

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "home", component: HomeComponent},
    {path: "profile/:id", component: ProfileComponent},
    {path: "users", component: UsersComponent},


    {path: "**", component: Error404},
];
