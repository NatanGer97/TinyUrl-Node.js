const tinyUrlService = require("../services/tinyUrlService");

const createTinyUrl = async (req, res) => {
  let { url } = req.body;
  if (
    !String(url).startsWith("http://") ||
    !String(url).startsWith("https://")
  ) {
    url = "http://" + url;
  }

  try {
    const tinyUrl = tinyUrlService.createTinyUrl(url);
    console.log("createTinyUrl: " + tinyUrl);
    res.status(200).send(tinyUrl);
  } catch (error) {
    console.log("error" + error);
    res.json({ error: error.message });
  }
};

const getTinyUrl = async (req, res) => {
  const { tinyUrl } = req.params;
  try {
    const url = await tinyUrlService.getTinyUrl(tinyUrl);
    console.log("getTinyUrl: " + url);
    
    if (url === null) {
      return res.sendStatus(404);
    }
    // redirect to original url
    console.log("redirecting to: " + url);
    return res.status(301).redirect(url);
    // return res.status(200).json({ url: url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createTinyUrl, getTinyUrl };
