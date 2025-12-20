import Page from "../models/page.model.js";

/**
 * GET PAGE BY SLUG
 * - slug missing / wrong → homepage
 * - language supported
 */
export const getPageBySlug = async (req, res) => {
  try {
    const language = req.query.lang || "English";
    const slug = req.params.slug || ""; // homepage case

    // 1️⃣ Try requested page
    let page = await Page.findOne({
      slug,
      language,
      status: true,
      deletedAt: null
    }).lean();

    // 2️⃣ Fallback → homepage
    if (!page) {
      page = await Page.findOne({
        slug: "",
        language,
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
