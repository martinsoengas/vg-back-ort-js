import Developer from './developers.model.js';
import Videogame from './videogames.model.js';
import User from './users.model.js';
import Rating from './ratings.model.js';

// Developer / Videogame => One to Many
Developer.hasMany(Videogame, {
  foreignKey: 'developerId',
  as: 'Videogame',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Videogame.belongsTo(Developer, {
  foreignKey: 'developerId',
  as: 'Developer',
});

// User / Rating => One to Many
User.hasMany(Rating, {
  foreignKey: 'userId',
  as: 'Rating',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Rating.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User',
});

// Videogame / Rating => One to Many
Videogame.hasMany(Rating, {
  foreignKey: 'videogameId',
  as: 'Rating',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Rating.belongsTo(Videogame, {
  foreignKey: 'videogameId',
  as: 'Videogame',
});

export { Developer, Videogame, User, Rating };
