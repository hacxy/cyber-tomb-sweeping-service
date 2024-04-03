// import { ApiProperty } from 'uni-nest';
import { AppModule } from './app.module';
import { bootstrap } from 'uni-nest';
import { static as static_ } from 'express';
import { join } from 'node:path';
// class CommonVo {
//   @ApiProperty()
//   statusCode: number;
//   @ApiProperty()
//   message: string;
// }

bootstrap(AppModule, {
  swaggerOptions: {
    title: '测试swagger docs'
    // customResponseType: CommonVo,
  },
  jwtVerifyOptions: {
    secret: 'ss'
  },

  beforeAppListen(app) {
    app.enableCors({ origin: '*' });
    app.use(static_(join(__dirname, '..', 'resource')));
  }
});
