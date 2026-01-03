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
      data: page
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

export const createPage = async (req, res) => {
  const { slug, data, seo, language } = req.body;

  if (!slug || !data) {
    return res.status(400).json({ success: false, message: "Slug and Data are required" });
  }

  try {
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return res.status(400).json({ success: false, message: "Page with this slug already exists" });
    }

    const newPage = await Page.create({
      slug,
      data,
      seo: seo || {},
      language: language || "English"
    });

    res.status(201).json({ success: true, data: newPage });
  } catch (error) {
    console.error("Create Page Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePage = async (req, res) => {
  const { slug } = req.params;
  try {
    // Soft delete or Hard delete? Using Hard delete for now as per clean up, or soft delete via status
    // User requested "delete", let's do hard delete for simplicity in admin panel management, 
    // or maybe soft delete. Let's do hard delete to clean DB if needed.
    const deleted = await Page.findOneAndDelete({ slug });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }
    res.json({ success: true, message: "Page deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find({ deletedAt: null }).select("slug language status seo data updatedAt");
    res.json({ success: true, data: pages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePage = async (req, res) => {
  const slug = req.params.slug || "";
  const { data, seo, language, status } = req.body;

  try {
    const updated = await Page.findOneAndUpdate(
      { slug },
      { $set: { data, seo, language, status, dateUpdated: new Date() } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
