---
title: Manjaro Nedir?
description: Bu gönderide en popüler Linux dağıtımlarından biri olan Manjaro Linux'ün basit anlatımını ve birkaç ekstra bilgiyi bulabilirsiniz.
tags:
  - manjaro
  - linux
  - arch
createdAt: 2020-01-09T01:35:56.645Z
related:
  - octopi-aur-destegi-nasil-aktiflestirilir
  - aur-discord-yukleme
---

Manjaro'dan bahsetmek için öncelikle Linux'un ne olduğundan bahsetmem gerekli. Eğer Linux'un ne olduğunu zaten biliyorsanız bu kısmı atlayabilirsiniz.

Linux, Windows ve macOS dışında kullanabileceğiniz, bir çok geliştirici ve "üst düzey sistem kullanıcıları" tarafından bilinen/kullanılan bir işletim sistemidir. Bu işletim sistemi hızlı olması ve sistemi kullanmanızda size rakiplerine göre çok daha fazla olanak sağladığı için Windows ve macOS'e güzel bir alternatiftir.

Linux, Windows veya macOS gibi "kapalı kaynak" değil, tamamen açık kaynak, serbestçe düzenlemeler yapabileceğiniz Linus Torvalds tarafından yapılmış bir işletim sistemidir. Linux, açık kaynak olması dolayısıyla bize bir çok platform ve yazılımda olanak sağlar. Örneğin, Google'ın geliştirdiği Android, Linux üzerine kurulmuş mobil bir işletim sistemidir. Etrafta bu kadar fazla farklı arayüze sahip Android'in olmasının sebebi, Linux'un açık kaynak olmasıdır. 1991 yılında yayınlanan Linux sisteminde, Linux çekirdeği ve [GNU araçları](https://tr.wikipedia.org/wiki/GNU_Tasar%C4%B1s%C4%B1) birleştirildiği zaman ortaya çıkan "tam" bir işletim sistemine "Linux dağıtımı" denir. Açık kaynak olmasından dolayı bu projenin yüzlerce dağıtımı vardır. Bu dağıtımlar belli şirketler tarafından yapılabilir veya bilen birkaç geliştirici ile istediğiniz sistemi ortaya koyabilirsiniz.

Linux, aynı zamanda Windows'un veya bilgisayarınızda bulunan ana işletim sistemi her neyse onun yanına kurulabilir başlatma menüsünden bir disk bölümüne yüklü olan işletim sistemini seçerek başlatabilirsiniz. Bu her Linux için geçerlidir, bu özelliği bulunmayan Linux dağıtımları da bulunuyor ancak bunlar çok az bilindik, kimsenin kullanmadığı dağıtımlar olmakla beraber biraz uğraş ile aslında onları da istediğiniz kıvama getirebiliyorsunuz. Yani, bir bilgisayarda herhangi bir Linux dağıtımını, diğer işletim sisteminizi bozmadan çalıştırabilir ve kullanabilirsiniz.

Türkiye'den de TÜBİTAK'ın geliştirdiği Linux dağıtımı olan Pardus, [Debian](https://tr.wikipedia.org/wiki/Debian) adında başka bir Linux dağıtımı üzerine kurulmuş bir dağıtımdır. Devlet destekli olduğundan dolayı okullardaki akıllı tahtalarda, devlet dairelerinde ve bir çok devlet makinesinde bu sistem kullanılmaktadır.

### Arayüzler (masaüstü ortamları) nedir?

Masaüstü ortamları (ya da Desktop Environments), İngilizcesiyle DE olarak kısaltılır ve kullanılır. DE'ler bilgisayarınızı "grafiksel arayüz" ile kullanılmasını sağlayan ek yazılımlardır. Aslında her işletim sistemi bir komut sistemi üzerine çalışır ve gördüğünüz görüntü, programlar ve her şey, komutları gerçekleştirmek için sizlere aracı olan görsel ve işlevsel aletlerdir. Örneğin, ilk çıkan işletim sistemleri (MS-DOS gibi) hiçbir grafiksel arayüz ile gelmemiştir. Her şeyi komutlar ile halledersiniz. MS-DOS, aynı zamanda günümüzdeki Windows'un atası ve hala bazı yükleme yerlerinde gereken gereçtir.

<p class="text-center">
  <img src="https://the-person-under-this-message.is-inside.me/cqyodEjg.png" alt="image" />
</p>

Linux'un ise temelde hiçbir görsel arayüzü yoktur. Bu da insanların Discord botlarını barındırırken sunucularında Linux dağıtımı sistemleri kullanmalarının nedenlerinden birisidir çünkü her arayüz, çalışan başka bir işlem olduğu ve bir çok şeyi işlediği için işlemci, ekran kartı ve RAM'inizden yer. Bu yüzden bir çok geliştirici de aslında hiçbir zaman botlarını/sitelerini barındırdıkları sunucularda arayüz kullanmazlar. Linux'de her dağıtım arayüzsüz olarak var olmuş olsa bile sonradan üzerine eklenip uyarlanan arayüzler ile insanlara sunulmaktadır.

Örneğin popüler Linux dağıtımı olan Ubuntu neredeyse günümüzdeki tüm masaüstü ortamlarına sahiptir. Bunların bazıları Ubuntu topluluğu tarafından geliştirilse de Ubuntu tarafından destek verilen birkaç masaüstü ortamı da vardır. Aşağıda popüler masaüstü ortamlarının listesini ve yanlarında örnek resim linklerini görebilirsiniz.

- KDE Plasma
- GNOME
- Cinnamon
- MATE
- Xfce
- Pantheon
- Budgie

Bunlar hakkında daha fazla bilgiyi Vikipedi ve internet üzerinde arayarak edinebilir, resimlere ve videolarına bakarak inceleyebilirsiniz. **Unutmayın!** Bunlar dağıtım değil, neredeyse her Linux dağıtımında görebileceğiniz (görmeseniz bile gerekli işlemlerden sonra ayarlayıp kullanabileceğiniz) masaüstü ortamlarıdır. Yani, bunlar kendi başlarına bir sistem çalıştıramaz, sadece varsayılan sisteminize grafiksel işlevlik katar.

### Peki, Manjaro nedir?

Manjaro, oldukça popüler bir başka Linux dağıtımıdır. Hızlı, güçlü, stabil ve hafif Arch Linux tabanlı olması dolayısıyla bir çok kullanıcı tarafından sevilmiştir. Arch'ın bir çok iyi yanlarının yanında saf Arch Linux'un bir arayüz ve ekstra uygulamalar olmadan gelmemesi nedeniyle kolay yoldan bunlara sahip olmak isteyen kullanıcılara en uygun alternatiftir. Arch Linux, Ubuntu ve diğer Debian tabanlı sistemlere göre daha gelişmiş ve daha çok özelleştirme isteyen kullanıcılar içindir. Burada sözü geçen "gelişmiş kullanıcı", "Linux manyağı" değil, daha çok "üç beş komut bilen" anlamında kullanılmıştır. Manjaro kullanabilmek için Arch'ı ezbere bilmeniz gerekmez.

### Arch Linux'un avantajları nedir?

Arch Linux, bazı kullanıcılar için şu anki "en iyi Linux dağıtımı" olarak bilinmektedir ve bir çok gelişmiş kullanıcının sevgilisi olmuştur. Bunların en büyük nedenleri, hızlı, güçlü, stabil ve hafif bir sistem olmasının yanı sıra aynı zamanda, inanılmaz geniş bir forum/döküman/destek sistemine sahiptir. Bir çok diğer Linux dağıtımının aksine sadece kendi dağıtımları için değil, neredeyse ortadaki bütün Linux sorunları için yardımlar sunmakta ve çözümler sağlamaktadır.
Ayrıca paket yöneticisi olan `pacman`'de en iyi paket yöneticilerinden birisidir. Kullanımı kolay ve yapısı gereği sizi uğraştırmayacak bir şekilde tasarlanmıştır. Tek bir komutla tüm sisteminizi ve uygulamalarınızı güncelleyebilirsiniz.

**AUR (Arch User Repository/Arch Kullanıcı Deposu)**, bilinen en iyi depolardan birisidir ve Arch Linux dağıtımları için tasarlanmıştır. Burada, resmi olarak Arch Linux'un ve geliştiricilerinin yayımlamadığı paketleri, kullanıcılar ve şirketler kendileri yayınlayabilir, güncellemelerini yükleyebilir ve paketleri için destek sağlayabilirler. Aklınıza gelebilecek neredeyse tüm Linux uygulamalarını AUR'da bulabilirsiniz. Çok geniş bir yelpazeye sahip olan bu depo sizi bir paketin kaynak kodlarını indirip ne yapacağınızı anlamaktan kurtarır ve kodları kendi ayarlayarak sizleri direkt olarak sonuca ulaştırır.

<p class="text-center">
  <img src="https://the-person-under-this-message.is-inside.me/Cef5FUfj.png" alt="image" />
</p>

Arch'ı kullanırken güncellemelere veda edin! Diğer sistemlerin ve dağıtımların aksine Arch ve çoğu Arch tabanlı Linux dağıtımları, sistem güncellemelerini direkt olarak paket yöneticisinden yapar, yerleştirir ve sisteminizi tamamen değiştirir. Bu sayede hiçbir şekilde internetten yeni bir dosya indirip tekrar kurulum yapmak zorunda kalmazsınız ve sisteminizde yüklü olan her şey ile beraber tüm sisteminizi güncelleştirebilirsiniz.

### Peki Manjaro'nun avantajları nelerdir?

Manjaro, yukarıda okuduğunuz her şeye erişebilir ve daha fazlasını da yapabilir. Manjaro, Arch tabanlı bir dağıtım olduğu için size her türlü özelleştirmeyi ve güzelliği sunabilir. Manjaro, aynı zamanda sizlere neredeyse tüm masaüstü ortamlarını kullanmanıza olanak sağlar. Bu sayede Arch'ı bir masaüstü ortamı ile kullanabilirsiniz. Manjaro, Octopi ve pacman ile sistem güncellemelerini hallederken yanında gelen varsayılan uygulamaların yanı sıra bunlara ek olarak sisteme kendilerinin dahil ettiği `mhwd` Manjaro Ayar Yönetimi gibi bir çok araç ile gelir. **MHWD (Manjaro Hardware Detection)** bilgisayarınızın tüm donanımını tarar ve size en uygun sürücüleri listeler. Sizde bunların arasından seçim yapabilir veya MHWD'nin otomatik yükleme aracını kullanarak sisteminiz için en uygun sürücüleri yükleyebilirsiniz.

<p class="text-center">
  <img src="https://the-person-under-this-message.is-inside.me/jHL9Am3H.png" alt="image" />
</p>

Sürücü kısmına gelince neredeyse Linux, görebileceğiniz en kısıtlı seçeneklere sahipken bu dönemde Intel ve Nvidia kartları için Linux performansları optimize edilmiştir ancak hala bir Windows cihazı kadar performanslı çalışmamaktadır. Manjaro, bunu da biraz olsun hafifletmiş ve sistemi donanım ile daha da bütünleştirerek daha iyi bir yazılım-donanım bağlantısı kurmayı başarmış. Oyun için Linux düşünüyorsanız, hiçbir dağıtım sizi bir Windows kadar tatmin etmeyecektir ancak geriye kalan her şeyi Linux dağıtımlarında bulabilir, bulamadığınız için de alternatiflere bakabilirsiniz.

Manjaro ekibi, resmi olarak günümüzdeki 3 büyük masaüstü ortamlarını desteklemekte ve geliştirmektedir. Bunlar **KDE**, **GNOME**, **XFCE**'dir. Bunların yanı sıra şu anda topluluğun geliştirdiği sürümlerinde; MATE, Cinnamon, Openbox, Awesome, Deepin ve Budgie'dir. Yani kullanmak isteyebileceğiniz tüm masaüstü ortamlarına Manjaro ile erişebilirsiniz.
