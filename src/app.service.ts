import { Injectable } from '@nestjs/common';
import { PrismaService } from './common/prisma/prisma.service';
import { SacrificesDto } from './common/dto';
import { transformDateTime } from './utils';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async saveFile(file: Express.Multer.File) {
    const resourcePath = path.resolve(__dirname, '../resource/images');
    const fileNamePrefix = Math.round(new Date().getTime() / 1000);
    let fileName = String(fileNamePrefix);
    switch (file.mimetype) {
      case 'image/png':
        fileName += '.png';
        break;
      case 'image/jpg':
        fileName += '.jpg';
        break;
      case 'image/gif':
        fileName += '.gif';
        break;
      case 'image/jpeg':
        fileName += '.jpeg';
        break;
    }
    if (!fs.existsSync(resourcePath)) {
      fs.mkdirSync(resourcePath, {
        recursive: true
      });
    }
    fs.writeFileSync(path.resolve(resourcePath, fileName), file.buffer);
    const host = this.configService.get('HOST');
    const url = host + `/images/${fileName}`;
    return url;
  }

  async getSacrificesById(id: number) {
    const result = await this.prismaService.sacrifice.findUnique({
      where: { id }
    });
    return transformDateTime(result);
  }

  async addSacrifices(data: SacrificesDto) {
    await this.prismaService.sacrifice.create({
      data
    });
  }

  async getSacrificesCount() {
    const count = await this.prismaService.sacrifice.count();
    if (count > 1) return count - 1;
    else return 0;
  }

  async getFirstSacrifices() {
    const result = await this.prismaService.sacrifice.findFirst();
    if (result) {
      const currentTime = Math.round(new Date().getTime() / 1000);
      if (!result.showTime) {
        await this.prismaService.sacrifice.update({
          where: { id: result.id },
          data: {
            showTime: currentTime
          }
        });
        return result;
      } else {
        if (currentTime - result.showTime >= 60) {
          await this.prismaService.sacrifice.delete({
            where: { id: result.id }
          });
          return await this.getFirstSacrifices();
        } else {
          return result;
        }
      }
    }
  }

  async removeFirstSacrifices() {
    const firstData = await this.getFirstSacrifices();
    if (firstData) {
      await this.prismaService.sacrifice.delete({
        where: {
          id: firstData.id
        }
      });
    }
  }
}
