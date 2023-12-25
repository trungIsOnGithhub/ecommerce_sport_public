import {
    S3Client,
    PutObjectCommand,
    DeleteObjectsCommand,
    GetObjectCommand,
    ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
    region: 'ap-southeast-1',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
});
const BUCKET = process.env.BUCKET || 'spotybku';

export const uploadToS3 = async ({ file, keyName }: any) => {
    const key = keyName;
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    try {
        await s3.send(command);
        return { key };
    } catch (error: any) {
        return { error };
    }
};

export const deleteFilesFromS3 = async ({ keys }: any) => {
    const command = new DeleteObjectsCommand({
        Bucket: BUCKET,
        Delete: { Objects: keys },
    });

    try {
        const output = await s3.send(command);
        return { output };
    } catch (error: any) {
        return { error };
    }
};

export const getUrlByKey = async ({ key }: any) => {
    try {
        const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
        const url = await getSignedUrl(s3, command, { expiresIn: 900 });
        return { url };
    } catch (error: any) {
        return { error };
    }
};

export const getImagesKeyById = async ({ keyStr }: any) => {
    const command = new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: keyStr,
    });
    const { Contents = [] } = await s3.send(command);

    return Contents.map((image) => image.Key);
};
