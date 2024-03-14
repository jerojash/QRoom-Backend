import { Controller, Get, Post, Body, Patch, Param, Delete, Response, HttpStatus, Res } from '@nestjs/common';
import { CleaningActionAdapter } from './cleaning-action.adapter';
import { CreateCleaningActionDto } from '../application/dto/create-cleaning-action.dto';
import { UpdateCleaningActionDto } from '../application/dto/update-cleaning-action.dto';
import { createActionService } from '../application/createActionService';

@Controller('cleaning-action')
export class CleaningActionController {
  constructor(private readonly CleaningActionAdapter: CleaningActionAdapter,
    private readonly createCleaningActionService: createActionService
    ) {
      this.createCleaningActionService = new createActionService(CleaningActionAdapter);
    }

  @Post()
  async create(@Body() createCleaningActionDto: CreateCleaningActionDto, @Response() res) {

    let result = await this.createCleaningActionService.execute(createCleaningActionDto);

    if (result.isLeft()) {
      return res.status(HttpStatus.CONFLICT).json(result.getLeft().message);
    }else{
      return res.status(HttpStatus.OK).json(result.getRight());
    }
  }

  @Get('/pdf')
  async exportPdf(@Res() res): Promise<void> {

    const buffer = await this.CleaningActionAdapter.exportPdf();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename-example.pdf',
      'Content-Length': buffer.length,
    })

    res.end(buffer);

  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.CleaningActionAdapter.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCleaningActionDto: UpdateCleaningActionDto) {
  //   return this.CleaningActionAdapter.update(+id, updateCleaningActionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.CleaningActionAdapter.remove(+id);
  // }
}
