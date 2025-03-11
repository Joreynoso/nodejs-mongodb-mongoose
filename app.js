// --> primera interacción con mongoDB y mongoose
import mongoose from 'mongoose'

const uri = 'mongodb+srv://grupo-01:grupo01@cursadanodejs.ls9ii.mongodb.net/Node-js';

mongoose.connect(uri)
    .then(() => console.log('Conexión exitosa'))
    .catch(error => console.log('Error al conectar:', error));

console.log('Conextandose a la base de datos'); //-->  STEP 0

const superHeroSchema = new mongoose.Schema({
    nombreSuperheroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador: String,
}, { collection: 'Grupo-01' });

const superHero = mongoose.model('superHero', superHeroSchema);

// --> función para crear un SuperHero y agregarlo a mongoDB
async function insertSuperHero() {

    console.log('Iniciando Función'); //-->  PASO 1

    try {

        console.log('Creando superhero'); //-->  PASO 2
        const hero = new superHero({
            nombreSuperheroe: 'Spiderman',
            nombreReal: 'Peter Parker',
            edad: 25,
            planetaOrigen: 'Tierra',
            debilidad: 'Radioactiva',
            poderes: ['trepar paredes', 'sentido aracnido', 'super fuerza', 'agilidad'],
            enemigos: ['Duende verde'],
            aliados: ['Ironman'],
            creador: 'Martin'
        });

        console.log('Guardando el superhero..'); //-->  PASO 3
        await hero.save();
        console.log('Superhero Insertado!', hero); //-->  PASO 4

    } catch (error) {
        console.error('Error al insertar el superheroe', error);
    }
};

// --> función para editar un SuperHero
async function updateSuperHero(nombreSuperheroe) {

    console.log('Buscando al superhero para actualizar...');
    const superheroBuscado = await superHero.find({ nombreSuperheroe: nombreSuperheroe });

    if (!superheroBuscado) {
        console.log(`no se pudo encontra al superhero: ${nombreSuperheroe}`);
    } else {
        const result = await superHero.updateOne(
            { nombreSuperheroe: nombreSuperheroe },
            { $set: { edad: 33 } }
        );
        console.log('resultado de la actualización', result);
    }
};

// --> función para eliminar un SuperHero
async function deleteSuperHero(nombreSuperheroe) {
    console.log('Buscando al superhero para eliminar...');
    const superheroBuscado = await superHero.find({ nombreSuperheroe: nombreSuperheroe });

    if (!superheroBuscado) {
        console.log(`no se pudo encontra al superhero: ${nombreSuperheroe}`);
    } else {
        const result = await superHero.deleteOne(
            { nombreSuperheroe: nombreSuperheroe }
        );
        console.log('superhero eliminado', result);
    }
};

// --> función para buscar un SuperHero
async function findSuperHero() {
    const heroes = await superHero.find({ planetaOrigen: 'Tierra' });
    console.log('superheros encontrados:', heroes);
};

// ---------- testing ----------// 
insertSuperHero();
updateSuperHero('Spiderman');
deleteSuperHero('Spiderman');
findSuperHero();


