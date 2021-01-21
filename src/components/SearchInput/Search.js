import { FaSearch } from 'react-icons/fa';

import styles from './Search.module.css';

const SearchInput = ({...rest}) => {

    return (
        <div className={styles.wrapper} >
            <FaSearch />
            <input type="text"  className={styles.input} {...rest} />
        </div>
    );
}

export default SearchInput