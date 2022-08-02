import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { Image, Button } from "react-bootstrap";

function Tbody({ animes, handleEdit, handleDelete }) {
  return (
    <tbody>
      {animes.map((anime) => {
        const { anime_id, img, status, name, season, scores, premiered } =
          anime;
        return (
          <tr key={anime_id}>
            <td>{anime_id}</td>
            <td className="text-start">{name}</td>
            <td>
              <Image src={img} height={30} width={25} alt={name} />
            </td>
            <td>{status}</td>
            <td>{season}</td>
            <td>{premiered}</td>
            <td>{scores}</td>
            <td>
              <Button
                variant="info"
                size="sm"
                onClick={() => handleEdit(anime_id)}
              >
                <AiFillEdit className="table-icon" />
              </Button>
            </td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(anime_id, name)}
              >
                <RiDeleteBinLine className="table-icon" />
              </Button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default Tbody;
