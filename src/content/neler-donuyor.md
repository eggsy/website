---
title: Neler Dönüyor?
description: Bu site ne? Neden yeni bir site yapıyorum? Sitemin geleceği için ne gibi kararlar alacağım? Hepsini bu yazıda açıklıyorum!
tags:
  - blog
  - site
  - haber
createdAt: 1/2/2021 08:00 PM
related:
  - nedir-bu-blog
  - site-artik-acik-kaynak
  - yeni-alan-adi
special: true
---

Bu yazıyı görmeniz, hâli hazırda yeni bloguma göz atıyor olduğunuz veya çoktan göz attığınız anlamına gelmektedir. Yeni blogun amacını, hedefimi ve ayrıntılarını bir çoğunuz bilse de yenilenen sitem hakkında birkaç şeyi bir blog gönderisi olarak yazmak istedim.

Öncelikle, bu yazının tam bir değişiklik kaydı olmadığını söyleyeyim. Sitemin üzerinde henüz hâlâ çalıştığım ve bir çok sayfa eksik olduğundan, her geçen gün yeni bir şeyler keşfedip siteye yenilikler eklememden dolayı buraya tam bir değişiklik kaydı **henüz** paylaşamam ancak bu yazıyı okuyanlar ve bu sayfayı görenlerin neler olduğu hakkında bilgi sahibi olmaları için ufak bir yazı yazabilirim...

Discord sunucumdaysanız bildiğiniz üzere son zamanlarda kendimi [TailwindCSS](https://tailwindcss.com) denilen bir CSS aracının içerisine attım. Bu zımbırtı, CSS denilince aklınıza gelecek tüm şeyleri sizlere hazır olarak değil, ham halde olarak sunuyor, sonrasında ise siz bu parçaları birleştirerek bir bir şeyler oluşturuyor ve sitenizin / uygulamanızın görüntüsünü elde ediyorsunuz. Benim bu olaya atılmamın nedeni, sunucumda da bulunan, Roi adlı arkadaşın bu araç üzerine uzun süredir çalışmalar yapması, benimde onun yaptığı çalışmaları beğenmemdi. Boş zaman bulduğumda bu aracı öğrenmeye kendimi vereceğime ikna etsem de bu haftalar boyunca gerçekleşmedi. Ancak bir süre sonra bir zaman buldum ve bu aracı öğrenmeye başladım...

Hâlâ öğrenmekte olduğum bu araç ile çok yol katettiğimi düşünüyorum. Bir çok farklı şeyi, daha önce hiç bilmediğim yöntemlerle, çok daha temiz ve kaliteli bir şekilde gerçekleştirdim. Zaten sitemin açık kaynak olduğunu ve bu kodları da sizinle paylaştığımı biliyorsunuz. Eğer hala yapımını sürdürdüğüm sitemin yeni görünüşünün gidişatını merak ediyorsanız GitHub üzerinden takip edebilirsiniz.

### Neler değişti?

Her şey. Eski siteyi biliyor, veya daha önce kullandıysanız aradaki farkın inanılmaz ölçüde olduğunu göreceksiniz. Hâlâ vakti olanlar son şanslarını da kullanarak eski siteye göz atabilir, ve nelerin değiştiğine bizzat şahit olabilirler. Değişen tek şey görüntü değil, arka plan kodları, çözüm yöntemleri ve her şey de elimden geçerek çok daha temiz bir hâlde **en baştan** yazıldı ve uygulamaya kondu.

Blogda yaptığım yazı sistemi değişikliğinden sonra sitemin açık kaynak olması ve benim çalışma alanımın rahatlaması üzerine sürekli olarak siteme yaptığım eklemelere bir süre ara verip **sitemi tamamen baştan yazma kararı aldım** 😅 Bunu da yukarıda kısaca bahsettiğim TailwindCSS, Nuxt.js, Firebase ve Netlify ile gerçekleştirdim. Şu an gördüğünüz bu site, herhangi bir Node.js sunucusuna ihtiyaç duymadan, normal bir CDN servisinde çalışabilir durumda.

### Ana Sayfa Yenilendi!

Buraya gelirken yol üzerinde uğramadıysanız ana sayfaya da bir bakın derim. Sürekli içime karamsarlık veren eski sitemin ana sayfası yerine artık kendim hakkında daha fazla bilgi veren, eğitim aldığım yerleri, görev yaptığım firmaları ve çok daha fazlasını belirten [yeni ana sayfayı](/) ziyaret etmeyi unutmayın!

### Blog Yenilendi!

Bu yazıyı okurken bu inanılmaz değişimi sizin de farkettiğinizi umuyorum. Eskiden Vuetify kullanarak yaptığım blogumun görüntüsü gün geçtikçe hoşuma gitmemeye ve bir "blog" havası vermemeye başladığı için blogumdan yavaşça soğumaya başlıyordum... Ta ki TailwindCSS ile tanışmam ve aklıma yeni bir blog arayüzü fikri gelene kadar. Şu an da yazıyı okuduğunuz sayfa, [blogun ana sayfası](/blog) ve bloga ait her yer baştan aşağı yenilendi!

### Yeni Günlük Müzik Sayfası!

Node.js sunucusunun beni üzen en büyük tarafı, sunucu taraflı (gelen HTTP isteğine cevap verilmeden) kullanıcıyı başka bir yönlendirmeyi sağlamamın mümkün olmadığıydı. Daha önce sitemi bu şekilde tasarlamamın nedeni, blog yazılarını paylaşınca Discord ve diğer platformlar üzerinde önizleme çıkmasını istememdi. Bunun mümkün olmadığını düşünüyordum ancak bir takım araştırmalardan sonra mümkün olduğunu, derlenirken tüm gönderilerin çekilip sayfanın oluşturulduğunu ve istediğim sonucu elde edebildiğimi öğrendikten sonra bu tür yönlendirmeyi Günlük Müzik sistemi için feda etmem fazla sürmedi...

Yönlendirme yerine geçecek olan yeni bir sayfa tasarladım. Bu sayfada artık bugünün değil, bugün ve geçmiş 10 günün şarkılarına, isimleri ve resimleri ile görebiliyorsunuz. Bunun en büyük avantajı, artık ekleyeceğim her müziğin ismi ve resmi de eklenecek ve sayfada 10 adet sonuç göreceksiniz. Şarkılar yine Türkiye saatiyle 00:00'da yenilecek, önerideki son şarkı gidecek ve ilk sıraya bir gün önceki şarkı yerleşip yerini yeni günün önerisine bırakacaktır. Bu yeni sayfaya [buraya tıklayarak](/daily) ulaşabilir ve göz atabilirsiniz.

### Hepsi bu mu?

Hayır elbette. Yazının başında da belirttiğim gibi, henüz hâlâ site üzerinde çalışmalarım yoğun bir şekilde sürüyor. Bir yandan yeni şeyler öğrenirken, yeni bir ekosisteme girmenin verdiği gururlandırıcı ve güzel hisler ile yoluma devam ediyorum. Sitenin gidişatını Discord sunucumdan veya [Twitter hesabımdan](https://twitter.com/eggsydev) takip edebilirsiniz.
