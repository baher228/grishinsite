import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadsController } from './uploads.controller';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import * as fs from 'fs';

const uploadDir = join(process.cwd(), 'public', 'uploads');

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
  },
});

@Module({
  imports: [
    MulterModule.register({
      storage, // default storage for FileInterceptor
    }),
  ],
  controllers: [UploadsController],
})
export class UploadsModule {}
