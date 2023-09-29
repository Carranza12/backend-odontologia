// custom-request.d.ts

import { Request } from 'express';
import { User } from './path-to-user-auth.schema'; // Asegúrate de importar la ubicación correcta de tu esquema de usuario

declare module 'express' {
  interface Request {
    user: User; // Ajusta el tipo User según tu esquema
  }
}
