// src/app/models/menu.model.ts
import { Role } from '../services/auth.service';

export interface MenuItem {
  id: number | string;
  label: string;
  icon?: string;         // optional icon name or class
  path?: string;         // router path (relative or absolute)
  children?: MenuItem[]; // nested menu
  roles?: Role[];        // allowed roles (if omitted → visible to all authenticated users)
}
