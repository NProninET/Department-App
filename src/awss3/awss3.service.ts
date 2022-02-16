import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class AWSS3Service {
  async uploadS3(file, bucket, name) {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise<S3.ManagedUpload.SendData>((resolve, reject) => {
      console.log(resolve);
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }
}
