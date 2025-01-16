const express = require('express');
const app = express();
const { db } = require('./config/firebase');
const port = process.env.PORT || 8383;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Get all horses
app.get('/', async (req, res) => {
  try {
    const horsesSnapshot = (await db.collection('stable').get());
    const horses = [];
    horsesSnapshot.forEach(doc => {
      horses.push({ id: doc.id, ...doc.data() });
      console.log(horses)
    });
    res.render('horses', { horses });
  } catch (error) {
    res.status(500).send(error.message);
    console.error("horses db not loaded")
    console.error(error);
    
  }
});

// TODO: Add new horse
// TODO: Delete horse
app.delete(`/delete/:id`, async (req, res) => {
  const horseId = req.params.id;
  console.log(horseId);
  try {
    await db.collection('stable').doc(horseId).delete();
    res.status(200).send({ message: 'Horse deleted successfully!' });
  } catch (error) {
    console.error("Error deleting horse: ", error);
    res.status(500).send({ message: 'Failed to delete horse.' });
  }
});
// TODO: Edit horse page
// TODO: Update horse

app.listen(port, () => console.log(`Server running on port ${port}`));