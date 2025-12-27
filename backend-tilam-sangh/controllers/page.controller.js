import Page from "../models/page.model.js";

/**
 * GET PAGE BY SLUG
 * - slug missing / wrong → homepage
 * - language supported
 */
export const getPageBySlug = async (req, res) => {
  try {
    // const language = req.query.lang || "English";
    const slug = req.params.slug || ""; // homepage case

    // 1️⃣ Try requested page
    let page = await Page.findOne({
      slug,
      status: true,
      deletedAt: null
    }).lean();

    // 2️⃣ Fallback → homepage
    if (!page) {
      page = await Page.findOne({
        slug: "",
        status: true,
        deletedAt: null
      }).lean();
    }

    return res.status(200).json({
      success: true,
      slug: page.slug || "",
      data: page.data,
      seo: page.seo || {}
    });
  } catch (error) {
    console.error("❌ Page API error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load page"
    });
  }
};



export const patchServiceBySlug = async (req, res) => {
  const { slug } = req.params;
  let { path, value } = req.body;
    console.log("slug", slug);
  console.log("path", path);
  console.log("value", value);
  

    // const cacheKey = `websiteService:${slug}`
    // // Invalidate Redis cache for this service (इस सेवा के लिए Redis कैश को अमान्य करें)
    // if(cacheKey){
    //   await redisClient.del(cacheKey);
    // }

  // normalize array index syntax: [0] -> .0
  path = path.replace(/\[(\d+)\]/g, ".$1");

  // Allow updating some top-level fields (seo, status, deletedAt, slug, etc.)
  const topLevelRoots = ["seo", "status", "deletedAt", "slug", "dateUpdated", "dateCreated"];
  // If path starts with any of these roots, don't prepend "data."
  const isTopLevel = topLevelRoots.some(root => path === root || path.startsWith(`${root}.`));

  let finalPath = path;
  if (!isTopLevel) {
    if (!path.startsWith("data.")) {
      finalPath = `data.${path}`;
    }
  }

  console.log("Final Path:", finalPath);

  // console.log("Patch Request - Slug:", slug, "Final Path:", finalPath, "Value:", value);

  try {
    // Build update object
    const updateObj = { [finalPath]: value, dateUpdated: new Date() };

    // NOTE: Use slug only (allow updating status/restores). Make sure route protected for admins.
    const updated = await Page.findOneAndUpdate(
      { slug },               // <-- do not restrict by status:true here so admin can toggle status/deletedAt
      { $set: updateObj },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
