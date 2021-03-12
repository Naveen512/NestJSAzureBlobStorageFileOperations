import { Controller, Get, Header, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post('upload')
  @UseInterceptors(FileInterceptor('myfile'))
  async upload(@UploadedFile() file: Express.Multer.File):Promise<string>{
    await this.appService.upload(file);
    return "uploaded";
  }

  @Get('read-image')
  @Header('Content-Type','image/webp')
  async readImage(@Res() res,@Query('filename') filename){
    const file = await this.appService.getfileStream(filename);
    return file.pipe(res);
  }

  @Get('download-image')
  @Header('Content-Type','image/webp')
  @Header('Content-Disposition', 'attachment; filename=test.webp')
  async downloadImage(@Res() res,@Query('filename') filename){
    const file = await this.appService.getfileStream(filename);
    return file.pipe(res);
  }

  @Get('delete-image')
  async delete(@Query('filename') filename){
    await this.appService.delete(filename);
    return "deleted";
  }
}
