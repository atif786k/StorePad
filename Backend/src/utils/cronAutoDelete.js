const cron = require("node-cron");
const Notes = require("../schema/noteSchema");

cron.schedule("* * * * *", async () => {
  const now = new Date();
  try {
    const result = await Notes.deleteMany({ deleteAt: { $lte: now } });
    if (result.deletedCount > 0) {
      console.log(`Auto-deleted ${result.deletedCount} expired notes.`);
    }
  } catch (error) {
    console.error("Failed to auto-delete notes: ", error);
  }
});
