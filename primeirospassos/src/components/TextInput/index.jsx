import './styles.css'

export const TextInput = ({ searchValue, handlerChange }) => {
    return (
        <input className="text-input"
          onChange={handlerChange}
          value={searchValue}
          type="search"
          placeholder="Type your search"
        />
    )
}