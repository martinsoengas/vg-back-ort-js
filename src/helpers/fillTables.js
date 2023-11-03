// Importa tus modelos
import { Developer } from '../models/associations.js';
import { Videogame } from '../models/associations.js';
import { User } from '../models/associations.js';
import { Rating } from '../models/associations.js';

async function fillTables() {
  try {
    const developer1 = await Developer.create({
      companyName: 'Maxis',
      description: 'A people simulator game development studio.',
      country: 'USA',
      email: 'maxis@mail.com',
      password: '12345678',
    });

    const developer2 = await Developer.create({
      companyName: 'From Software',
      description: 'An independent game developer.',
      country: 'Japan',
      email: 'fromsoftware@mail.com',
      password: '12345678',
    });

    const developer3 = await Developer.create({
      companyName: 'EA Games',
      description:
        'A very big game development studio. Owner of Battlefield franchise.',
      country: 'USA',
      email: 'eagames@mail.com',
      password: '12345678',
    });

    const user1 = await User.create({
      username: 'playerOne',
      email: 'playerone@example.com',
      password: '12345678',
    });

    const user2 = await User.create({
      username: 'playerTwo',
      email: 'playertwo@example.com',
      password: '12345678',
    });

    const videogame1 = await Videogame.create({
      title: 'The Sims',
      description: 'An epic people simulator',
      genre: 'Simulator',
      developerId: developer1.id,
      image: 'https://i.ytimg.com/vi/CYdLXGMcnIc/maxresdefault.jpg',
    });

    const videogame2 = await Videogame.create({
      title: 'Elden Ring',
      description: 'An open world challenging game.',
      genre: 'Adventure',
      developerId: developer2.id,
      image:
        'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png',
    });

    const videogame3 = await Videogame.create({
      title: 'Battlefield V',
      description: 'The most famous war game',
      genre: 'FPS',
      developerId: developer3.id,
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1238810/header.jpg',
    });

    const rating1 = await Rating.create({
      videogameId: videogame1.id,
      userId: user1.id,
      score: 8,
      comment: 'Great game with an engaging storyline!',
    });

    const rating2 = await Rating.create({
      videogameId: videogame2.id,
      userId: user2.id,
      score: 7,
      comment: 'Really makes you think!',
    });

    const rating3 = await Rating.create({
      videogameId: videogame3.id,
      userId: user2.id,
      score: 9,
      comment: 'Bloody game!',
    });

    const rating4 = await Rating.create({
      videogameId: videogame2.id,
      userId: user2.id,
      score: 5,
      comment: 'Really hard...',
    });

    console.log('Tables filled successfully');
  } catch (error) {
    console.error('There was an error filling the tables', error);
  }
}

export default fillTables;
