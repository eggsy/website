const express = require("express"),
  app = express(),
  fs = require("fs"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  { createCanvas, loadImage, Image } = require("canvas"),
  request = require("request").defaults({
    encoding: null,
  }),
  helmet = require("helmet"),
  cors = require("cors");

mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const { Posts, Authors, Songs } = require("./files/models.js"),
  hosts = [
    "www.eggsy.xyz",
    "eggsy.xyz",
    "eggsy.codes",
    "www.eggsy.codes",
    "localhost:3000",
  ];

app.use(cors());
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

/* /* /*
//
// BLOG PART STARTS FROM HERE
//
// // */

/* AUTHENTICATION BASIC:  */
function auth(type, extra) {
  return function(req, res, next) {
    if (hosts.indexOf(req.headers.host) === -1)
      return res.status(401).json({
        error: "Unauthorized access to this endpoint is disabled by the owner.",
      });
    else if (type == "writerAccess") {
      if (
        req.method == "POST" &&
        req.body.auth &&
        req.body.auth.username &&
        req.body.auth.id
      ) {
        Authors.exists({
          discordId: req.body.auth.id,
        })
          .then((val) => {
            if (val) next();
            else
              res.status(400).json({
                error: "Couldn't find that author.",
              });
          })
          .catch(() => {
            res.status(401).json({
              error:
                "Unauthorized access to this endpoint is disabled by the owner.",
            });
          });
      } else {
        res.status(401).json({
          error:
            "Unauthorized access to this endpoint is disabled by the owner.",
        });
      }
    } else if (type == "oneOfTwo") {
      if (
        req.method == "POST" &&
        req.body.auth &&
        req.body.auth.username &&
        req.body.auth.id &&
        req.body.auth.id == "162969778699501569"
      ) {
        next();
      } else if (
        extra &&
        req.method == "POST" &&
        req.body.auth &&
        req.body.auth.username &&
        req.body.auth.id &&
        req.body.auth.id != "162969778699501569"
      ) {
        Posts.exists({
          _id: req.params.id,
          "author.discordId": req.body.auth.id,
        })
          .then((val) => {
            if (val) next();
            else
              res.status(400).json({
                error: "You're not allowed to edit/delete this post.",
              });
          })
          .catch(() => {
            res.status(401).json({
              error:
                "Unauthorized access to this endpoint is disabled by the owner.",
            });
          });
      } else if (
        req.method == "POST" &&
        req.body.auth &&
        req.body.auth.username &&
        req.body.auth.id &&
        req.body.auth.id != "162969778699501569" &&
        !extra
      ) {
        Authors.exists({
          discordId: req.body.auth.id,
        })
          .then((val) => {
            if (val) next();
            else
              res.status(400).json({
                error: "Couldn't find that author.",
              });
          })
          .catch(() => {
            res.status(401).json({
              error:
                "Unauthorized access to this endpoint is disabled by the owner.",
            });
          });
      } else {
        res.status(401).json({
          error:
            "Unauthorized access to this endpoint is disabled by the owner.",
        });
      }
    } else if (type == "superior") {
      if (
        req.method == "POST" &&
        req.body.auth &&
        req.body.auth.username &&
        req.body.auth.id &&
        req.body.auth.id == "162969778699501569"
      ) {
        next();
      } else {
        res.status(401).json({
          error:
            "Unauthorized access to this endpoint is disabled by the owner.",
        });
      }
    } else if (type == "localRequest") next();
    else if (type == "postDelete") {
      if (
        req.method == "POST" &&
        req.body.auth &&
        req.body.auth.username &&
        req.body.auth.id &&
        req.body.auth.id == "162969778699501569" &&
        req.body.postId
      ) {
        next();
      } else if (
        req.method == "POST" &&
        req.body.auth &&
        req.body.auth.username &&
        req.body.auth.id &&
        req.body.auth.id != "162969778699501569" &&
        req.body.postId
      ) {
        Posts.exists({
          _id: req.body.postId,
          "author.discordId": req.body.auth.id,
        })
          .then((val) => {
            if (val) next();
            else
              res.status(400).json({
                error: "Couldn't find that author.",
              });
          })
          .catch(() => {
            res.status(401).json({
              error:
                "Unauthorized access to this endpoint is disabled by the owner.",
            });
          });
      } else {
        res.status(401).json({
          error:
            "Unauthorized access to this endpoint is disabled by the owner.",
        });
      }
    } else {
      res.status(401).json({
        error: "Unauthorized access to this endpoint is disabled by the owner.",
      });
    }
  };
}
/* */

app.post("/blog/post/:id/edit", auth("oneOfTwo", true), async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({
      success: false,
      error: "Bad request.",
    });

  try {
    let post = await Posts.findOne({
      short_url: req.params.id,
    }).exec();

    if (post) return res.status(200).json(post);
    else if (!post && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      const post = await Posts.findById(req.params.id);

      res.status(200).json(post);
    } else {
      res.status(400).json({
        success: false,
        error: "Bad request.",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Bad request.",
    });
  }
});

app.post("/blog/author/update", auth("writerAccess"), async (req, res) => {
  try {
    await Authors.findOneAndUpdate(
      {
        discordId: req.body.auth.id,
      },
      req.body.data
    )
      .exec()
      .then(() => {
        Posts.updateMany(
          {
            "author.discordId": req.body.auth.id,
          },
          {
            "author.name": req.body.data.name,
          }
        )
          .then(() => {
            res.status(200).json({
              success: true,
            });
          })
          .catch(() => {
            res.status(400).json({
              success: false,
              error: "Bad request.",
            });
          });
      })
      .catch(() => {
        res.status(400).json({
          success: false,
          error: "Bad request.",
        });
      });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Bad request.",
    });
  }
});

app.post("/blog/authors", auth("superior"), async (req, res) => {
  try {
    const authors = await Authors.find({}).exec();

    res.status(200).json(authors);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Bad request.",
    });
  }
});

app.get("/blog/author/get/:id", auth("localRequest"), async (req, res) => {
  try {
    const author = await Authors.findOne({
      discordId: req.params.id,
    }).exec();

    if (author) {
      const posts = await Posts.find({
        "author.discordId": req.params.id,
      })
        .sort({
          date: -1,
        })
        .exec();

      const object = {
        author,
        posts,
      };

      res.status(200).json({
        success: true,
        data: object,
      });
    } else
      res.status(400).json({
        success: false,
        error: "Bad request.",
      });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Bad request.",
    });
  }
});

app.post("/blog/authors/delete", auth("superior"), async (req, res) => {
  try {
    Authors.deleteMany({
      name: {
        $in: req.body.authors,
      },
    })
      .then(async (newObj) => {
        Posts.updateMany(
          {
            "author.name": {
              $in: req.body.authors,
            },
          },
          {
            "author.name": "Kovulmuş Yazar",
            "author.discordId:": null,
            published: false,
          }
        )
          .exec()
          .then(() => {
            res.status(200).json({
              success: true,
              result: newObj,
            });
          })
          .catch(() => {
            res.status(400).json({
              error: "Bad request.",
            });
          });
      })
      .catch(() => {
        res.status(400).json({
          error: "Bad request.",
        });
      });
  } catch (err) {
    res.status(400).json({
      error: "Bad request.",
    });
  }
});

app.post("/blog/author/new", auth("superior"), async (req, res) => {
  if (
    req.body &&
    req.body.data &&
    req.body.data.name &&
    req.body.data.discordId
  ) {
    try {
      new Authors(req.body.data)
        .save()
        .then(() => {
          res.status(200).json({
            success: true,
          });
        })
        .catch(() => {
          res.status(400).json({
            error: "Bad request.",
          });
        });
    } catch (err) {
      res.status(400).json({
        error: "Bad request.",
      });
    }
  } else {
    res.status(400).json({
      error: "Bad request.",
    });
  }
});

app.get("/blog/posts", auth("localRequest"), async (req, res) => {
  if (
    req.query.type &&
    req.query.type == "content" &&
    req.query.limit &&
    !isNaN(req.query.limit) &&
    req.query.skip &&
    !isNaN(req.query.skip) &&
    !req.query.force
  ) {
    try {
      const posts = await Posts.find({
        published: true,
      })
        .sort({
          date: -1,
        })
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .exec();

      res.status(200).json(posts);
    } catch (err) {
      res.status(400).json({
        error: "Bad request.",
      });
    }
  } else if (
    req.query.type &&
    req.query.type == "find" &&
    !req.query.force &&
    req.query.id
  ) {
    try {
      let post = await Posts.findOne({
        published: true,
        short_url: req.query.id,
      }).exec();

      if (post) {
        req.query.read && req.query.read === "true"
          ? null
          : await Posts.findOneAndUpdate(
              {
                published: true,
                short_url: req.query.id,
              },
              {
                $inc: {
                  views: 1,
                },
              }
            );

        res.status(200).json(post);
      } else if (req.query.id && req.query.id.match(/^[0-9a-fA-F]{24}$/)) {
        post = await Posts.findOne({
          published: true,
          _id: req.query.id,
        }).exec();

        req.query.read && req.query.read === "true"
          ? null
          : await Posts.findOneAndUpdate(
              {
                published: true,
                short_url: req.query.id,
              },
              {
                $inc: {
                  views: 1,
                },
              }
            );

        res.status(200).json(post);
      } else {
        res.status(400).json({
          error: "Bad request.",
        });
      }
    } catch (err) {
      res.status(400).json({
        error: "Bad request.",
      });
    }
  } else if (req.query.type && req.query.type == "views") {
    try {
      const posts = await Posts.find({
        published: true,
      })
        .sort({
          views: -1,
        })
        .limit(5)
        .exec();

      res.status(200).json(
        posts.map((p) => {
          return {
            title: p.title,
            reactions: p.reactions,
            views: p.views,
            _id: p.short_url ? p.short_url : p._id,
          };
        })
      );
    } catch (err) {
      res.status(400).json({
        error: "Bad request.",
      });
    }
  } else if (req.query.type && req.query.type == "search" && req.query.title) {
    try {
      const titleRegex = new RegExp(req.query.title, "i"),
        post = await Posts.find({
          title: titleRegex,
        }).exec();

      res.status(200).json(post);
    } catch (err) {
      res.status(400).json({
        error: "Bad request.",
      });
    }
  } else if (
    req.query.type &&
    req.query.type == "tag" &&
    req.query.name &&
    req.query.max &&
    !isNaN(req.query.max)
  ) {
    try {
      const post = await Posts.find({
        tags: {
          $in: [req.query.name],
        },
      })
        .limit(parseInt(req.query.max))
        .exec();

      if (post) return res.status(200).json(post);
      else
        return res.status(400).json({
          error: "Bad request.",
        });
    } catch (err) {
      res.status(400).json({
        error: "Bad request.",
      });
    }
  } else
    res.status(400).json({
      error: "Very very bad request.",
    });
});

app.post("/blog/admin/all", auth("superior"), async (req, res) => {
  try {
    const authors = await Authors.find({}).exec(),
      posts = await Posts.find({})
        .sort({
          date: -1,
        })
        .exec();

    const object = {
      authors,
      posts,
    };

    res.status(200).json(object);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Bad request.",
    });
  }
});

app.post("/blog/comment", auth("oneOfTwo"), async (req, res) => {
  if (!req.query && !req.query.type)
    res.status(400).json({
      error: "Bad request.",
    });
  else if (req.query && req.query.type) {
    if (req.query.type == "delete") {
      try {
        Posts.findOneAndUpdate(
          {
            _id: req.body.data.postId,
          },
          {
            $pull: {
              comments: {
                content: req.body.data.comment.content,
                date: req.body.data.comment.pureDate,
                approved: Boolean(req.body.data.comment.approvedBool),
              },
            },
          }
        )
          .then(() => {
            res.status(200).json({
              success: true,
            });
          })
          .catch(() => {
            res.status(400).json({
              success: false,
            });
          });
      } catch (err) {
        res.status(400).json({
          success: false,
        });
      }
    } else if (req.query.type == "approve") {
      try {
        Posts.findOneAndUpdate(
          {
            _id: req.body.data.postId,
            "comments.content": req.body.data.comment.content,
            "comments.date": req.body.data.comment.pureDate,
            "comments.approved": Boolean(req.body.data.comment.approvedBool),
          },
          {
            $set: {
              "comments.$.approved": true,
            },
          }
        )
          .then(() => {
            res.status(200).json({
              success: true,
            });
          })
          .catch(() => {
            res.status(400).json({
              success: false,
            });
          });
      } catch (err) {
        res.status(400).json({
          success: false,
        });
      }
    } else if (req.query.type == "unapprove") {
      try {
        Posts.findOneAndUpdate(
          {
            _id: req.body.data.postId,
            "comments.content": req.body.data.comment.content,
            "comments.date": req.body.data.comment.pureDate,
            "comments.approved": Boolean(req.body.data.comment.approvedBool),
          },
          {
            $set: {
              "comments.$.approved": false,
            },
          }
        )
          .then(() => {
            res.status(200).json({
              success: true,
            });
          })
          .catch(() => {
            res.status(400).json({
              success: false,
            });
          });
      } catch (err) {
        res.status(400).json({
          success: false,
        });
      }
    }
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

app.post("/blog/posts/delete/", auth("postDelete"), async (req, res) => {
  try {
    Posts.deleteOne({
      _id: req.body.postId,
      "author.discordId": req.body.auth.id,
    })
      .then(() => {
        res.status(200).json({
          success: true,
        });
      })
      .catch(() => {
        res.status(400).json({
          success: false,
        });
      });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
});

app.get("/dailySong", async (req, res) => {
  if (req.query.full) {
    try {
      let songs = await Songs.find({}).exec();

      if (
        !req.query.verySecretToken ||
        req.query.verySecretToken !== "how-did-you-even-find-this-bro"
      ) {
        let found = false;
        let newArray = [];

        for (let key in songs) {
          if (found) continue;
          else if (
            songs[key].date ==
            `${new Date().getMonth() +
              1}/${new Date().getDate()}/${new Date().getFullYear()}`
          ) {
            newArray.push(songs[key]);
            found = true;
          } else newArray.push(songs[key]);
        }
      }

      res.status(200).json(songs);
    } catch (err) {
      res.status(200).json({
        error:
          "Actually, this was an error but there's probably no songs for today.",
        url: "dQw4w9WgXcQ",
      });
    }
  } else {
    try {
      const today = new Date().toLocaleString().split(",")[0];
      let song = await Songs.findOne({
        date: today,
      }).exec();

      if (!song) song = { url: "dQw4w9WgXcQ" };

      if (req.query.embed)
        res.redirect(`https://youtube.com/watch?v=${song.url}`);
      else
        res.status(200).json({
          url: song.url,
        });
    } catch (err) {
      res.status(200).json({
        error:
          "Actually, this was an error but there's probably no songs for today.",
        url: "dQw4w9WgXcQ",
      });
    }
  }
});

app.post("/dailySong/edit", auth("superior"), async (req, res) => {
  if (!req.body.data) return res.status(400).json({ success: false });

  try {
    req.body.data.forEach((data) => {
      new Songs({ date: data.date, url: data.url }).save();
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.post("/blog/comment/:id", auth("localRequest"), async (req, res) => {
  if (
    req.params.id &&
    req.body &&
    req.body.date &&
    req.body.content &&
    req.body.content.length > 15
  ) {
    try {
      req.body["approved"] =
        req.body.admin && req.body.admin === true ? true : false;

      await Posts.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $push: {
            comments: req.body,
          },
        }
      )
        .then(() =>
          res.status(200).json({
            success: true,
          })
        )
        .catch(() =>
          res.status(400).json({
            success: false,
          })
        );
    } catch (err) {
      res.status(400).json({
        success: false,
      });
    }
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

app.post("/blog/react/:id", auth("localRequest"), async (req, res) => {
  if (req.params.id && req.body && req.body.add) {
    try {
      if (req.body.add == "excited") {
        await Posts.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          {
            $inc: {
              "reactions.excited": 1,
            },
          }
        )
          .then((result) => {
            res.status(200).json({
              success: true,
              newObj: result,
            });
          })
          .catch(() =>
            res.status(400).json({
              success: false,
              error: "Unauthorized or bad request.",
            })
          );
      } else if (req.body.add == "lol") {
        await Posts.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          {
            $inc: {
              "reactions.lol": 1,
            },
          }
        )
          .then((result) => {
            res.status(200).json({
              success: true,
              newObj: result,
            });
          })
          .catch(() =>
            res.status(400).json({
              success: false,
              error: "Unauthorized or bad request.",
            })
          );
      } else if (req.body.add == "angry") {
        await Posts.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          {
            $inc: {
              "reactions.angry": 1,
            },
          }
        )
          .then((result) => {
            res.status(200).json({
              success: true,
              newObj: result,
            });
          })
          .catch(() =>
            res.status(400).json({
              success: false,
              error: "Unauthorized or bad request.",
            })
          );
      } else if (req.body.add == "cry") {
        await Posts.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          {
            $inc: {
              "reactions.cry": 1,
            },
          }
        )
          .then((result) => {
            res.status(200).json({
              success: true,
              newObj: result,
            });
          })
          .catch(() =>
            res.status(400).json({
              success: false,
              error: "Unauthorized or bad request.",
            })
          );
      } else if (req.body.add == "dead") {
        await Posts.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          {
            $inc: {
              "reactions.dead": 1,
            },
          }
        )
          .then((result) => {
            res.status(200).json({
              success: true,
              newObj: result,
            });
          })
          .catch(() =>
            res.status(400).json({
              success: false,
              error: "Unauthorized or bad request.",
            })
          );
      } else if (req.body.add == "heart") {
        await Posts.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          {
            $inc: {
              "reactions.heart": 1,
            },
          }
        )
          .then((result) => {
            res.status(200).json({
              success: true,
              newObj: result,
            });
          })
          .catch(() =>
            res.status(400).json({
              success: false,
              error: "Unauthorized or bad request.",
            })
          );
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        error: "Unauthorized or bad request.",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      error: "Unauthorized or bad request.",
    });
  }
});

app.post("/blog/posts/new", auth("oneOfTwo"), (req, res) => {
  if (
    req.body &&
    req.body.data &&
    req.body.data.title &&
    req.body.data.shortdesc &&
    req.body.data.content &&
    req.body.data.published !== undefined &&
    req.body.data.author &&
    req.body.data.author.name &&
    req.body.data.author.discordId &&
    req.body.data.date &&
    req.body.data.images &&
    req.body.data.images.small &&
    req.body.data.images.large
  ) {
    try {
      new Posts(req.body.data)
        .save()
        .then((record) => {
          res.status(200).json({
            success: true,
            itemId: record.short_url ? record.short_url : record._id,
          });
        })
        .catch(() => {
          res.status(400).json({
            success: false,
          });
        });
    } catch (err) {
      res.status(400).json({
        success: false,
      });
    }
  } else {
    res.status(401).json({
      success: false,
    });
  }
});

app.post("/blog/post/:id/update", auth("postDelete"), async (req, res) => {
  if (
    req.params &&
    req.params.id &&
    req.body &&
    req.body.data &&
    req.body.data.title &&
    req.body.data.shortdesc &&
    req.body.data.content &&
    req.body.data.published !== undefined &&
    req.body.data.author &&
    req.body.data.author.name &&
    req.body.data.author.discordId &&
    req.body.data.lastEdit &&
    req.body.data.images &&
    req.body.data.images.small &&
    req.body.data.images.large
  ) {
    try {
      await Posts.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body.data
      )
        .then(() => {
          res.status(200).json({
            success: true,
          });
        })
        .catch(() => {
          res.status(400).json({
            success: false,
          });
        });
    } catch (err) {
      res.status(400).json({
        success: false,
      });
    }
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

/* /* /*
//
// BLOG PART ENDS HERE
//
// // */

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
        `${process.cwd()}/static/files/overlay/frames/` +
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
        `${process.cwd()}/static/files/overlay/frames/` +
          req.query.overlay +
          ".png"
      )
    ) {
      loadImage(
        `${process.cwd()}/static/files/overlay/frames/` +
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
  fs.readdir(`${process.cwd()}/static/files/overlay/frames`, function(
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
