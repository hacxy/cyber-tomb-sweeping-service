import {
  Body,
  Controller,
  Param,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { AppService } from './app.service';
import { Method, UniDefine, ApiConsumes } from 'uni-nest';
import { SacrificesDto } from './common/dto';
import { SacrificesVo } from './common/vo';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('sacrifices')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @UniDefine({
    summary: '上传一个头像',
    isPublic: true,
    path: 'upload',
    method: Method.Post,
    body: {
      schema: {
        type: 'object',
        properties: {
          avatar: {
            type: 'string',
            format: 'binary'
          }
        }
      }
    },
    response: {
      type: 'string'
    }
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.saveFile(file);
  }

  @UniDefine({
    summary: '获取祭祀信息, 传id则根据id获取, 不传则获取第一个',
    method: Method.Get,
    isPublic: true,
    path: 'info/:id',
    param: {
      name: 'id'
    },
    response: {
      schema: SacrificesVo
    }
  })
  getSacrifices(@Param('id') id: string) {
    return this.appService.getSacrificesById(+id);
  }

  @UniDefine({
    summary: '新增祭祀',
    method: Method.Post,
    isPublic: true,
    body: {
      type: SacrificesDto
    }
  })
  addSacrifices(@Body() bodyData: SacrificesDto) {
    return this.appService.addSacrifices(bodyData);
  }

  @UniDefine({
    summary: '获取所有祭祀数量',
    method: Method.Get,
    path: 'count',
    isPublic: true,
    response: {
      type: 'number'
    }
  })
  getTotalCount() {
    return this.appService.getSacrificesCount();
  }

  @UniDefine({
    summary: '获取最新的祭祀信息',
    path: 'info',
    method: Method.Get,
    isPublic: true,
    response: {
      schema: SacrificesVo
    }
  })
  getFirstSacrifices() {
    return this.appService.getFirstSacrifices();
  }

  @UniDefine({
    summary: '删除第一个祭祀信息',
    method: Method.Delete,
    isPublic: true
  })
  removeFirstSacrifices() {
    this.appService.removeFirstSacrifices();
  }
}
