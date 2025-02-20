import { STORE } from '../data'; 
import Card from './Card'; 

const List = () => {
    console.log(STORE);

    return (
        <div>
            {STORE.map((movie) => (
                <Card key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default List;
