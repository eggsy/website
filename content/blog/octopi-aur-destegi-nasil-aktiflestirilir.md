---
title: Octopi AUR Desteği Nasıl Aktifleştirilir?
description: Bu gönderide Manjaro'nun paket yöneticisi Octopi'de nasıl AUR (Arch User Repository) aktif edileceğini anlatacağım.
tags:
  - manjaro
  - linux
  - arch
createdAt: 2019-06-03T04:46:00.000Z
related:
  - aur-discord-yukleme
  - manjaro-nedir
---

Eğer AUR'un ne olduğunu, bilmiyorsanız [bu gönderiyi](/blog/manjaro-nedir) de okumanızı tavsiye ediyorum. Bu sayfada sadece başlıkta belirtilen AUR desteğini aktifleştirme anlatılacaktır.

Octopi'de AUR desteğinin birçok yolu vardır ancak herhangi birini kullanabilmek için öncelikle belli bir paketi yüklemeli ve daha sonra bunun üzerinden işlemlerinizi yapmalısınız. Bu paketin adı `pacaur`'dur ve Manjaro'nun depolarında varsayılan olarak AUR'a erişebileceğiniz tek paket budur. Daha sonra bu paketi kullanarak AUR depolarından daha gelişmiş, daha kolay AUR aracılarını indirip kurabilirsiniz ancak her halükarda öncelikle bu paketi kurmak zorundasınız.

Paketi kurmak için öncelikle Octopi uygulamasını açın ve arama yerine `pacaur` yazın. Daha sonra çıkan tek sonuca sağ tıklayın ve "Yükle" seçeneğini seçin. Octopi ve birçok paket yöneticisi, bunu seçtikten sonra içerisindeki listeye yüklenecek paketleri listeler ve siz onaylayana kadar orada bekletir. Bu sayede birden çok paketi çok rahat bir şekilde kurabilirsiniz. Onaylamak için ise yukarıdaki tik işaretine basmalısınız.

<smart-figure src="https://i.imgur.com/8ZheGnb.png"></smart-figure>

Daha sonra Octopi, size kurulacak paketleri ve kurulması için gerekli bağımlılıkları listeleyecek ve son kez emin olup olmadığınızı soracaktır. Bu ekranda da isterseniz "Evet"e basıp Octopi içerisinde rahat kurulum yapabilir, isterseniz de konsolda çalıştır seçeneğini seçerek konsolda yükleme işlemini başlatabilirsiniz.

<smart-figure src="https://i.imgur.com/YRqdixr.png"></smart-figure>

Bir sonraki ekranda ise Octopi, sizden `sudo` yani süper kullanıcı/yetkili kullanıcı şifrenizi soracaktır. Bu işlem, Linux'un güvenli olmasında da başka bir etkendir. Bu sayede sisteminize sizden habersiz herhangi bir yazılım giremez veya düzenleme yapamaz. Gelen alana da şifremizi yazdıktan sonra yükleme işlemi başlayacaktır.

<smart-figure src="https://i.imgur.com/P8DR3UE.png"></smart-figure>

Daha sonra ise yükleme işlemi başlayacak ve gerekli dosyalar indirilip sisteminize otomatik olarak kurulacaktır. Kurulum tamamlandıktan sonra herhangi bir fark göremeyeceksiniz, sadece artık paketin solundaki işaretin yeşil olduğunu göreceksiniz. Bu, paketin yüklü olduğu anlamına gelir. Yani, pacaur paketimiz başarıyla kurulmuş durumdadır.

<smart-figure src="https://i.imgur.com/xzvfjyG.png"></smart-figure>

Bir sonraki aşamada ise Octopi menülerinden "Araçlar" menüsünün altındaki "Seçenekler" kısmına girmek var. Bu işlemi yaparak bizi Octopi'nin ayarlarını düzenleyebileceğimiz sayfaya erişebileceğiz.

<smart-figure src="https://i.imgur.com/9ASEPBB.png"></smart-figure>

Açılan sayfada ise yukarıdaki sekmelerden "AUR" sekmesini seçin ve, başta işaretli olan "AUR deposu kullanma" seçeneğinin seçili olduğunu görün. Bu, varsayılan olarak AUR depolarına erişimin olmadığını gösterecektir. Bu ayarı aşağıdan Pacaur olarak değiştirin.

Yukarıdaki resimde gördüğünüz "Pacaur" seçeneğinin yanında `--noconfirm` seçeneğini seçerseniz, paket yüklemelerinizde konsol size yüklemenin yapılıp yapılmamasını sormayacaktır. Direkt olarak yükleyecektir.

Eğer diğer `--noedit` seçeneğini seçerseniz ise başta sorulan betik düzenlemelerini sormayacak ve çok daha hızlı bir şekilde direkt olarak yüklemeye geçecektir.
Bu yüzden eğer isterseniz bu iki ayarı aktif edebilir ve çok daha hızlı bir şekilde yüklemeye geçebilirsiniz.

Eğer yukarıdaki resimdeki gibi "Pacaur" ayarı aktif değilse, pacaur paketini yükleme işlemini başaramamışsınız demektir. Bunu başaramamış olmanızın nedeni internet bağlantınız olabilir. Lütfen kontrol edin ve adımları tekrar uygulayın.

Bu ayarları da istediğiniz gibi ayarladıktan sonra **artık AUR depolarını kullanabilirsiniz!** Evet, AUR depolarına erişip binlerce paketi indirebilir ve istediğiniz şekilde kullanabilirsiniz. Merak etmeyin, AUR depoları son derece güvenli ve birçok yetkili tarafından gözetilmektedir. Neredeyse Manjaro kullanırken bilgisayarınıza ve Linux'unuza virüs bulaştırmanız imkânsızdır.

<smart-figure src="https://i.imgur.com/aOTyZaD.png"></smart-figure>

Bu seçenekleri de onayladıktan sonra artık arama yerinizin sol tarafına bir "yeşil uzaylı kafası"nın geldiğini görebilirsiniz. AUR depolarında arama yaparken bu işareti kullanacağız.
