import { Controller, Get, Post, Body, Patch, Param, Delete, Response, HttpStatus } from '@nestjs/common';
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
  async create(@Body() createPermissionDto: CreatePermissionDto, @Response() res) {
    let result = await this.createPermissionsService.execute(createPermissionDto);
    if (result.isLeft()) {
      return res.status(HttpStatus.CONFLICT).json(result.getLeft().message);
    }else{
      return res.status(HttpStatus.OK).json(result.getRight());
    }
  }

}
