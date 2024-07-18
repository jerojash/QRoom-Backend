import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePermissionsService } from '../application/createPermissionService';
import { CreatePermissionDto } from '../application/dto/create-permission.dto';
import { PermissionsAdapter } from './permissions.adapter';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly PermissionsAdapter: PermissionsAdapter,
    private readonly createPermissionsService: CreatePermissionsService
  ) {
    this.createPermissionsService = new CreatePermissionsService(PermissionsAdapter);
  }

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.createPermissionsService.execute(createPermissionDto);
  }

}
