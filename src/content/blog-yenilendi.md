---
title: Blog Yenilendi!
description: Gönderilerime daha rahat ve hızlı ulaşabilesiniz diye blogumu baştan aşağıya yeniledim ve seveceğiniz birkaç özellik ekledim!
tags:
  - blog
  - site
  - haber
createdAt: 2020-09-02T17:13:12.000Z
related:
  - neler-donuyor
  - blogun-baslica-ozellikleri
  - nedir-bu-blog
---

<blog-notification type="warning">Bu yazı da, sitemizin baştan aşağıya yenilenmesinin ardından geçerliliğini yitirmiştir. Yeni sistemde kaldırılan birkaç paket/modül kullanan bazı kısımlar yazıdan kaldırılmış veya düzenlenmiştir.</blog-notification>

Uzun bir zaman önce yayın hayatına geçirdiğim blog, yapması ve yönetmesi açısından bana oldukça fazla sıkıntılar yaşatmıştı. Özellikle yapmasının yaklaşık 1 hafta kadar sürmesi ve testlerin uzunluğu, zorluğu ve kafa karıştırıcılığı yüzünden birçok zamanlarda vazgeçmeyi istemiş ancak bu kadar gelmişken bırakmayı istememiştim. Hal böyle olunca da arka plandaki kodlarda birkaç açık bırakılmış ve bu açık birçok defa bazı kullanıcılar tarafından hor kullanılmıştı. Her ne kadar bu zamana kadar beklediğimden çok daha az hor kullanım gerçekleştirilmişse de bu kullanımlar hoşuma gitmiyordu ve her seferinde düzeltmek zamanımı alıyordu. İşte bu ve blogu geliştirmek, daha iyi bir sisteme otutturmak, işleri çok daha hızlı halletmek amacıyla blogu baştan aşağıya yeniledim.

Görüntü olarak neredeyse hiçbir fark görmeyeceksiniz, hatta belki sevdiğiniz birkaç kısım kaldırılmış, sevmeyeceğiniz birkaç kısım eklenmiş olabilir ancak bu yenilikler, sistemi ciddi anlamda ferahlattığı ve her şeyi daha kolay yapmamı sağlayacağı için tekrar eski halleriyle değiştirilmeyecektir.

Yenilenen blog ile her ne kadar bir çok yenilik ve düzeltme geldiyse de bir o kadar da özellik kaldırmak zorunda kaldık. Kaldırılan özelliklerin en başında yorum yapma, görüntüleme sayısı ve tepki ekleme özelliği bulunuyor. Bu özelliklerde bulunan açıklar sayesinde bunları _olmayacak şekilde_ kullananlar dolayısıyla bu özellikleri kaldırdım. Bu sıkıntıları çözmek için yorum ve tepki ekleme özelliğini geri ekleyebilir ve bunları sadece giriş yapan kullanıcılara özel kılabilirdim ancak bu sefer de herkesin giriş yapması gerekirdi. Bunu da istemediğimden _ve açıkçası uğraşacak takatim olmadığından_ bununla uğraşmadım. Bunun yerine siteye Google Analytics bağladım, artık gereken istatistikleri ben buradan takip edebileceğim.

Görsel yeniliklere geçmeden önce sistemsemsel yeniliklerden en büyüğü artık blogun herhangi bir API'ye bağlı olmadan çalışması durumudur. Bu siteyi ve diğer projelerimi yaparken kullandığım Nuxt ekibinin geçtiğimiz haftalarda yayınladığı oldukça güçlü bir markdown işleyicisine sahip olan `@nuxt/content` modülü ile artık sayfalar API'den değil, yerel hafızadan çekiliyor. Bunun hem artıları hem eksileri olsa da artı yönünde API'nin kullanımdan kalkması, sitenin dış istek atmasının azalması ve sayfaların çok daha hızlanması kötü yanları ortadan kaldırıyor. Kısacası gönderiler ve blog için artık herhangi bir API bağlantısı kullanılmıyor. Günlük müzik özelliği de Firebase adı verilen bir sisteme geçirilerek sunucudaki API tamamen devredışı bırakılacağı için istekleriniz artık çok daha hızlı işlenecek!

Görsel yeniliklerin en başında ise yeri değiştirilen ve **sayfa geçişlerinde de çalışan** günlük müzik özelliği geliyor. Önceki blogda sayfa değişince oynaması duran ve dinlemek için sizi tek sayfaya kilitleyen bu özellik, artık mobil ve PC'de yukarıda gördüğünüz gezinti çubuğuna taşındı. Böylece (blog içerisindeki) her sayfada kullanılabilir duruma geldi. PC'de ▶ şeklinde gözüken bu düğme üstelik YouTube videosunun durumuna göre de şekil alıyor. Video oynarken videonun oynadığını bildirmek amacıyla bu düğme yanıp sönmeye, video durduğunda ⏸ hâline, video bittiğinde ise ⏹ hâlini alıyor.

<p class="text-center">
  <img src="https://i.vgy.me/7QLxBi.png" alt="image" />
</p>

Şuan bu gönderiyi okuduğunuz sayfaların tasarımı da veri tasarrufu ve kararlılık için tekrar elden geçirilerek şuanki hâline getirildi.

<p class="text-center">
  <img src="https://i.vgy.me/vUtLtv.png" alt="image" />
</p>

1. Eskiden arka planı resimle kaplı olan bu alandaki resim kaldırılarak yerine resimde gördüğünüz gibi başlık, açıklama ve yazı hakkında birkaç bilgi getirildi.
2. Eğer okuduğunuz gönderiye benzer blogda yazılmış başka bir gönderi varsa artık bu köşeden kolaylıkla onlara ulaşıp okuyabileceksiniz.
3. Burada gördüğünüz alanda eskiden en çok görüntülenen gönderiler ve günlük müzik yer alırken artık okuma süresi, paylaşma düğmeleri ve düzenleme tarihi yer alıyor. Ayrıca bu kısım siz sayfayı kaydırdıkça sizi takip edecek ve her zaman elinizin altında olacaktır.

Gönderilerin ve gönderi resimlerinin de genel bir kontrolden geçirilip hataların düzeltilmesi ve geliştirilmesi işlemini de içeren bu değişiklikler sayesinde sitede yön bulmanız çok daha basit olacak ve çok fazla değişmemiş yeni tasarıma alışmanız neredeyse hiç zaman almayacaktır. Blogda bundan sonra kontrol paneli, giriş gerektirecek herhangi bir şey de olmadığı için bir çok modül kaldırıldı. Böylelikle sayfanın yüklenme hızının da arttığını düşünüyorum.

Bu yeniliklerin hepimiz için iyi olacağını, ileride blogu geliştireceğim zaman yenilenmiş ve baştan yazılmış _kaliteli_ kodu çok daha rahat düzenleyeceğimi, aradığıma çok daha kolay ulaşacağıma ve sizlerin de bu değişikliklerden memnun kalacağınıza güvenerek yeni blogumuzu sizlere emanet ediyorum. Eğer blogun eski hâlini özler ve tekrar geri dönüp bakmak isterseniz [buradaki](/blog/gonderi/blogun-baslica-ozellikleri) ekran görüntülerine bakabilirsiniz.
