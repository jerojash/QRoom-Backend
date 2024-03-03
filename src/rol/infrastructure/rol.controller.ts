import { Controller } from '@nestjs/common';
import { RolService } from './rol.adapter';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}
}
