const { tasks } = require("@trigger.dev/sdk/v3");

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body;

  if (!body?.email || !body?.first_name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await tasks.trigger("handle-lead", {
      first_name: body.first_name ?? "",
      last_name: body.last_name ?? "",
      email: body.email ?? "",
      company: body.company ?? "",
      company_size: body.company_size ?? "",
      role: body.role ?? "",
      project: body.project ?? "",
      automate: body.automate ?? "",
      budget: body.budget ?? "",
      timing: body.timing ?? "",
      lang: body.lang ?? "en",
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("web-lead webhook error:", err);
    return res.status(500).json({ error: String(err) });
  }
};
