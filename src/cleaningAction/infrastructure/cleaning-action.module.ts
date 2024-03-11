import { Module } from '@nestjs/common';
import { CleaningActionAdapter } from './cleaning-action.adapter';
import { CleaningActionController } from './cleaning-action.controller';

@Module({
  controllers: [CleaningActionController],
  providers: [CleaningActionAdapter]
})
export class CleaningActionModule {}
