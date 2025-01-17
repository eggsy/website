---
title: Spotify Bağlantısından YouTube Videosu Bulma (Node)
description: Spotify'daki müziklerin YouTube bağlantılarına ulaşmak istiyorsanız, bu işlemi Node.js ile otomatikleştirebilirsiniz!
header: https://i.imgur.com/JsG6PF1.jpg
tags:
  - yazılım
  - node
  - youtube
  - spotify
createdAt: 11/22/2021
indicatorsHidden: true
---

Eğer yakın zamanda benim gibi YouTube (veya başka bir) müzik sağlayıcısından Spotify'a geçiş yaptıysanız YouTube'da dinlediğiniz şarkıyı arkadaşlarınızla paylaşmanın biraz daha kolay olduğunu düşünüyor olabilirsiniz. Peki size Spotify'a geçseniz bile müziklerinizi paylaşmadan önce Node.js ile Spotify bağlantılarınızdan YouTube bağlantılarına ulaşabileceğinizi söylesem?

<blog-notification title="Ben nerede ihtiyaç duyuyorum?">Bu sitede önceden bulunan Günlük Müzik sayfasında herkesin dinleyebilmesi için müzikleri YouTube üzerinden paylaşıyorum. Spotify'a geçince oraya Spotify koymam, birçok kişi için can sıkıcı olabilirdi fakat GitHub'da bulunan [firestore-checker](https://github.com/eggsy/firestore-checker) projemi buna göre düzenleyip artık Spotify bağlantılarını YouTube'a dönüştürüp siteme müzikleri eklemeye devam edebiliyorum!</blog-notification>

### İhtiyacınız olanlar

- [Node.js](https://nodejs.org) yüklü olan bir bilgisayar
- [Visual Studio Code](https://code.visualstudio.com/) veya tercih ettiğiniz bir editör
- Hazırda bekleyen bir CMD/Terminal

### Başlangıç

Öncelikle projenizi oluşturacağınız bir klasör oluşturun, bu klasörü VS Code içerisinde açın ve bu klasörün içinde bir `index.js` dosyası oluşturun. Gerekli kodları bu dosyanın içerisine yazacağız.

<smart-figure src="https://i.imgur.com/8x5B3Sr.png"></smart-figure>

Dosyayı oluşturduktan sonra kullandığınız terminalden `cd /Klasörünüzün/Konumu` komutu ile açık olan dizini projenizin klasörü olarak değiştirin. Doğru konuma girdikten sonra şu iki modülü yüklemelisiniz:

- [`spotify-web-api-node`](https://github.com/thelinmichael/spotify-web-api-node)
- [`spotify-to-youtube`](https://github.com/valeriangalliat/spotify-to-youtube)

Modülleri yüklemek için `npm install modul-ismi` komutunu terminalinize girebilirsiniz. Eğer `yarn` paket yöneticisini kullanıyorsanız `yarn add modul-ismi` komutunu da kullanabilirsiniz.

<blog-notification type="warning">Bu işlemleri herhangi bir modül kullanmadan, tamamen kendi kodunuzu yazarakta gerçekleştirebilirsiniz fakat bu yazının bu işlemlerin tüm ayrıntılara girmeyerek, kolay yoldan size bu işlemi göstermesi hedefiyle bu modülleri kullanacağınızı unutmayın.</blog-notification>

### Kodu yazmaya giriş

Kodu yazmaya başlayabilmek için öncelik bir Spotify geliştirici hesabı oluşturarak bir Spotify uygulaması oluşturmalısınız. Bu işlemi [buradaki](https://developer.spotify.com/dashboard/) sayfadan yapabilirsiniz. Bu sayfaya girdikten sonra mevcut Spotify hesabınız ile giriş yapacak ve açılan panelden "Create an App" tuşuna basarak bir uygulama oluşturacaksınız.

Uygulamayı oluşturduktan sonra aynı sayfadan uygulamanızın isminin olduğu kutucuğa tıklayın ve açılan sayfada hemen göreceğiniz "Client ID" bilgisinin altındaki "Show Client Secret" yazısına basarak o bilgiyi de alın. Bu iki bilgi Spotify'ın API'ı ile bağlantı kurmanızı sağlayacak.

<smart-figure src="https://i.imgur.com/Fg2HcNp.png"></smart-figure>

Bu bilgilere eriştikten sonra buradan gerisi, kullanacağınız modüller sayesinde oldukça basit aslında. Spotify bağlantılarından YouTube videosunu bulan `spotify-to-youtube` modülü, `spotify-web-api-node` modülü ile sizin hesabınızı kullanarak Spotify bağlantısından şarkı ismi ve sanatçı bilgilerini alıp o bilgilere denk gelen YouTube videosunu bulacaktır. Her şeyden önce dosyanın en başında bu iki modülü içe aktarmalısınız ki kod içerisinde kullanabilesiniz.

```js [index.js]
// ES
import SpotifyWebApi from "spotify-web-api-node"
import SpotifyToYoutube from "spotify-to-youtube"

// CommonJS
const SpotifyWebApi = require("spotify-web-api-node")
const SpotifyToYoutube = require("spotify-to-youtube")
```

Sonrasında da `spotify-web-api-node` modülünden yeni bir örnek (instance) oluşturmanız gerekiyor. Modülün GitHub sayfasındaki kod bloğunda da belirtildiği gibi, bu işlemi aşağıda gördüğünüz şekilde yapabiliriz.

```js [index.js]
/*
// Bu iki bilgiyi Spotify panelinizden biraz önce aldığınız bilgiler
// ile değiştirin. Buradaki bilgilerin herhangi bir geçerliliği yoktur.
*/
const clientId = "838383u288l12an898213eg8829gsy22"
const clientSecret = "n2234e19239ad23189am237283sın333"

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
})
```

Böylece bu modül neredeyse Spotify API'si ile iletişime geçmeye hazır. Hatta görünen o ki, eğer `spotify-to-youtube` modülünü kullanmasaydık, bu modülü bu hâlde çalıştırabilir ve Spotify'dan veri çekebilirdik. Fakat bize bu işlemleri yapacak bu modül GitHub sayfasında belirttiği gibi bir erişim anahtarına (access token) ihtiyaç duyduğu için bu bilgiyi almalı ve sonra o modülü kurmalıyız. Bu bilgiyi almak için ise aşağıdaki gibi bir fonksiyon oluşturabiliriz.

```js [index.js]
await spotifyApi.clientCredentialsGrant().then(({ body }) => {
  const accessToken = body.access_token
  spotifyApi.setAccessToken(accessToken)
})
```

Bu kodda dikkatiniz çektiği üzere `await` operatörünü kullandık, bu da Node'da asenkron fonksiyonların dışında çalışmayacağı için aslında bu kısmı asenkron bir fonksiyon içine almanız gerekecek. Fakat bu işlemi yazının en sonundaki tüm kodun olduğu kısımda daha iyi anlayacağınız için şimdilik böyle bırakıyorum.

Bu kod ise Spotify API'a bir istek gönderecek ve oradan bize bir erişim anahtarı vermesini isteyecek, dönen verinin içinde bulunan `body` objesinin içinde de bu `access_token` bilgisine ulaşabileceğiz. Daha sonra modülün dokümanlarında belirtildiği `setAccessToken` metodu ile bu bilgiyi kaydedeceğiz, `spotify-to-youtube` modülü de buradan bu anahtara ulaşacak.

Şimdi ise `spotify-to-youtube` modülünü kullanmaya geçebiliriz. Bu modül yukarıda belirttiğimiz Spotify bilgilerimizi kullanarak Spotify'dan şarkı bilgisini alacak ve bu şarkıyı YouTube'da aratacak.

<blog-notification type="warning">Sizin bildiğiniz veya ortada bu işlemleri yapmak için farklı, hatta daha iyi modüller olabilir, ben işimi hemen görecek bir modül aradığım için ilk karşıma çıkan ve sorunsuz çıkan bu iki modülü kullanarak bu işi hallediyorum, size de bunları tarif edeceğim. Bu modülleri kullanmayacak olsanız bile bu yazıyı okuyup birkaç fikir edinebilirsiniz, veya farklı modüller ile yolunuza devam edebilirsiniz.</blog-notification>

Şimdi ise bu modülden bir örnek (instance) oluşturuyoruz, burada yapacağınız tek şey daha önce belirttiğimiz `spotifyApi` değişkenini referans olarak göstermek.

```js [index.js]
const spotifyToYoutube = SpotifyToYoutube(spotifyApi)
```

Oldukça basit, değil mi? Buradan sonra aslında işimiz bitiyor. Tek yapmanız gereken şimdi oluşturduğumuz örneği kullanarak fonksiyonu çağırmak ve bir Spotify şarkı kimliği (ID) vermek.

```js [index.js]
// İsterseniz ID'nin başına spotify:track: ekleyebilir,
const trackId = await spotifyToYoutube("spotify:track:1r9xUipOqoNwggBpENDsvJ")

// İsterseniz sadece ID'yi de yazabilirsiniz
const trackId = await spotifyToYoutube("1r9xUipOqoNwggBpENDsvJ")
```

Bu kimliği (ID) nasıl aldığımız ise oldukça basit, örnek bir şarkı bağlantısını ele aldığınızda bağlantının içerisindeki karmaşık duran kısım şarkının kimliği oluyor. Bir Spotify bağlantısından ID'yi ayrıştırmak için bir fonksiyon da oluşturabilirsiniz.

```js [index.js]
function idAyristirici(url) {
  return new URL(url).pathname.split("/")[2]
}

console.log(
  idAyristirici("https://open.spotify.com/track/1r9xUipOqoNwggBpENDsvJ"),
) // 1r9xUipOqoNwggBpENDsvJ
```

Böyle bir fonksiyona da sahip olduktan sonra herhangi bir Spotify URL'sinden artık YouTube bağlantısını alabileceksiniz. Son olarak yazdıklarımızın tamamını birleştirip gerekli düzenlemeleri yaptığımızda ise şöyle bir dosya bizi karşılayacaktır.

```js [index.js]
// Modülleri içe aktar
const SpotifyWebApi = require("spotify-web-api-node")
const SpotifyToYoutube = require("spotify-to-youtube")

// Panelden alınan bilgileri değişkenlere ata
const clientId = "838383u288l12an898213eg8829gsy22"
const clientSecret = "n2234e19239ad23189am237283sın333"

// Yeni bir SpotifyWebApi örneği (instance) oluştur
const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
})

// Asenkron işlemler için asenkron bir fonksiyon
async function main() {
  // Spotify API'a ulaşıp bir erişim anahtarı iste
  await spotifyApi.clientCredentialsGrant().then(({ body }) => {
    const accessToken = body.access_token
    spotifyApi.setAccessToken(accessToken)
  })

  // Bir SpotifyToYoutube örneği oluştur
  const spotifyToYoutube = SpotifyToYoutube(spotifyApi)

  // Oluşturulan örneği kullanarak Spotify bağlantısından
  // YouTube bağlantısını al
  const trackId = await spotifyToYoutube(
    // Kendi yaptığımız Spotify bağlantısından ID'yi ayrıştırıcı
    // fonksiyonunu kullanarak ID'yi al
    idAyristirici("https://open.spotify.com/track/1r9xUipOqoNwggBpENDsvJ"),
  )

  // Sonucu YouTube bağlantısı olarak döndür
  return `https://youtu.be/${trackId}`
}

function idAyristirici(url) {
  return new URL(url).pathname.split("/")[2]
}
```

Böyle bir dosya oluşturmak kendi başına bir şey yapmayacak olsa da buradan gerisini siz, projenize göre uydurmalı ve çalıştırmalısınız. Benim Firestore Checker projemdeki gibi terminal arayüzü ile interaktif bir program yapabilir, hatta Electron gibi kütüphanelerle görsel arayüze sahip bir uygulama da yapabilirsiniz. Bu dosyayı `node index.js` komutu ile çalıştırdığınızda hiçbir şey olmayacaktır, eğer konsola bir çıktı almak istiyorsanız şu değişiklikleri yapmak isteyebilirsiniz, ama burası dediğim gibi, tamamen size kalmış.

```js [index.js]
// ...

async function main() {
  // ...

  return console.log(`https://youtu.be/${trackId}`)
}

main()

// ...
```

Bu değişiklikleri yaptıktan sonra bu dosyayı her çalıştırdığınızda yukarıda belirttiğiniz Spotify bağlantısına sahip şarkının YouTube bağlantısını konsola yansıtacaktır. Buradan gerisi size, ve projenize kalmış. Bu dosyanın tamamına [buradaki](https://github.com/eggsy/examples/tree/main/blog/spotify-baglantisindan-youtube-videosu-bulma) bağlantıdan ulaşabilirsiniz.
