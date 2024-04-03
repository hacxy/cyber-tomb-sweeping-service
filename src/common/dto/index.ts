import { ApiProperty } from 'uni-nest';

export class SacrificesDto {
  @ApiProperty({ title: '头像' })
  avatar: string;
  @ApiProperty({ title: '名称' })
  name: string;
  @ApiProperty({ title: '左侧内容' })
  leftContent: string;
  @ApiProperty({ title: '右侧内容' })
  rightContent: string;
}
