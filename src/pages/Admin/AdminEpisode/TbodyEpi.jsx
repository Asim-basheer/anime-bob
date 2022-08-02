import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Image, Button } from 'react-bootstrap';

function TbodyEpi({ animes, handleEdit, handleDelete }) {
  return (
    <tbody>
      {animes.map((anime) => {
        const { episode_id, img, episode_number, name } = anime;
        return (
          <tr key={episode_id}>
            <td>{episode_id}</td>
            <td className='text-start'>{name}</td>
            <td>
              <Image src={img} height={30} width={25} alt={name} />
            </td>
            <td>{episode_number}</td>
            <td>
              <Button
                variant='info'
                size='sm'
                onClick={() => handleEdit(episode_id, name)}
              >
                <AiFillEdit className='table-icon' />
              </Button>
            </td>
            <td>
              <Button
                variant='danger'
                size='sm'
                onClick={() => handleDelete(episode_id, name, episode_number)}
              >
                <RiDeleteBinLine className='table-icon' />
              </Button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default TbodyEpi;
