import {Cast} from '../../core/entities/cast.entity';
import {MovieDbCast} from '../interfaces/movie-db.responses';

export class CastMapper {
  static fromMovieDbCastToEntity(actor: MovieDbCast): Cast {
    return {
      id: actor.id,
      name: actor.name,
      character: actor.character ?? '',
      avatar: actor.profile_path
        ? `http://image.tmdb.org/t/p/w500/${actor.profile_path}`
        : 'https://i.stack.imgur.com/l60Hf.png',
    };
  }
}
