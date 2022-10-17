import satori from "satori"
import { readFileSync } from "fs"
import sharp from "sharp"

const Inter = readFileSync("./src/assets/fonts/Inter-Regular.ttf")
const InterBold = readFileSync("./src/assets/fonts/Inter-Bold.ttf")

interface IMetaImage {
  title: string
  description: string
}

export const generateImage = async ({ title, description }: IMetaImage) => {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#fff",
          borderRadius: 24,
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
                type: "h1",
                props: {
                  style: { fontSize: 70, fontWeight: 600, marginBottom: 0 },
                  children: title,
                },
              },
              {
                type: "p",
                props: {
                  style: { fontSize: 45, color: "rgba(0, 0, 0, 0.5)" },
                  children: description,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    fontSize: 18,
                  },
                  children: [
                    {
                      type: "span",
                      style: {
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 12,
                        marginRight: 12,
                      },
                      children: "8 dakika okuma",
                    },
                    {
                      type: "span",
                      style: {
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 12,
                        marginRight: 12,
                      },
                      children: "14/04/2022",
                    },
                  ],
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
    }
  )

  const png = await sharp(Buffer.from(svg)).png().toBuffer()
  return png
}
