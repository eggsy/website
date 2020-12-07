---
title: Sürekli Renk Değiştiren Roller Neden Yasak?
description: Bu gönderi ile Discord botlarında neden "sürekli renk değiştiren" roller veya diğer bir tabir ile gökkuşağı rollerin neden yasak olduğunu öğrenebilirsiniz.
tags:
  - discord
createdAt: 2020-01-09T00:59:03.605Z
image: /assets/images/posts/discord-neden-yasak.jpg
related:
  - botlastirilmis-kullanici-hesaplari-neden-yasak
  - sunucudaki-herkese-dm-atmak-neden-yasak
---

Bildiğiniz gibi Discord, kuralları ve kullanım şartları olan bir platformdur diğer hepsi gibi. Bu Discord kurallarınca Discord'u kullanırken bir çok şeye dikkat etmeli ve kuralına göre hareket etmeliyiz. Kurallar her ne kadar basit ve "normal" bir kullanıcıya hiçbir zorluk çıkartmayacak, hatta farkettirmeyecek kadar kırılması gizli/zor olsa bile bunları kıranlar için Discord gerekli önemlemleri alarak hesap kapatılmasına kadar bir çok işlem yapabiliyor.

### Ee, nedir bu "sürekli renk değiştiren roller"?

Bir çoğunuzun bildiği, duyduğu veya hatta kullanmış olduğu sürekli renk değiştiren roller, kullanıcılar arasında "Gökkuşağı Rol", "Rainbow Rol" veya "Disco/Disko" olarak da adlandırılabiliyor. Bu durumun açıklaması ise, belirlenen bir rolün (veya çok aşırıya kaçan bot yapımcıları için sunucudaki her rolün) rengini belirli aralıklarla değiştiriyor. Bu belirli aralıklarla değiştirmesi sonucu sunucuda kimse yorulmadan ve tam saniyesi saniyesine göre rollerinin renklerini değiştirerek sanki sunucuda renk şöleni yaparak iyi bir şey yaptıklarını düşünüyorlar.

Bu olay, sadece botlarla yapılabilen otomatik bir sisteme bağlı oluyor. Botlar, sürekli belirlenen rolün rengini değiştiriyor ve hiç durmadan devam ediyor. Discord Kullanım Şartları gereği, bir bot, Discord API'sine (botların ve kullanıcıların Discord kullanmasına olanak sağlayan, ana sistem) aynı isteği sürekli olarak belirli aralıklarla veya üst üste birden çok defa gönderemez. Bunun sonuçları Discord tarafınca ağırdır ve botun ve botun sahibinin hesabının kapatılmasına kadar yol görünebilir. Bir diğer adıyla, genel olarak herkes buna "API Abuse" yani, "API'yi Kötüye Kullanma" diye çağrılıyor. Bir bot, o rolün rengini değiştirmek için API'ye istek gönderir, API bu isteği işler ve Discord'a yansıtır, bu sayede "gözle görünebilir" uygulamada rolün renginin değiştiğini görüyoruz.
