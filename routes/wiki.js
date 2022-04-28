const express = require("express");
const wikiRouter = express.Router();
const addPage = require("../views/addPage.js");
const { Page, generateSlug } = require("../models");
const wikiPage = require("../views/wikiPage.js");
const html = require("html-template-tag");
wikiRouter.use(express.json());

wikiRouter.get("/", (req, res) => {
  res.send("This is a home route");
});

wikiRouter.post("/", async (req, res, next) => {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  try {
    Page.addHook("beforeValidate", (page) => {
      page.slug = generateSlug(page.title);
    });

    const page = await Page.create({
      title: req.body.title,
      content: "req.body.content",
    });
    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

wikiRouter.get("/add", (req, res) => {
  res.send(addPage());
});

wikiRouter.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    // let pageFormatted = res.json(page)
    // wikiPage(pageFormatted);
    res.send(wikiPage(page));
  } catch (error) {
    next(error);
  }
});

module.exports = wikiRouter;
