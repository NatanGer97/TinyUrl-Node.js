const { NotFoundError } = require("../Errors/NotFoundError");
const tinyUrlService = require("../services/tinyUrlService");

/**
 *  method to create tiny url
 * @param {*} req
 * @param {*} res
 */
const createTinyUrl = async (req, res) => {
  let { url, email } = req.body;
  console.log("creatingTinyUrl: " + url + " " + email);
  if (
    !String(url).startsWith("http://") ||
    !String(url).startsWith("https://")
  ) {
    url = "http://" + url;
  }

  try {
    const tinyUrl = tinyUrlService.createTinyUrl(url, email);
    console.log("createdTinyUrl: " + tinyUrl);
    res.status(200).send(tinyUrl);
  } catch (error) {
    console.log("error" + error);
    res.json({ error: error.message });
  }
};

const getTinyUrl = async (req, res, next) => {
  const { tinyUrl } = req.params;
  try {
    const tinyUrlReq = JSON.parse(await tinyUrlService.getTinyUrl(tinyUrl));
    if (tinyUrlReq === null) {
      throw new NotFoundError("Tiny url not found", 404);
    }

    const { originalUrl, email } = tinyUrlReq;
    console.log("originalUrl: " + originalUrl);

    if (originalUrl === null) {
      return res.sendStatus(404);
    }

    //update statistics
    tinyUrlService.updateTotalClicks(email);
    tinyUrlService.updateTinyUrlClicks(email, tinyUrl);
    // log new click into database
    tinyUrlService.addNewClick(tinyUrl, email);

    // redirect to original url
    console.log("redirecting to: " + originalUrl);
    return res.status(301).redirect(originalUrl);
    // return res.status(200).json({ url: originalUrl });
  } catch (error) {
    console.log("error 1" + error);

    return res.status(500).json({ error: error.message });
  }
};

const getAllClicks = async (req, res) => {
  const { email, pageNumber = 0, pageSize = 1 } = req.query;
  try {
    const tinyClicks = await tinyUrlService.getAllClicks(
      email,
      pageNumber,
      pageSize
    );
    console.log("tinyClicks: " + tinyClicks);
    res.status(200).json(tinyClicks);
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTinyUrl, getTinyUrl, getAllClicks };
