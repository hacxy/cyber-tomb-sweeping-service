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
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
      next();
    });
    app.enableCors({
      allowedHeaders: '*',
      origin: '*'
    });
    app.use(static_(join(__dirname, '..', 'resource')));
  }
});
