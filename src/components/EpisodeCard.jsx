import { MdOutlineSmartDisplay } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function EpisodeCard({ episode }) {
  const navigate = useNavigate();
  const { episode_number, name, img, anime_id } = episode;

  const handleNavigate = (id, name, episode) => {
    navigate(`/details/${id}/${name}/${episode}`);
  };
  return (
    <div
      className='episode-card'
      onClick={() => handleNavigate(anime_id, name, episode_number)}
    >
      <img src={img} alt='' className='episode-card__img rounded' />
      <div className='episode-card__episode'>
        <p className='mb-0'>
          episode {episode_number}{' '}
          <MdOutlineSmartDisplay className='episode-card__icon' />
        </p>
      </div>
      <h4 className='episode-card__title mt-1 text-white mb-0'>{name}</h4>
    </div>
  );
}

export default EpisodeCard;
