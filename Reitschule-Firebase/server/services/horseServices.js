const { db } = require("../config/firebase");

class Horses {
  async getAllHorses(searchText) {
    const betterSearchText = searchText;
    /*? searchText.replace(/^(+|\s)+|(+|\s)+$/g, "")
      : ""*/ try {
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

  async addHorse(horse) {
    await db.collection("stable").add(horse);
  }

  async deleteAll() {
    // get all documents
    const val = await db.collection("stable").listDocuments();

    // for each document, delete it
    for (let i = 0; i < val.length; i++) {
      const document = val[i];
      await document.delete();
    }
  }

  async deleteOneHorse(id){
    await db.collection("stable").doc(id).delete();
  }


  async updateHorse(id, name, birthyear, color, breed, text){
    await db.collection("stable").doc(id).update({
      name: name,
      birthyear: birthyear,
      color: color,
      breed: breed,
      text: text,
    });
    const horsesSnapshot = await db.collection("stable").get();
    const horses = [];
    horsesSnapshot.forEach((doc) => {
      horses.push({ id: doc.id, ...doc.data() });
    });
  }

  async getUpdateHorse(id){
    const horseSnapshot = await db.collection("stable").doc(id).get();
    const horse = { id: horseSnapshot.id, ...horseSnapshot.data() };
    return horse;
  }

}
module.exports = new Horses();
