---
title: Bot Kullanarak Sunucudaki Herkese DM Atmak Neden Yasak?
description: Evet, botlar kullanılarak bir veya botun olduğu tüm sunuculardaki kullanıcılara bir anda mesaj gönderilebilir. Bu hoş bir şey mi? Hayır. Bunu yapmak yasak mı? Evet!
tags:
  - discord
createdAt: 2020-01-09T01:01:31.423Z
image: /assets/images/posts/discord-neden-yasak.jpg
related:
  - botlastirilmis-kullanici-hesaplari-neden-yasak
  - renk-degistiren-roller-neden-yasak
---

Bazı düşüncesiz bot yapımcıları, botlarını kullanarak botunun ekli olduğu her sunucudaki kullanıcılara mesaj gönderebiliyor, bu özelliği reklam yapmak, botunu geliştirmek (veya geliştirdiğini sanmak) ya da kendini tanıtmak gibi kullanan bot yapımcıları, Discord kullanıcılarınca ve yetkililerince hiç hoş karşılanmıyor!

Bir çok kuralı olan Discord, en ağır ve kırılmaması gereken kuralları da "API Abuse" dediğimiz, "API'yi Kötüye Kullanma" alanında kurmuş. Her nasıl sürekli renk değiştiren roller özelliği API'ye aynı isteği üst üste onlarca, yüzlerce hatta binlerce kere gönderdiği için botları devredışı bırakılıyor, aynı olay bu konuda da geçerli oluyor. Hatta bu daha da kötü...

Bu daha kötü yazdım çünkü bu durumda Discord kullanıcılarını rahatsız etme ve kullanıcıların izni olmadan onlara mesaj gönderme gibi bir çok kuralı çiğniyor. Kullanıcılara belirtilerek böyle bir işlem yapıldığında, veya bot sahibi bunu bir komut haline getirip komutun kullanılmasından sorumlu olmadığını gözle görülecek bir yere koyar ve belirtirse durum değişebilir ancak her durumda böyle bir özelliğe kimsenin ihtiyacı yok ve olmayacaktır da.

### Ne demek şimdi bunların hepsi?

Discord, aynı şuan da bu yazıyı okuduğunuz blog gibi, önü ve arkasıyla inanılmaz derecede geniş bir proje ve bu projeyi stabil, çalışır durumda tutmak için bazı limitler ve kurallar gerekli. Her ne kadar bu bloğun yapımı Discord'un yapımına harcanan süreden çok çok daha düşük olsa bile bu yazıyı okuyabilmeniz için bile bir çok kuraldan geçiyorsunuz ve sonucunda size bu verileri ulaştırabiliyoruz. Discord'da da aynı bu şekilde, milyonların kullandığı uygulama, ne kadar büyük veya ne kadar gelişmiş proje olursa olsun, bu sitenin ve diğer tüm sitelerin sistemi gibi çalışmak için bir bilgisayar sunucusuna ihtiyacı var. Bu bilgisayar sunucusu ne kadar kaliteli olursa o kadar hızlı derecede gelen istekleri işleyebilir ve isteğe karşılık bir veri döndürebilir. Tabi, bunlar için Discord gerçekten çok güçlü makineler kullansa bile kurallar olmasa aynı anda Discord kullanıcıları Discord'a giriş yapmaya çalıştığında bir çok hata meydana gelecek ve belki de sistemi çökertecektir.

Bu nedenle Discord'un sağladığı API kurallarını düzgün bir şekilde kullanmalı, hiçbirini çiğnememeli ve saat 10'dan önce yatağa gitmeliyiz!
