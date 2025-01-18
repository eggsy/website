import satori from "satori"
import { readFileSync } from "fs"
import sharp from "sharp"

// Fonts
const Inter = readFileSync("./assets/fonts/Inter-Regular.ttf")
const InterBold = readFileSync("./assets/fonts/Inter-Bold.ttf")

interface IMetaImage {
  title: string
  description: string
  subtitles?: string[]
}

const emojis = [
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4ab.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f636.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f44f.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f973.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2728.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2709.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2600.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f30d.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4a5.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f525.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f929.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/26a1.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/231b.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2b50.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4eb.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4a1.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4ad.png",
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f389.png",
]

export const generateImage = async ({
  title,
  description,
  subtitles,
}: IMetaImage) => {
  const svg = await satori(
    {
      type: "div",
      key: 1,
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#fff",
          borderRadius: 24,
          backgroundImage:
            "url(https://raw.githubusercontent.com/eggsy/website/refs/heads/main/public/assets/meta/images/post-background.png)",
        },
        children: {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              marginLeft: 40,
              marginRight: 40,
              marginBottom: 40,
            },
            children: [
              {
                type: "img",
                props: {
                  src: emojis[Math.floor(Math.random() * emojis.length)],
                  height: 80,
                  width: 80,
                  style: {
                    marginBottom: 12,
                  },
                },
              },
              {
                type: "h1",
                props: {
                  style: { fontSize: 60, fontWeight: 600, marginBottom: 0 },
                  children: title,
                },
              },
              {
                type: "p",
                props: {
                  style: { fontSize: 35, color: "rgba(0, 0, 0, 0.5)" },
                  children: description,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    marginTop: 12,
                    fontSize: 25,
                  },
                  children:
                    subtitles?.map((item, index) => ({
                      type: "span",
                      props: {
                        style: {
                          borderRadius: 12,
                          padding: "6px 16px",
                          marginLeft: index === 0 ? 0 : 14,
                          color: "rgba(0, 0, 0, 0.5)",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },
                        children: item,
                      },
                    })) || [],
                },
              },
            ],
          },
        },
      },
    },
    {
      width: 1200,
      height: 675,
      fonts: [
        {
          name: "Inter",
          data: Buffer.from(Inter),
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: Buffer.from(InterBold),
          weight: 700,
          style: "normal",
        },
      ],
    },
  )

  const png = await sharp(Buffer.from(svg)).png().toBuffer()
  return png
}
