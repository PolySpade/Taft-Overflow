const mongoose = require('mongoose')
const schemas = require('../models/schemas')


//Sample Single Data
const topics = new schemas.Topics(
    {name:'id119'}
)
async function data_save(data){
    try {
        await data.save();
        console.log('Data saved successfully');
    } catch (error) {
        console.log('Data exists');
    }
}
//data_save(topics)

//Sample Array Data
const topics_data = [
    {name:'id119'},
    {name:'css'},
    {name:'react'}
]

const courses_data = [
    {name:'ccapdev'},
    {name:'ccdsalg'},
    {name:'csarch'},
    {name:'ccdstru'},
]


function multiple_data_save(schemaName, topics_data) {
    const Schema = schemas[schemaName];
    if (!Schema) {
        console.error('Schema not found:', schemaName);
        return;
    }
    for (const data of topics_data) {
        const newTopic = new Schema(data); 
        data_save(newTopic);
    }
}


//save
multiple_data_save('Topics',topics_data)
multiple_data_save('Courses',courses_data)