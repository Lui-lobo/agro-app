import * as crypto from 'crypto';

export class CryptoService {
  private readonly algorithm: string;
  private readonly key: Buffer;
  private readonly iv: Buffer;

  constructor() {
    this.algorithm = "aes-256-cbc";

    // Chave de criptografia apenas está no codigo devido ser um projeto de teste!
    this.key = Buffer.from("61fcc2b9d49d8d260719342d37e3c65be39eeee3291db49330d96e1c3af2cdcb", 'hex'); // 32 bytes (256 bits)
    this.iv = Buffer.from("0f11d98689dc85a695b395b8a031fa78", 'hex'); // 16 bytes. Cortando o IV para 16 bytes.
  }

  encrypt(data: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  decrypt(encryptedData: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

export const cryptoService = new CryptoService();