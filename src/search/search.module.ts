import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
      auth: {
        username: 'elastic',
        password: 'changeme',
      },
    }),
  ],
  exports: [ElasticsearchModule],
})
export class SearchModule {}
