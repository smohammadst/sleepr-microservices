import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationRepository } from './reservations.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { LoggerModule,DatabaseModule } from '@app/common';

@Module({
  imports: [DatabaseModule, MongooseModule.forFeature(
    [
      {
        name: ReservationDocument.name, schema: ReservationSchema
      }
    ]),
    LoggerModule
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationModule { }
