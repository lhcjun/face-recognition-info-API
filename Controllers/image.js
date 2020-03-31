const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI
});

const handleApiCall = (req, res) => {
    const { inputLink, inputMethod } = req.body;
    // Data URI: data:image/jpeg;base64,<data>    <data> start from 23 (begin 0)
    let handleInputFile = inputLink.split('').slice(23).join('');
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    app.models
        .predict(
            Clarifai.DEMOGRAPHICS_MODEL,
            inputMethod === 'search' ? inputLink : proxyUrl + handleInputFile
        )
        .then(apiData => res.json(apiData))
        .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = db => (req, res) => {
    const { id } = req.body;
    // add entries (state)
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = { handleImage, handleApiCall };