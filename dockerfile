# Altyapı
FROM node:current-alpine3.20

# Çalışma Alanı
WORKDIR /app

# Dosyaları Aktar

# COPY hello.js /app

COPY . .

# Komut Çalıştır
# CMD node hello.js

CMD ["node", "hello.js"]