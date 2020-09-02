const express = require("express"),
  app = express(),
  fs = require("fs"),
  bodyParser = require("body-parser"),
  helmet = require("helmet"),
  cors = require("cors"),
  { createCanvas, loadImage, Image } = require("canvas"),
  request = require("request").defaults({
    encoding: null,
  });

app.use(cors());
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get(
  ["/overlay/create", "/overlay/create.png", "/overlay/overlay.png"],
  async function(req, res) {
    if (!req.query.overlay) {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({
        error: "You have to define a 'overlay' parameter.",
      });
      res.end();
    } else if (!req.query.url) {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({
        error: "You have to define a 'url' parameter.",
      });
      res.end();
    } else if (req.query.url.length > 250) {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({
        hata: "Parameter 'url' may not exceed 250 characters long.",
      });
      res.end();
    } else if (
      !fs.existsSync(
        `${process.cwd()}/src/static/files/overlay/frames/` +
          req.query.overlay +
          ".png"
      )
    ) {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send({
        error:
          'There is no such a frame on the API with that name (404). You can visit "/api/overlays" for frame names.',
      });
      res.end();
    } else if (
      fs.existsSync(
        `${process.cwd()}/src/static/files/overlay/frames/` +
          req.query.overlay +
          ".png"
      )
    ) {
      loadImage(
        `${process.cwd()}/src/static/files/overlay/frames/` +
          req.query.overlay +
          ".png"
      ).then((frame) => {
        request(req.query.url, function(error, response, body) {
          if (error || !body || (body && body == "")) {
            res.setHeader("Content-Type", "application/json");
            res.status(500).send({
              error:
                'Can not process the image, invalid image or invalid frame name. You can visit "/api/overlays" for frame names.',
            });
            res.end();
          } else {
            if (req.query.width && req.query.height) {
              if (parseInt(req.query.width) > 2000) {
                res.setHeader("Content-Type", "application/json");
                res.status(500).send({
                  error: "Can not process the image, image width is too big.",
                });
                res.end();
              }
              if (parseInt(req.query.height) > 2000) {
                res.setHeader("Content-Type", "application/json");
                res.status(500).send({
                  error: "Can not process the image, image width is too big.",
                });
                res.end();
              }
              const avatar = new Image();
              avatar.src = body;
              frame.onerror = () => {};
              avatar.onerror = () => {};
              try {
                const canvas = createCanvas(
                    parseInt(req.query.width),
                    parseInt(req.query.height)
                  ),
                  ctx = canvas.getContext("2d");

                ctx.drawImage(
                  avatar,
                  0,
                  0,
                  parseInt(req.query.width),
                  parseInt(req.query.height)
                );
                ctx.drawImage(
                  frame,
                  0,
                  0,
                  parseInt(req.query.width),
                  parseInt(req.query.height)
                );
                res.setHeader("Content-Type", "image/png");
                res.status(200).send(canvas.toBuffer());
              } catch (err) {
                res.setHeader("Content-Type", "application/json");
                res.status(500).send({
                  error:
                    'Can not process the image, invalid image or invalid frame name. You can visit "/api/overlays" for frame names.',
                });
                res.end();
              }
            } else {
              const avatar = new Image();
              avatar.src = body;
              frame.onerror = () => {};
              avatar.onerror = () => {};
              try {
                const canvas = createCanvas(512, 512),
                  ctx = canvas.getContext("2d");

                ctx.drawImage(avatar, 0, 0, 512, 512);
                ctx.drawImage(frame, 0, 0, 512, 512);
                res.setHeader("Content-Type", "image/png");
                res.status(200).send(canvas.toBuffer());
                res.end();
              } catch (err) {
                res.setHeader("Content-Type", "application/json");
                res.status(500).send({
                  error:
                    "Can not process the image, you've entered an invalid image or frame name.",
                });
                res.end();
              }
            }
          }
        });
      });
    }
  }
);

app.get(["/overlay/overlays", "/overlay/frames"], function(req, res) {
  fs.readdir(`${process.cwd()}/src/static/files/overlay/frames`, function(
    err,
    files
  ) {
    if (err) {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({
        error: "Couldn't read the frames directory.",
      });
      res.end();
    } else {
      const array = new Array();
      files.forEach((f) => {
        array.push(f.slice(0, -4));
      });
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(array);
      res.end();
    }
  });
});

module.exports = {
  path: "/api",
  handler: app,
};
