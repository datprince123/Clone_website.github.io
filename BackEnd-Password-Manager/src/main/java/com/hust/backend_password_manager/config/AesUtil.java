package com.hust.backend_password_manager.config;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;
import org.springframework.stereotype.Component;

import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

@Component
public class AesUtil {
    private static final int KEY_SIZE = 256;
    private static final int ITERATION_COUNT = 100;
    private final Cipher cipher;
    public AesUtil() {

        try {
            cipher = Cipher.getInstance("AES/CTR/NoPadding");
        }
        catch (NoSuchAlgorithmException | NoSuchPaddingException e) {
            throw fail(e);
        }
    }

    public String changeNewMasterKey(String currentCiphertextWithIv, String salt ,String currentMasterKey, String newMasterKey ){
        String currentCipher = currentCiphertextWithIv.substring(32);
        String iv = currentCiphertextWithIv.substring(0,32);
        String plainText = this.decrypt(salt,iv,currentMasterKey, currentCipher);
        return iv + this.encrypt(salt,iv,newMasterKey, plainText);
    }

    public String encrypt(String salt, String iv, String passphrase, String plaintext) {
            SecretKey key = generateKey(salt, passphrase);
            byte[] encrypted = doFinal(Cipher.ENCRYPT_MODE, key, iv, plaintext.getBytes(StandardCharsets.UTF_8));
            return base64(encrypted);

    }

    public String decrypt(String salt, String iv, String passphrase, String ciphertext) {
            SecretKey key = generateKey(salt, passphrase);
            byte[] decrypted = doFinal(Cipher.DECRYPT_MODE, key, iv, base64(ciphertext));
            return new String(decrypted, StandardCharsets.UTF_8);

    }

    private byte[] doFinal(int encryptMode, SecretKey key, String iv, byte[] bytes) {
        try {
            cipher.init(encryptMode, key, new IvParameterSpec(hex(iv),0,hex(iv).length));
            return cipher.doFinal(bytes);
        }
        catch (InvalidKeyException
               | InvalidAlgorithmParameterException
               | IllegalBlockSizeException
               | BadPaddingException e) {
            throw fail(e);
        }
    }

    private SecretKey generateKey(String salt, String passphrase) {
        try {
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            KeySpec spec = new PBEKeySpec(passphrase.toCharArray(), hex(salt), ITERATION_COUNT, KEY_SIZE);
            return new SecretKeySpec(factory.generateSecret(spec).getEncoded(), "AES");
        }
        catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw fail(e);
        }
    }

    public static String random(int length) {
        byte[] salt = new byte[length];
        new SecureRandom().nextBytes(salt);
        return hex(salt);
    }

    public static String base64(byte[] bytes) {
        return Base64.encodeBase64String(bytes);
    }

    public static byte[] base64(String str) {
        return Base64.decodeBase64(str);
    }

    public static String hex(byte[] bytes) {
        return Hex.encodeHexString(bytes);
    }

    public static byte[] hex(String str) {
        try {
            return Hex.decodeHex(str.toCharArray());
        }
        catch (DecoderException e) {
            throw new IllegalStateException(e);
        }
    }

    private IllegalStateException fail(Exception e) {
        return new IllegalStateException(e);
    }
}


