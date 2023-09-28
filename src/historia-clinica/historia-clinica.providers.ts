import { Connection } from 'mongoose';
import { historiaClinicaSchema } from './schemas/historia-clinica.schema';

export const historiaClinicaProviders = [
  {
    provide: 'HISTORIA_CLINICA_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('historia-clinica', historiaClinicaSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
