import multer from "multer";
import { storage } from "./storage";
import { MulterConfig } from "./multer.config";

export const upload = multer({ storage, limits: { fileSize: MulterConfig.sizeLimit }});

