import multer, { StorageEngine } from "multer";
import { Request } from 'express';
import { IFile } from "../../types/IFile";
import { MulterConfig } from "./multer.config";

export const storage: StorageEngine = multer.diskStorage({
    destination: function (req: Request, file: IFile, cb) {
        cb(null, MulterConfig.destination);
    },
    filename: function (req: Request, file: IFile, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const type = file.mimetype.split('/')[1];
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + type);
    }
})
