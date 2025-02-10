const { db } = require("../config/firebase");

class Horses {
  async getAllHorses(searchText) {
    const betterSearchText = searchText
      /*? searchText.replace(/^(+|\s)+|(+|\s)+$/g, "")
      : ""*/;

    try {
      let query = db.collection("stable");
      let horses = [];
      const horsesSnapshot = await query.get();
      horsesSnapshot.forEach((doc) => {
        horses.push({ id: doc.id, ...doc.data() });
      });

      if (betterSearchText) {
        const regex = new RegExp(betterSearchText, "i");
        horses = horses.filter((horse) => regex.test(horse.name));
      }

      return horses;
    } catch (error) {
      throw new Error("Horses db not loaded");
    }
  }
}
module.exports = new Horses();
