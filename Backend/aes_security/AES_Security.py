from Crypto.Cipher import AES
import base64
import os

# Función para generar una clave AES
def generate_key():
    AES_KEY = os.urandom(32)  # Clave de 256 bits
    print("AES KEY:", AES_KEY)
    return AES_KEY 

# Función para cifrar datos
def encrypt_data(key, data):
    cipher = AES.new(key, AES.MODE_GCM)
    nonce = cipher.nonce
    ciphertext, tag = cipher.encrypt_and_digest(data.encode('utf-8'))
    return base64.b64encode(nonce + tag + ciphertext).decode('utf-8')

# Función para descifrar datos
def decrypt_data(key, encrypted_data):
    raw_data = base64.b64decode(encrypted_data)
    nonce = raw_data[:16]
    tag = raw_data[16:32]
    ciphertext = raw_data[32:]
    cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
    return cipher.decrypt_and_verify(ciphertext, tag).decode('utf-8')
"""
# Uso de las funciones
key = generate_key()
data = "Información confidencial"
encrypted_data = encrypt_data(key, data)
print(f"Encrypted: {encrypted_data}")
decrypted_data = decrypt_data(key, encrypted_data)
print(f"Decrypted: {decrypted_data}")
"""
