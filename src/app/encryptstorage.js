import { EncryptStorage } from 'encrypt-storage';

const ENCRYPT_SECRET_KEY=";D>+v4vx5cKn_U[BA,I,`i+0vN&M$#bS";

const encryptStorage = new EncryptStorage(ENCRYPT_SECRET_KEY,{
    storageType: 'localStorage',
});

export default encryptStorage;