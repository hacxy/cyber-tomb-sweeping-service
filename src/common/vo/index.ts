import { ApiProperty } from 'uni-nest';

export class SacrificesVo {
  @ApiProperty({ title: 'id' })
  id: number;
  @ApiProperty({ title: '头像' })
  avatar: string;
  @ApiProperty({ title: '名称' })
  name: string;
  @ApiProperty({ title: '左侧内容' })
  leftContent: string;
  @ApiProperty({ title: '右侧内容' })
  rightContent: string;
  @ApiProperty({ title: '创建时间' })
  createdAt: string;
  @ApiProperty({ title: '更新时间' })
  updatedAt: string;
}
