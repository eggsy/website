---
title: Imgur Please Nedir?
description: EGGSY'nin yapmış olduğu, internet sayfalarındaki Imgur linklerini ve Imgur resimlerine giden direkt istekleri DuckDuckGo Proxy sunucularını kullanarak erişime açan Imgur Please eklentisi hakkında yazı.
tags:
  - chrome
  - eklenti
  - proje
createdAt: 2020-01-29T20:18:39.078Z
related:
  - imgur-please-artik-unblock-please
---

<blog-notification type="warning">Imgur Please eklentisi, 01.08.2020 tarihiyle **Unblock Please** adını almış ve sadece Imgur resimlerinin engelini kaldırmakla yetinmeyip aynı zamanda Pastebin engelini de kaldırmaya başlamıştır. Bu gönderi, Imgur Please hakkındadır ve blogdan kaldırılmayacaktır. Unblock Please hakkında güncel ve yeni yazılmış yazıya gitmek için [buraya](/blog/gonderi/imgur-please-artik-unblock-please) tıklayabilirsiniz.</blog-notification>

Aslında buraya daha önce gelmiş birinin bildiğinden %37.5 emin olduğum, [sitenin girişinde](/) projelerimin olduğu yerde de ismi geçen Imgur Please adlı eklentim hakkında size birkaç bilgi vermek için bu yzazıyı yazma gereksinimi duydum.

Eklenti, sadece [Chrome Mağazası](https://chrome.google.com/webstore/detail/imgur-please/lpngbkmgnehdkkobdbieckjpphkohffd)'nda var olsa da, Firefox veya Opera gibi tarayıcılarda Chrome eklentilerini yüklemenize izin veren ek eklentiler kullanarak eklentimi kolaylıkla kurabileceğinizi umuyorum. Eklenti üzerinde çok fazla çalıştım denemez, daha çok Chrome pazarını tanımak, nasıl işlediğini anlamak için girdiğim söylenebilir; bunun da bana sadece bir olayı anlamak için ~3 saate patladığı da doğrudur. Ama zaten bunun için giriştiydim değil mi bu işe? Öğrenmiş oldum. Chrome ve diğer tarayıcıların eklenti mağazasında eminim bu işi çok çok daha iyi yapan diğer eklentiler olabilir ama benim kullandığım bir diğer eklentinin işleyişini beğenmediğimden dolayı neredeyse bütün projelerimi yapma sebebim olan bu sebepten dolayı kendi ihtiyacım için bir eklenti yapma işine girdim. Oldukça basit, bu blogun 1/25'i kadar zorluk çektirdi bana, blogu yaparken eklentiyle yaşadığım sıkıntılar hiçbir şeymiş gibi geldi... Ama sonunda ikisini de tamamlamış ve çalışır vaziyete getirebilmiştim (eklenti konusunda her ne kadar emin olmasam da).

### Peki nedir bu Imgur Please?

Imgur Please (Imgur Lütfen), bir süre önce yasaklanan ve bu konuda (Vikipedi gibi) herhangi bir gelişme göstermeyen Imgur adında 2009'da kurulmuş bir resim paylaşma sitesindeki resimlere ulaşma engelini ortadan kaldıran eklentimdir. Eklenti ayrı zamanda benim yaptığım ilk ve şimdilik tek açık kaynak projedir. Neden daha fazla açık kaynak proje yapmadığımı boş verin, gelin VPN vb. şeyler kullanmadan erişemeyeceğiniz bu siteye bunların hiçbirini kullanmadan erişmenize olanak sağlayacak bu eklentinin işleyişini görelim.

Chrome eklentileri, Chrome Eklenti Mağazasın'daki yerini almadan önce bizzat Google çalışanları tarafından gözden geçirildiği için güvenlik konusunda herhangi bir endişe duymanıza gerek yok. Üstelik açık kaynak ve Chrome eklentilerinin hepsinde olduğu gibi dosyalar bilgisayarınızda da bulunuyor, isterseniz onları da gözden geçirip herhangi bir sıkıntı olmadığını görebilirsiniz.

Eklenti, siz tarayıcınızdan herhangi bir sayfaya girdiğinizde, girdiğiniz sayfanın içeriğini 15 saniye içerisinde 10 defa tarayarak sayfada olan Imgur resimlerinin hepsini tespit ederek bunları DuckDuckGo Proxy (popüler ve gizlilik öncelikli bir arama motoru) sistemi ile değiştiriyor ve istekler bilgisayarımızdan direkt olarak Imgur'a değil de, DDG'ya gidiyor, DDG'da bu istekleri Imgur'a (Imgur'un yasak olmadığı bir ülkeden) istek atıyor ve sonucu bizim sayfamıza yansıtıyor. Böylelikle de **göremediğimiz** Imgur resimlerini görebilir duruma geliyoruz. Bunun yanında eklenti de de eğlenceli olacağı ve bomboş bir eklenti olmasını istemediğim için yaptığım birkaç özellikler var. Bunlardan ilki (o kadar eğlenceli olmasa da) eklentiyi açıp kapatma düğmesi! Evet, bunun için saatlerce uğraştım çünkü sistem 2 farklı yerde çalışan koddan ibaret ve bunların arasında iletişim kurmak tamamen Chrome'un daha önce hiç görmediğim sistemlerinden oluşuyor. Bir diğer özellik ise kullanım verisi; bu "veriler" sizin bilgisayarınız dışında hiçbir yerde depolanmıyor, gönderilmiyor veya başkası tarafından görülemiyor.

Bu kullanım verilerinden ilki, toplamda kaç Imgur isteklerinin engelinin eklenti sayesinde kaldırıldığı. Evet, eklenti, başarılı bir şekilde kaldırdığı her engeli sayarak eklentinin penceresinde size gösteriyor. Bu verilerden bir diğeri ise en son ne zaman engelin kaldırıldığı. Burada ise en son hangi tarihte ve saatte bir Imgur engelinin kaldırıldığı yazıyor. Eklentinin kendi içinde/bilgisayarınızda tuttuğu veriler tamamen bu kadar. Daha önce de bahsettiğim gibi, eklenti bir sayfayı 15 saniye boyunca 10 kere tarayarak bulduğu her Imgur linkini değiştiriyor, ancak eğer "sonradan oluşan" bir resim varsa, bu resim de bir Imgur resmiyse ve eklentinin 15 saniyelik tarama süreci dolduysa eklenti otomatik olarak bu resmin kaynağını değiştiremeyecektir. Bunun için de üç saatimi harcadığım "sayfayı tarama" özelliğini ekledim. Bu butona bastığınızda eklenti normal işlevini şuanki sayfada geliştiriyor ve varsa tüm Imgur resimlerinin adresini yine değiştiriyor. Yani eğer otomatik taramanın süresi dolmuş bile olsa, siz istediğiniz her zaman sayfayı el ile tekrar tarattırabiliyorsunuz.

<p class="text-center">
  <img src="https://the-person-under-this-message.is-inside.me/LIeo5mzQ.gif" alt="image" />
</p>

Yukarıda gördüğünüz GIF'de (umarım internet bağlantınız hızlıdır çünkü **17MB BU GIF**) eklentinin kısacası ne anlama geldiğini ufak tefek anlamışsınızdır, ve evet, bilinen adıyla **DBL**, uzun bir süre önce sertifikalı botların, bot kartlarının arkasına böyle bir arka plan ekleyebileceği bir özellik eklemişti. Ancak buraya sadece Imgur linklerini kabul ettiği için sanıyorum neredeyse Türklerin çoğu bu özelliğin var olduğundan bile haberi yok. İşte, eklentinin ana amacı bu... Sayfadaki Imgur resimlerini bulup sizin için değiştirmek. Böylelikle hem sayfanın yükleme hızı artıyor, hemde resimlerden mahrum kalmıyorsunuz. Nasıl ama? Eklentiyi [buradan](https://chrome.google.com/webstore/detail/imgur-please/lpngbkmgnehdkkobdbieckjpphkohffd) ekleyip, **gerçek** görüşlerinizi de yorum olarak bırakabilirsiniz.
