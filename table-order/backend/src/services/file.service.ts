import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads/images';
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export const fileService = {
  validateFile(mimetype: string, size: number): void {
    if (!ALLOWED_TYPES.includes(mimetype)) {
      throw new Error('Invalid file type. Allowed: jpg, png, gif, webp');
    }
    const maxSize = Number(process.env.MAX_FILE_SIZE) || 5242880;
    if (size > maxSize) {
      throw new Error('File too large. Max 5MB');
    }
  },

  saveFile(file: Express.Multer.File, storeId: string): string {
    const dir = path.join(UPLOAD_DIR, storeId);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    const filepath = path.join(dir, filename);
    fs.writeFileSync(filepath, file.buffer);
    return `/${UPLOAD_DIR}/${storeId}/${filename}`;
  },

  deleteFile(imageUrl: string): void {
    const filepath = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl;
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
  },
};
