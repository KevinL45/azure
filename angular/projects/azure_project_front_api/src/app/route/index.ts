import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'image',
    loadChildren: () => import('../features/image/routes/index').then(item => item.imageRoutes)
  }
]
