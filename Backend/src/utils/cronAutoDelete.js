const cron = require("node-cron");
const Notes = require("../schema/noteSchema");
const { default: mongoose } = require("mongoose");

cron.schedule("* * * * *", async () => {
  const now = new Date();
  if (mongoose.connection.readyState !== 1) {
    console.warn("MongoDB not connected yet. Skipping this auto-delete cycle");
    return;
  }
  try {
    const result = await Notes.deleteMany({ deleteAt: { $lte: now } });
    if (result.deletedCount > 0) {
      console.log(`Auto-deleted ${result.deletedCount} expired notes.`);
    }
  } catch (error) {
    console.error("Failed to auto-delete notes: ", error);
  }
});
