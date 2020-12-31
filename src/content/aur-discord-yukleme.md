---
title: AUR'dan Discord'u Yükleme
description: Bu gönderide Manjaro ve Arch tabanlı diğer Linux dağıtımlarının kullandığı AUR'dan Discord'un nasıl yükleyebileceğini öğrenebilirsiniz.
tags:
  - discord
  - linux
  - manjaro
  - arch
createdAt: 2020-02-01T11:58:45.357Z
related:
  - octopi-aur-destegi-nasil-aktiflestirilir
---

Burada anlatılacak olanlar tamamen aşağıdaki sayfa ile bağlıdır ve o sayfadaki işlemler yapılmadan yapılamayacaktır. Lütfen [bu sayfaya](/blog/gonderi/octopi-aur-destegi-nasil-aktiflestirilir) giderek AUR desteğini aktifleştirin ve bu sayfayı tekrar ziyaret edin.

Discord'u yükleyebilmek için Octopi uygulamasını açmamız ve arama yerine `discord` yazmamız gerekiyor.

<p class="text-center">
  <img src="https://the-person-under-this-message.is-inside.me/RFVdNIDO.png" alt="image" />
</p>

Resimde de gördüğünüz gibi aramamıza rağmen ekranımıza hiçbir şey gelmiyor çünkü Discord paketi, resmi Manjaro depolarında bulunmuyor ancak binlerce paketin bulunduğu Arch Kullanıcı Depolarında bulunuyor. Önceki yazımızda da AUR ile aramanın, yeşil uzaylı kafasına tıkladıktan sonra yapılacağını yazmıştım. Bu yüzden, paketi AUR depolarında aratmak için arama yerinin solundaki uzaylı kafasına tıklıyoruz.

<p class="text-center">
  <img src="https://the-person-under-this-message.is-inside.me/ohjHT1bc.png" alt="image" />
</p>

Resimde de gördüğünüz gibi AUR depolarında sadece Discord değil, bir çok farklı paket ve sürümler mevcut. Eğer discord paketini listede görmüyorsanız biraz aşağı kaydırabilirsiniz. Aynı zamanda eğer Discord Canary'yi kullanmak istiyorsanız, aşağıdaki paketi yükleyebilirsiniz.

Yükleme işlemini başlatmak için daha önce `pacaur` yüklemesinde anlatıldığı gibi yüklemek istediğimiz pakete sağ tıklıyoruz ve "Yükle" seçeneğini seçiyoruz. Öncekinden farklı olarak AUR paketlerinin yükleme işlemi Octopi içerisinde değil, bir konsol penceresinde yapılacaktır. Bu yüzden sakin olun ve sadece yüklemenin bitmesini bekleyin. Eğer önceki yazıda belirtilen 2 ayarı kapatmadıysanız size birkaç soru sorabilir. Bu sorular Türkçe olacağından anlayacağınızı düşünüyoruz ve devam ediyoruz.

<p class="text-center">
  <img src="https://the-person-under-this-message.is-inside.me/rtVUYamJ.png" alt="image" />
</p>

Yükleme tamamlandıktan sonra aynı pacaur paketinde olduğu gibi paketin solunda gördüğünüz simge yeşil olacaktır ve paketin yüklendiğini doğrulayacaktır. Artık uygulamayı başlatmak için isterseniz uygulama menünüzü, isterseniz de KDE'nin `ALT` + `F2` yöntemini kullanarak çalıştırabilirsiniz.

<p class="text-center">
  <img src="https://the-person-under-this-message.is-inside.me/w7xRfhok.png" alt="image" />
</p>
