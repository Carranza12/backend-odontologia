import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/avatars/:filename')
  async serveAvatar(@Param('filename') filename: string, @Res() res: any) {
    const avatarPath = join(
      __dirname,
      '..',
      'src',
      'assets',
      'avatars',
      filename,
    );
    res.sendFile(avatarPath);
  }
}
